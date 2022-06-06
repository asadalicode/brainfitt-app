import Style from "./shareFeeling.module.scss";
import EmojiBox from "./emojiBox/emojiBox";
import { ReactComponent as AngryIcon } from "../../../assets/images/homeModule/shareFeeling/angry.svg";
import { ReactComponent as SorrowIcon } from "../../../assets/images/homeModule/shareFeeling/sorrow.svg";
import { useEffect, useState } from "react";
import { ReactComponent as RightArrow } from "../../../assets/images/rightArrow.svg";
import { useLocation, useNavigate } from "react-router-dom";
import empowermentBg from "../../../assets/images/homeModule/shareFeeling/bg.svg";
import unstoppableBg from "../../../assets/images/homeModule/shareFeeling/bg1.svg";

// -------- pre Emojis -----------
import Aggressive from "../../../assets/images/homeModule/shareFeeling/preEmojis/aggressive.png";
import Agitated from "../../../assets/images/homeModule/shareFeeling/preEmojis/agitated.png";
import Angry from "../../../assets/images/homeModule/shareFeeling/preEmojis/angry.png";
import Badmood from "../../../assets/images/homeModule/shareFeeling/preEmojis/badMood.png";
import Confused from "../../../assets/images/homeModule/shareFeeling/preEmojis/confused.png";
import Content from "../../../assets/images/homeModule/shareFeeling/preEmojis/content.png";
import Crying from "../../../assets/images/homeModule/shareFeeling/preEmojis/crying.png";
import Disappointed from "../../../assets/images/homeModule/shareFeeling/preEmojis/disappointed.png";
import Emotional from "../../../assets/images/homeModule/shareFeeling/preEmojis/emotional.png";
import Excited from "../../../assets/images/homeModule/shareFeeling/preEmojis/excited.png";
import Flustered from "../../../assets/images/homeModule/shareFeeling/preEmojis/flustered.png";
import Freefromproblem from "../../../assets/images/homeModule/shareFeeling/preEmojis/freeFromProblem.png";
import Grief from "../../../assets/images/homeModule/shareFeeling/preEmojis/grief.png";
import Happy from "../../../assets/images/homeModule/shareFeeling/preEmojis/happy.png";
import Happy2 from "../../../assets/images/homeModule/shareFeeling/preEmojis/happy2.png";
import Heavy from "../../../assets/images/homeModule/shareFeeling/preEmojis/heavy.png";
import Lighter from "../../../assets/images/homeModule/shareFeeling/preEmojis/lighter.png";
import Negative from "../../../assets/images/homeModule/shareFeeling/preEmojis/negative.png";
import Negativemood from "../../../assets/images/homeModule/shareFeeling/preEmojis/negativeMood.png";
import Nothanks from "../../../assets/images/homeModule/shareFeeling/preEmojis/noThanks.png";
import Overwhelm from "../../../assets/images/homeModule/shareFeeling/preEmojis/overWhelm.png";
import Sad from "../../../assets/images/homeModule/shareFeeling/preEmojis/sad.png";
import Scattered from "../../../assets/images/homeModule/shareFeeling/preEmojis/scattered.png";
import Uptight from "../../../assets/images/homeModule/shareFeeling/preEmojis/uptight.png";
// -------- post Emojis -----------
import AggressivePost from "../../../assets/images/homeModule/shareFeeling/postEmojis/aggressive.png";
import Blushing from "../../../assets/images/homeModule/shareFeeling/postEmojis/blushing.png";
import Light from "../../../assets/images/homeModule/shareFeeling/postEmojis/light.png";
import AngryPost from "../../../assets/images/homeModule/shareFeeling/postEmojis/angry.png";
import Clam from "../../../assets/images/homeModule/shareFeeling/postEmojis/clam.png";
import ConfusedPost from "../../../assets/images/homeModule/shareFeeling/postEmojis/confused.png";
import EmotionalPost from "../../../assets/images/homeModule/shareFeeling/postEmojis/emotional.png";
import ExcitedPost from "../../../assets/images/homeModule/shareFeeling/postEmojis/excited.png";
import Free from "../../../assets/images/homeModule/shareFeeling/postEmojis/free.png";
import HappyPost from "../../../assets/images/homeModule/shareFeeling/postEmojis/happy.png";
import HappyPost2 from "../../../assets/images/homeModule/shareFeeling/postEmojis/happy2.png";
import Jayful from "../../../assets/images/homeModule/shareFeeling/postEmojis/jayful.png";
import NegativePost from "../../../assets/images/homeModule/shareFeeling/postEmojis/negative.png";
import Neutral from "../../../assets/images/homeModule/shareFeeling/postEmojis/neutral.png";
import Peaceful from "../../../assets/images/homeModule/shareFeeling/postEmojis/peaceful.png";
import Peaceful2 from "../../../assets/images/homeModule/shareFeeling/postEmojis/peaceful2.png";
import Stressed from "../../../assets/images/homeModule/shareFeeling/postEmojis/stressed.png";
import Pensive from "../../../assets/images/homeModule/shareFeeling/postEmojis/pensive.png";
import Positive from "../../../assets/images/homeModule/shareFeeling/postEmojis/positive.png";
import Relaxed from "../../../assets/images/homeModule/shareFeeling/postEmojis/relaxed.png";
import SadPost from "../../../assets/images/homeModule/shareFeeling/postEmojis/sad.png";
import SadPost2 from "../../../assets/images/homeModule/shareFeeling/postEmojis/sad2.png";
import Tense from "../../../assets/images/homeModule/shareFeeling/postEmojis/tense.png";
import Worried from "../../../assets/images/homeModule/shareFeeling/postEmojis/worried.png";

import Popup from "../../../shared/components/popup/popup";
import { handleToastMessage } from "../../../shared/js/handleToastMessage";

const emojis = [
  { id: 1, title: "Negative mood", Icon: Aggressive, isSelected: false },
  { id: 2, title: "Emotional", Icon: Agitated, isSelected: false },
  { id: 3, title: "Angry", Icon: Angry, isSelected: false },
  { id: 4, title: "Negative", Icon: Badmood, isSelected: false },
  { id: 5, title: "Sad", Icon: Sad, isSelected: false },
  { id: 6, title: "Happy", Icon: Content, isSelected: false },
  { id: 8, title: "Uptight", Icon: Disappointed, isSelected: false },
  { id: 9, title: "Agitated", Icon: Emotional, isSelected: false },
  { id: 10, title: "Heavy", Icon: Excited, isSelected: false },
  { id: 11, title: "Free from problems", Icon: Flustered, isSelected: false },
  { id: 12, title: "Aggressive", Icon: Freefromproblem, isSelected: false },
  { id: 13, title: "Crying", Icon: Grief, isSelected: false },
  { id: 14, title: "Scattered", Icon: Happy, isSelected: false },
  { id: 15, title: "Lighter", Icon: Happy2, isSelected: false },
  { id: 16, title: "Confused", Icon: Heavy, isSelected: false },
  { id: 17, title: "Grief", Icon: Lighter, isSelected: false },
  { id: 18, title: "Excited", Icon: Negative, isSelected: false },
  { id: 19, title: "Flustered", Icon: Negativemood, isSelected: false },
  { id: 20, title: "Bad mood", Icon: Nothanks, isSelected: false },
  { id: 21, title: "Overwhelm", Icon: Overwhelm, isSelected: false },
  { id: 22, title: "Content", Icon: Sad, isSelected: false },
  { id: 23, title: "Not thinking", Icon: Scattered, isSelected: false },
  { id: 24, title: "Disappointed", Icon: Uptight, isSelected: false },
];
export const preEmojiList = [
  { id: 1, title: "Negative mood", Icon: Negativemood, isSelected: false },
  { id: 2, title: "Emotional", Icon: Emotional, isSelected: false },
  { id: 3, title: "Angry", Icon: Angry, isSelected: false },
  { id: 4, title: "Negative", Icon: Negative, isSelected: false },
  { id: 5, title: "Sad", Icon: Sad, isSelected: false },
  { id: 6, title: "Happy", Icon: Happy, isSelected: false },
  { id: 8, title: "Uptight", Icon: Uptight, isSelected: false },
  { id: 9, title: "Agitated", Icon: Agitated, isSelected: false },
  { id: 10, title: "Heavy", Icon: Heavy, isSelected: false },
  {
    id: 11,
    title: "Free from problems",
    Icon: Freefromproblem,
    isSelected: false,
  },
  { id: 12, title: "Aggressive", Icon: Aggressive, isSelected: false },
  { id: 13, title: "Crying", Icon: Crying, isSelected: false },
  { id: 14, title: "Scattered", Icon: Scattered, isSelected: false },
  { id: 15, title: "Lighter", Icon: Lighter, isSelected: false },
  { id: 16, title: "Confused", Icon: Confused, isSelected: false },
  { id: 17, title: "Grief", Icon: Grief, isSelected: false },
  { id: 18, title: "Excited", Icon: Excited, isSelected: false },
  { id: 19, title: "Flustered", Icon: Flustered, isSelected: false },
  { id: 20, title: "Bad mood", Icon: Badmood, isSelected: false },
  { id: 21, title: "Overwhelm", Icon: Overwhelm, isSelected: false },
  { id: 22, title: "Content", Icon: Content, isSelected: false },
  { id: 23, title: "Not thanks", Icon: Nothanks, isSelected: false },
  { id: 24, title: "Disappointed", Icon: Disappointed, isSelected: false },
];
export const postEmojiList = [
  { id: 1, title: "Light", Icon: Light, isSelected: false },
  { id: 2, title: "Emotional", Icon: EmotionalPost, isSelected: false },
  { id: 3, title: "Angry", Icon: AngryPost, isSelected: false },
  { id: 4, title: "Negative", Icon: NegativePost, isSelected: false },
  { id: 5, title: "Happy", Icon: HappyPost, isSelected: false },
  { id: 6, title: "Sad", Icon: SadPost, isSelected: false },
  { id: 7, title: "Stressed", Icon: Stressed, isSelected: false },
  { id: 8, title: "Peaceful", Icon: Peaceful, isSelected: false },
  { id: 9, title: "Blushing", Icon: Blushing, isSelected: false },
  { id: 10, title: "Clam", Icon: Clam, isSelected: false },
  { id: 11, title: "Confused", Icon: ConfusedPost, isSelected: false },
  { id: 12, title: "Tense", Icon: Tense, isSelected: false },
  { id: 13, title: "Worried", Icon: Worried, isSelected: false },
  { id: 14, title: "Positive", Icon: Positive, isSelected: false },
  { id: 15, title: "Free", Icon: Free, isSelected: false },
  { id: 16, title: "Pensive", Icon: Pensive, isSelected: false },
  { id: 17, title: "Relaxed", Icon: Relaxed, isSelected: false },
  { id: 18, title: "Neutral", Icon: Neutral, isSelected: false },
  { id: 19, title: "jayful", Icon: Jayful, isSelected: false },
  { id: 20, title: "Aggressive", Icon: AggressivePost, isSelected: false },
];

const ShareFeeling = ({ preEmoji, handleEmojis }) => {
  const [emojiList, setEmojiList] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(empowermentBg);
  const { state } = useLocation();
  const { empowerment, activeSession } = state || {};
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  useEffect(() => {
    let _bg;
    if (empowerment) {
      _bg = empowermentBg;
    } else {
      _bg = unstoppableBg;
    }
    setBackgroundImage(_bg);
  }, []);

  useEffect(() => {
    let _emojis;
    if (preEmoji) {
      _emojis = [...preEmojiList];    
    } else {
      _emojis = [...postEmojiList];
    }
    _emojis = _emojis.map((emoji)=>{
      return {...emoji, isSelected: false}
    })
    setEmojiList([..._emojis]);
  }, [preEmoji]);

  const handleSelectedEmoji = (id) => {
    let _emojiList = [...emojiList];
    let _emoji = _emojiList.find((emoji) => emoji.id == id);
    _emoji.isSelected = !_emoji.isSelected;
    setEmojiList([..._emojiList]);
  };

  const handleNextButton = () => {
    let _emojis = emojiList.filter((emoji) => emoji.isSelected === true);
    _emojis.length
      ? handleEmojis(preEmoji, _emojis)
      : handleToastMessage("error", "Please select the Emoji!");
    _emojis.length && setIsPopupOpen(false);
  };

  return (
    <Popup
      isOpen={isPopupOpen}
      isFullScreen={true}
      width="100%"
      childClassName={"p-0"}
      borderRadius={0}
      isShowHeader={false}
      containerClassName={"m-0"}
    >
      <div
        className={`container-fluid ${Style.mainContainer}`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={`${Style.titleBar}`}>
          <div className="d-flex justify-content-between">
            <h2 className={`text-center w-50 ${Style.title}`}>
              {" "}
              Just share how you are feeling now?
            </h2>
            <div className={`align-self-end ${Style.whiteButtonContainer}`}>
              <button
                onClick={handleNextButton}
                class={`white-btn d-flex justify-content-center align-items-center
                        `}
              >
                Next
                <span>
                  <RightArrow height={30} width={30} />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className={`container mt-5 pb-5 ${Style.emojiContainer}`}>
          <div
            className={`d-flex justify-content-center mb-3 ${Style.filterEmojies}`}
          >
            {emojiList
              .filter((emoji) => emoji.isSelected)
              .map((item) => (
                <img src={item.Icon} height={130} width={130} />
              ))}
          </div>
          <div className={`d-flex justify-content-center flex-wrap `}>
            {emojiList.map((item) => (
              <div key={item.id} className={`mt-3 ${Style.emojiBox}`}>
                <EmojiBox
                  title={item.title}
                  Icon={item.Icon}
                  id={item.id}
                  isSelected={item.isSelected}
                  handleSelectedEmoji={handleSelectedEmoji}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Popup>
  );
};
export default ShareFeeling;
