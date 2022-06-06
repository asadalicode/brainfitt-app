import Boost from "../boost/boost";
import boostBackground from "../../../assets/images/dashboardModule/boost/bg.svg";
import { useEffect, useState } from "react";
import {
  getUserToken,
  setItemInLocalStorage,
  setUserToken,
} from "../../../shared/js/userCredential";
import environment from "../../../environment";
import { AppBar } from "@mui/material";
import { useSelector } from "react-redux";
import Style from "./explore.module.scss";
import Wavesurfer from "../../../shared/components/player/wavesurferCustom";
import CustomButton from "../../../shared/components/customButton/customButton";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  let [isShowBoostSection, setIsShowBoostSection] = useState(false);
  const musicList = useSelector((state) => state.musicList);
  const [isShowPlansIcon, setIsShowPlansIcon] = useState(false);
  const navigate = useNavigate();

  useEffect(async () => {
    let _token = getUserToken();
    if (!_token) {
      await setUserToken(environment.guestToken);
      await setItemInLocalStorage("isGuest", true);
    }
    setIsShowBoostSection(true);
  }, []);

  const handleSubscribePlan = () => {
    setIsShowPlansIcon(true);
  };
  const handleSeePlan = () => {
    navigate("/plans");
  };

  return (
    <div
      style={{
        backgroundImage: `url('${boostBackground}')`,
      }}
    >
      {isShowBoostSection && <Boost isGuest={true} />}
      {musicList.activePlayerIndex && (
        <AppBar
          className={`${Style.bottomAudioPlayer} py-3`}
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0 }}
        >
          <div className={`${Style.content}`}>
            <Wavesurfer
              isControlButtons
              isPlayList
              isVolume
              handleSubscribePlan={handleSubscribePlan}
            />
          </div>
        </AppBar>
      )}
      {isShowPlansIcon && (
        <div className={Style.seePlanButton}>
          <CustomButton
            type="button"
            title={"See plans"}
            handleButtonClick={handleSeePlan}
          />
        </div>
      )}
    </div>
  );
};

export default Explore;
