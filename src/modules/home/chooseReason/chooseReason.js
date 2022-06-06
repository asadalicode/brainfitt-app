import Style from "./chooseReason.module.scss";
import ChooseReasonCard from "./chooseReasonCard/chooseReasonCard";
import rightArrow from "../../../assets/images/rightArrow.svg";
import { ReactComponent as PeakPerformance } from "../../../assets/images/homeModule/peakPerformance.svg";
import { ReactComponent as MaintainHealth } from "../../../assets/images/homeModule/maintainHealth.svg";
import { ReactComponent as ImproveHealth } from "../../../assets/images/homeModule/improveHealth.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomButton from "../../../shared/components/customButton/customButton";
import {
  completeGoogleFormStepAPICall,
  getReasonAPICall,
  getWelcomeDataAPICall,
  setReasonAPICall,
} from "../homeService/homeService";
import { async } from "@firebase/util";
import {
  getItemInLocalStorage,
  getUserData,
} from "../../../shared/js/userCredential";
import Popup from "../../../shared/components/popup/popup";
import { Spinner } from "../../../shared/components/spinner/spinner";
import { UserStatus } from "../../../shared/js/enums";

const iconList = [
  { icon: MaintainHealth },
  { icon: PeakPerformance },
  { icon: ImproveHealth },
];

// const reasonList = [
//   {
//     id: 1,
//     title: "Maintain Mental Health",
//     icon: MaintainHealth,
//     isSelected: false,
//   },
//   {
//     id: 2,
//     title: "Improve Mental Health",
//     icon: PeakPerformance,
//     isSelected: false,
//   },
//   { id: 3, title: "Peak Performance", icon: ImproveHealth, isSelected: false },
// ];
const ChooseReason = () => {
  const navigate = useNavigate();
  const [reasons, setReasons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingWidgets, setIsLoadingWidgets] = useState(true);
  const [isGoogleFormOpen, setIsGoogleFormOpen] = useState(false);
  const [isShowEmailPopup, setIsShowEmailPopup] = useState(false);
  const [isDisableButton, setIsDisableButton] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(async () => {
    let _userData = await getUserData();
    setEmail(_userData.email);
    getWelcomeDataAPICall();
  }, []);
  useEffect(async () => {
    let _data = await getReasonAPICall();
    let _reason = _data.reasons.map((reason, index) => {
      return {
        ...reason,
        icon: reason.icon ? reason.icon : iconList[index].icon,
      };
    });
    setReasons([..._reason]);
    setIsLoadingWidgets(false);
  }, []);

  const handleSelectedCard = (index) => {
    let _reasons = [...reasons];
    _reasons.map((reason)=> {
      reason.isSelected = false
    })
    _reasons[index].isSelected = !_reasons[index].isSelected;
    setIsDisableButton(false)
    setReasons([..._reasons]);
  };

  const handleNextPage = async () => {
    setIsLoading(true);
    let _objectives = reasons
      .filter((reason) => reason.isSelected === true)
      .map((filterReason) => filterReason?.id);
    let _issucess = await setReasonAPICall(_objectives);
    let _userData = await getUserData();
    if (_userData?.status === UserStatus.postOnboarding) {
      setIsGoogleFormOpen(true);
      setIsShowEmailPopup(true);
      return;
    }
    let _googleFormSuccess = await handleGoogleForm(false);
    if (!_googleFormSuccess) {
      setIsGoogleFormOpen(true);
      setIsShowEmailPopup(true);
    }
  };
  const handleGoogleForm = async (isShowErrorMessage) => {
    let _googleFormSuccess = await completeGoogleFormStepAPICall(
      isShowErrorMessage
    );
    if (_googleFormSuccess) {
      setIsGoogleFormOpen(false);
      navigate("/purchase-program");
    }

    return _googleFormSuccess;
  };

  const handleEmailPopup = () => {
    setIsShowEmailPopup(false);
  };
  return (
    <>
      <div className={`container-fluid  ${Style.mainContainer} pb-2`}>
        {isLoadingWidgets ? (
          <div className={Style.spiner}>
            <Spinner isWhite />
          </div>
        ) : (
          <div className={`container d-flex align-items-center flex-column`}>
            <h2 className="py-2">Please choose reasons for being here</h2>
            {reasons.map((reason, index) => (
              <div key={Math.random()} className={Style.chooseCard}>
                <ChooseReasonCard
                  index={index}
                  isSelected={reason.isSelected}
                  title={reason.title}
                  Icon={reason.icon}
                  handleSelectedCard={handleSelectedCard}
                />
              </div>
            ))}
            <div className={`align-self-end ${Style.whiteButtonContainer}`}>
              <CustomButton
                handleButtonClick={handleNextPage}
                type="button"
                title="Next"
                disabled={isDisableButton}
                isLoading={isLoading}
                buttonStyle={Style.button}
                showNextArrow={true}
              >
                <span>
                  <img src={rightArrow} className={Style.whiteButtonArrow} />
                </span>
              </CustomButton>
            </div>
          </div>
        )}
      </div>
      <Popup
        width="100%"
        isFullScreen={true}
        isOpen={isGoogleFormOpen}
        handleClose={handleGoogleForm}
      >
        <Popup isOpen={isShowEmailPopup} handleClose={handleEmailPopup}>
          <h5>You must use this Email "{email}" while filling google form</h5>
        </Popup>
        <iframe
          src={getItemInLocalStorage("googleFormLink")}
          className={Style.googFormIFrame}
        />
      </Popup>
    </>
  );
};

export default ChooseReason;
