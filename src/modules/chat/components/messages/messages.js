import Style from "./messages.module.scss";
import { ReactComponent as LeftArrow } from "../../../../assets/images/leftArrow.svg";
import { ReactComponent as SendMessageIcon } from "../../../../assets/images/sendMessage.svg";
import MessageCard from "./messageCard/messageCard";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import {
  ref,
  onValue,
  push,
  child,
  getDatabase,
  get,
  update,
} from "firebase/database";
import { Spinner } from "../../../../shared/components/spinner/spinner";
import { userTypeEnum } from "../../../../shared/js/enums";
import { getUserData } from "../../../../shared/js/userCredential";

const dbPath_Users = "/Users";
const dbPath_Chats = "/Chats";
const dbPath_chatMessages = "/ChatMessages";
const db = getDatabase();
// const adminId = "-LrDEBoLokW-5mhaT3yz";

const Messages = () => {
  const navigate = useNavigate();
  const [chatKey, setChatKey] = useState();
  const [messsagesList, setMessagesList] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [adminId, setAdminId] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(async () => {
    let _userData = await getUserData();
    setUserId(_userData.userId);
  }, []);
  useEffect(() => {
    if (userId) {
      startChat();
    }
  }, [userId]);

  useEffect(() => {
    if (chatKey) {
      getMessages();
      updateChatsThread(chatKey);
    }
  }, [chatKey]);

  useEffect(() => {
    if (adminId) {
      getChats();
    }
  }, [adminId]);

  const startChat = () => {
    getAdminId();
  };

  const getAdminId = () => {
    const dbUserRef = ref(db, dbPath_Users);
    setIsMessageLoading(true);
    onValue(dbUserRef, (span) => {
      let _users = span.val();
      _users = Object.entries(_users);
      let _user = _users.find((user) => user[1]?.type === userTypeEnum.admin);
      setAdminId(_user[1]?.id);
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const getChats = () => {
    const dbChatRef = ref(db, dbPath_Chats);
    setIsMessageLoading(true);
    onValue(dbChatRef, (span) => {
      let _chats = span.val();
      let _chat;
      if (_chats) {
        _chats = Object.entries(_chats);
        let _chatlist = _chats.map((chatModel) => {
          const { members, lastMessageSent } = chatModel[1];
          let _chatListModel = {
            chatkey: chatModel[0],
            members: members,
            lastMessageSent: lastMessageSent,
          };
          return _chatListModel;
        });
        _chat = _chatlist.find(
          (filterChat) =>
            filterChat.members.includes(adminId) &&
            filterChat.members.includes(userId)
        );
      } else {
        _chats = [];
      }
      if (_chat) {
        setChatKey(_chat.chatkey);
      } else {
        addChat();
      }
    });
  };

  const addChat = () => {
    let _chatsModel = {
      lastMessageSent: "",
      members: [userId, adminId],
      adminUnseenCount: 0,
      userUnseenCount: 0,
    };
    const newPostKey = adminId.toString() + userId.toString();
    const updates = {};
    updates[`${dbPath_Chats}/${newPostKey}`] = _chatsModel;
    update(ref(db), updates);
    setChatKey(newPostKey);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messsagesList]);

  const getMessages = () => {
    const dbChatMessagesRef = ref(db, `${dbPath_chatMessages}/${chatKey}`);
    onValue(dbChatMessagesRef, (span) => {
      let _dbMessages = span.val();
      if (_dbMessages) {
        _dbMessages = Object.entries(_dbMessages);
        let _messagesList;
        _messagesList = _dbMessages.map((messageModel) => {
          const { message, messageDateTime, sentBy } = messageModel[1];
          let _messageModel = {};
          _messageModel.id = messageModel[0];
          _messageModel.isSender = sentBy === userId ? true : false;
          _messageModel.message = message;
          _messageModel.messageDateTime = messageDateTime
            ? moment(messageDateTime).format("MMMM Do YYYY, h:mm a")
            : "";
          return _messageModel;
        });
        setMessagesList([..._messagesList]);
      }
      setIsMessageLoading(false);
      scrollToBottom();
    });
  };

  const handleChangeMessage = (e) => {
    setTextMessage(e.target.value);
  };
  const sendMessage = (e) => {
    e.preventDefault();
    if (!textMessage) {
      return;
    }
    let _messageThread = {};
    _messageThread.message = textMessage;
    _messageThread.sentBy = userId;
    _messageThread.messageDateTime = new Date().getTime();
    const _lastMessageKey = push(
      child(ref(db), `${dbPath_chatMessages}/${chatKey}`)
    ).key;

    const updates = {};
    updates[`${dbPath_chatMessages}/${chatKey}/${_lastMessageKey}`] =
      _messageThread;
    update(ref(db), updates);

    updateChatsThread(chatKey, _lastMessageKey);
    setTextMessage("");
  };

  const updateChatsThread = (chatKey, lastMessageKey = "") => {
    const updates = {};
    const dbRef = ref(getDatabase());
    get(child(dbRef, `${dbPath_Chats}/${chatKey}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let _fbChatModel = snapshot.val();
          let _unseenCount = 0;
          if (
            _fbChatModel?.adminUnseenCount !== undefined ||
            _fbChatModel?.adminUnseenCount !== null
          ) {
            _unseenCount = lastMessageKey
              ? _fbChatModel?.adminUnseenCount + 1
              : _fbChatModel?.adminUnseenCount;
          }
          let _chatModel = {
            lastMessageSent: lastMessageKey
              ? lastMessageKey
              : _fbChatModel?.lastMessageSent,
            members: _fbChatModel.members,
            userUnseenCount: 0,
            adminUnseenCount: _unseenCount,
          };
          updates[`${dbPath_Chats}/${chatKey}`] = _chatModel;
          update(ref(db), updates);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div className={`${Style.container}`}>
      <div
        className={`d-flex justify-content-center align-items-center ${Style.header}`}
      >
        <span
          onClick={handleBackButton}
          className={`cursor-pointer ${Style.backArrow}`}
        >
          <LeftArrow height={25} fill={"white"} />
        </span>
        <h5>Chat</h5>
      </div>
      {isMessageLoading && (
        <div>
          <Spinner />
        </div>
      )}
      <div className={`${Style.messageContainer} pt-3`}>
        {!isMessageLoading && messsagesList.length > 0 && (
          <>
            {messsagesList.map((message) => (
              <MessageCard key={Math.random()} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      <form
        className={`d-flex justify-content-between ${Style.inputContainer}`}
        onSubmit={sendMessage}
      >
        <input
          type={"text"}
          value={textMessage}
          placeholder="Type a message"
          onChange={handleChangeMessage}
        />
        <SendMessageIcon
          className="cursor-pointer"
          height={40}
          width={40}
          onClick={sendMessage}
        />
      </form>
    </div>
  );
};
export default Messages;
