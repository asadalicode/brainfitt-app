import {
  ref,
  onValue,
  push,
  child,
  getDatabase,
  get,
  update,
} from "firebase/database";
import { getUserData } from "../../../shared/js/userCredential";

const dbPath_Users = "/Users";
const dbPath_Chats = "/Chats";
const dbPath_chatMessages = "/ChatMessages";
const db = getDatabase();

export const addUpdateUser = (user) => {
  const updates = {};
  const dbRef = ref(getDatabase());
  get(child(dbRef, `${dbPath_Users}/${user.id}`))
    .then((snapshot) => {
      updates[`${dbPath_Users}/${user.id}`] = user;
      update(ref(db), updates);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateFirebaseUserStatus = async (isOnline) => {
  let _userData = await getUserData();
  const { userId, email, imageUrl, firstName, lastName } = _userData;
  let _user = {
    id: userId,
    userEmail: email,
    userDisplayName: `${firstName ? firstName : ""}${lastName ? lastName : ""}`,
    userPhotoUrl: imageUrl ? imageUrl : "",
    online: isOnline,
  };
  addUpdateUser(_user);
};
