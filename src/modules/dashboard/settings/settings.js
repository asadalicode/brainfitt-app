import Style from "./settings.module.scss";
import { useState, useEffect } from "react";
import { ReactComponent as Avatar } from "../../../assets/images/dashboardModule/settings/avatar.svg";
import { ReactComponent as InstagramIcon } from "../../../assets/images/instagram.svg";
import { ReactComponent as FacbookIcon } from "../../../assets/images/facebook.svg";
import { ReactComponent as YoutubeIcon } from "../../../assets/images/youtube.svg";
import { ReactComponent as ReferFriendIcon } from "../../../assets/images/referFriend.svg";
import { ReactComponent as GroupAvatar } from "../../../assets/images/dashboardModule/settings/group.svg";
import { ReactComponent as ProgramIcon } from "../../../assets/images/dashboardModule/settings/program.svg";
import { ReactComponent as JournalCoin } from "../../../assets/images/dashboardModule/settings/journal.svg";
import { ReactComponent as CoinIcon } from "../../../assets/images/dashboardModule/settings/coin.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/images/dashboardModule/settings/logout.svg";
import { ReactComponent as QaIcon } from "../../../assets/images/dashboardModule/settings/q&a.svg";
import ManagePeople from "./managePeople/managePeople";
import SettingsCard from "./settingsCard/settingsCard";
import Profile from "./profile/profile";
import QuestionAnswer from "./q&a/questionAnswer";
import Journal from "./journal/journal";
import ReferFriend from "./referFriend/referFriend";
import { useNavigate } from "react-router-dom";
import settingBackground from "../../../assets/images/dashboardModule/settings/bg.png";
import { ReactComponent as LeftArrow } from "../../../assets/images/leftArrow.svg";
import { getEntryId, getUserData } from "../../../shared/js/userCredential";
import { useSelector } from "react-redux";
import environment from "../../../environment";
import { endDateTimeActivityAPICall } from "../dashboardService/dashboard";
import { updateFirebaseUserStatus } from "../../chat/services/chat";
import { async } from "@firebase/util";
import { getUserPlanStatus } from "../../auth/authService/authService";

const settingsCard = [
  {
    cardComponentIndex: 1,
    title: "Manage People",
    Icon: GroupAvatar,
    isDetail: false,
    isSelected: false,
    isHovar: true,
    isLoading: false,
  },
  {
    title: "Programs/Plans",
    Icon: ProgramIcon,
    isDetail: false,
    isSelected: false,
    isHovar: true,
    isLoading: false,
  },
  {
    cardComponentIndex: 2,
    title: "Journal",
    Icon: JournalCoin,
    isDetail: false,
    isSelected: false,
    isLoading: false,

    isHovar: true,
  },
  {
    title: "Bliss Coin",
    Icon: CoinIcon,
    isDetail: true,
    isSelected: false,
    isHovar: false,
    isLoading: false,
  },
  {
    title: "Logout",
    Icon: LogoutIcon,
    isLoading: false,
    isDetail: false,
    isSelected: false,
    isHovar: true,
  },
  {
    cardComponentIndex: 3,
    title: "Q & A",
    Icon: QaIcon,
    isDetail: false,
    isLoading: false,
    isSelected: false,
    isHovar: true,
  },
];

const Settings = () => {
  const [isArrowShow, setIsArrowShow] = useState(true);
  const isProfileUpdate = useSelector((state) => state.isProfileUpdate);
  const handleBackArrow = (value) => {
    setIsArrowShow(value);
  };
  const [settingsCardList, setSettingsCardList] = useState([...settingsCard]);
  const [activeComponentIndex, setActiveComponentIndex] = useState(0);
  const [isShowLeftPortion, setIsShowLeftPortion] = useState(false);
  const navigate = useNavigate();
  const [isMobileTab, setIsMobileTab] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState({});
  const [referralCoins, setReferralCoins] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const cardComponent = [
    {
      id: 1,
      Component: (
        <Profile
          isUpdate={true}
          myProfile={selectedPeople}
          isMyProfile={true}
        />
      ),
    },
    { id: 2, Component: <ManagePeople handleBackArrow={handleBackArrow} /> },
    { id: 3, Component: <Journal handleBackArrow={handleBackArrow} /> },
    { id: 4, Component: <QuestionAnswer /> },
    { id: 5, Component: <ReferFriend referralCode={referralCode} /> },
  ];

  const handleResize = () => {
    setIsMobileTab(window.innerWidth <= 850);
    setIsShowLeftPortion(window.innerWidth <= 850);
  };
  useEffect(() => {
    resetCardState();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize());
    return window.removeEventListener("resize", handleResize());
  }, []);

  useEffect(async () => {
    setSelectedPeople(await getUserData());
  }, [isProfileUpdate]);

  useEffect(async () => {
    let _referralCoin = await getUserPlanStatus()
    if(_referralCoin?.isSuccess){
      setReferralCoins(_referralCoin?.userReferralCoins);
      setReferralCode(_referralCoin?.referralCode);
    }
  }, []);

  const resetCardState = () => {
    let _cardState = settingsCard.map((card) => {
      return { ...card, isLoading: false };
    });
    setSettingsCardList([..._cardState]);
  };
  const handleSelectedCard = (index, componentIndex) => {
    if (componentIndex !== undefined) {
      let _list = settingsCardList.map((item, itemIndex) => {
        let _flag = itemIndex === index ? true : false;
        return { ...item, isSelected: _flag };
      });
      setSettingsCardList([..._list]);
      handleActiveComponent(componentIndex);
      return;
    }
    handleLinkCard(index);
  };
  const handleActiveComponent = (index) => {
    setActiveComponentIndex(index);
    isMobileTab && setIsShowLeftPortion(false);
  };
  const unSubscribeEventListner = () => {
    document.removeEventListener("visibilitychange", () => {});
  };
  const handleLinkCard = async (index) => {
    switch (index) {
      case 1:
        navigate("/premium", {
          state: {
            settingBackgroundImage: settingBackground,
            sourcePage: "settings",
          },
        });
        break;
      case 4:
        logout(index);
        break;
      default:
        break;
    }
  };
  const logout = async (index) => {
    let _settingsCardList = [...settingsCardList];
    _settingsCardList[index].isLoading = true;
    setSettingsCardList([..._settingsCardList]);

    updateFirebaseUserStatus(false);
    unSubscribeEventListner();
    await endDateTimeActivityAPICall({
      endDate: new Date().toISOString(),
      entryId: await getEntryId()?.toString(),
    });
    await localStorage.clear();
    navigate("/");
  };
  const handleResponsiveCondition = (value) => {
    return isMobileTab ? (isShowLeftPortion === value ? true : false) : true;
  };

  return (
    <div className={`container-fluid ${Style.settingsContainer}`}>
      <div className="row">
        {handleResponsiveCondition(true) && (
          <div className={`col-lg-7 col-sm-12 col-12 ${Style.leftPortion}`}>
            <div className={`${Style.leftContainer}`}>
              <div
                className={`${Style.profileContainer}  ${
                  activeComponentIndex === 0 ? "box-border" : ""
                } cursor-pointer d-flex justify-content-between`}
                onClick={() => handleSelectedCard(-1, 0)}
              >
                <div className="d-flex align-items-center">
                  <div
                    className={`${Style.avatar} d-flex justify-content-center align-items-center`}
                  >
                    {selectedPeople.imageUrl ? (
                      <img
                        src={environment.serverUrl + selectedPeople.imageUrl}
                        className="rounded-circle"
                        height={60}
                        width={60}
                        alt="profile"
                      />
                    ) : (
                      <Avatar
                        height={40}
                        width={40}
                        fill="rgba(206, 205, 205, 0.6)"
                      />
                    )}
                  </div>
                  <div
                    className={`${Style.userInfo} d-flex flex-column justify-content-center`}
                  >
                    <h5 className={`mb-0 ${Style.username}`}>
                      {selectedPeople.firstName} {selectedPeople.lastName}
                    </h5>
                    <span className={`${Style.mobileNumber}`}>
                      {selectedPeople.mobileNumber
                        ? selectedPeople.mobileNumber
                        : selectedPeople.email}
                    </span>
                  </div>
                </div>
                <div
                  className={`d-flex flex-column justify-content-between ${Style.rightBox}`}
                >
                  <span className="align-self-end cursor-pointer">Edit</span>
                  <div>
                    <CoinIcon className="ms-1" height={20} width={20} />
                    <span className={Style.coinsValue}> {referralCoins}</span>
                    <span className="ms-1">Coins</span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between flex-wrap mt-2">
                {settingsCardList?.map((item, index) => (
                  <div key={Math.random()} className={`${Style.settingsCard}`}>
                    <SettingsCard
                      card={item}
                      index={index}
                      coins={referralCoins}
                      handleSelectedCard={handleSelectedCard}
                    />
                  </div>
                ))}
              </div>
              <div
                className={`d-flex justify-content-between ps-4 align-items-center ${Style.card}`}
              >
                <div className={`d-flex flex-column`}>
                  <h5 className={`${Style.title}`}>Follow Us</h5>
                  <span className={`${Style.description} w-75`}>
                    Follow on our social media
                  </span>
                </div>
                <div>
                  <div className={`d-flex ${Style.socialIconBox}`}>
                    <div className={`${Style.icon}`}>
                      <a href="https://www.youtube.com/channel/UCes6yBAiS858Lngb3-2Jd8A/featured">
                        <YoutubeIcon height={30} width={30} />
                      </a>
                    </div>
                    <div className={`${Style.icon}`}>
                      <a href="https://www.instagram.com/codesdev/">
                        <InstagramIcon height={30} width={30} />
                      </a>
                    </div>
                    <div className={`${Style.icon}`}>
                      <a href="https://www.facebook.com/codes.dev.58/">
                        <FacbookIcon height={30} width={30} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                onClick={() => handleSelectedCard(-1, 4)}
                className={`d-flex pt-0 ps-4 justify-content-between cursor-pointer align-items-center mt-2 ${
                  activeComponentIndex === 4 ? "box-border" : ""
                } ${Style.card}`}
              >
                <div className={`d-flex flex-column justify-content-center`}>
                  <h5 className={`${Style.title} mt-2`}>Refer a Friend</h5>
                  <span className={`${Style.description} w-75`}>
                    {" "}
                    Invite a friend to our app and earn 50 coins on their first
                    purchase
                  </span>
                </div>
                <div>
                  <div className={`d-flex ${Style.socialIconBox}`}>
                    <ReferFriendIcon
                      height={120}
                      width={120}
                      className={Style.referFriend}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {handleResponsiveCondition(false) && (
          <div className="col-lg-5 col-sm-12 col-12">
            <div
              className={`${isMobileTab ? "" : "container"} ${
                Style.rightContainer
              }`}
            >
              {isMobileTab && isArrowShow && (
                <span
                  onClick={() => setIsShowLeftPortion(true)}
                  className={`cursor-pointer ${Style.backArrow}`}
                >
                  <LeftArrow height={35} fill={"white"} />
                </span>
              )}
              {cardComponent[activeComponentIndex].Component}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Settings;
