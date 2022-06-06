import { Box, Button } from "@mui/material";
import Style from "./welcome.module.scss";
import rightArrow from "../../../assets/images/rightArrow.svg";
import welcomeProfileImage from "../../../assets/images/homeModule/welcomeProfile.png";
import { useLocation, useNavigate } from "react-router-dom";
import defaultBg from "../../../assets/images/homeModule/welcomeBg.png";
import { useEffect, useState } from "react";
import { WelcomeModel } from "../model/welcomeModel";
import {
  getPurchaseProgramAPICall,
  getWelcomeDataAPICall,
} from "../homeService/homeService";
import DisplayImage from "../../../shared/components/displayImage/displayImage";
import { Spinner } from "../../../shared/components/spinner/spinner";
import environment from "../../../environment";
import { getYoutubeVideoId } from "../../../shared/js/getYoutubeVideoId";

const _welcomeModel = new WelcomeModel();

const Welcome = () => {
  const [welcomeData, setWelcomeData] = useState({ ..._welcomeModel });
  const navigate = useNavigate();
  const { state } = useLocation();
  const { title, backgroundImage, page } = state || {};
  const [isLoader, setIsLoader] = useState(true);

  useEffect(async () => {
    let _planId;
    switch (page) {
      case "boost":
        _planId = 1;
        break;
      case "empowerment":
        _planId = 2;
        break;
      case "unstoppable":
        _planId = 3;
        break;
      default:
        let _welcomeData = await getWelcomeDataAPICall();
        setWelcomeData({ ..._welcomeData.welcomeData });
        setIsLoader(false);
        return;
    }
    await getWelcomeData(_planId);
    setIsLoader(false);
  }, [page]);

  const getWelcomeData = async (planId) => {
    let _response = await getPurchaseProgramAPICall();
    if (_response.isSuccess) {
      let _plan = _response.purchaseProgramList.find(
        (plan) => plan.id === planId
      );
      let _welcomeData = new WelcomeModel();
      const { authorName, authorDesignation, imageUrl, introVideo } = _plan;
      _welcomeData = {
        authorName: authorName,
        authorDesignation: authorDesignation,
        image: `${environment.serverUrl}` + `${imageUrl}`,
        video: "//www.youtube.com/embed/" + getYoutubeVideoId(introVideo)
      };
      setWelcomeData({ ..._welcomeData });
      setIsLoader(false);
    }
  };

  const handleNextPage = () => {
    if (page) {
      navigate("/case-studies", {
        state: {
          page,
        },
      });
    } else {
      navigate("/choose-reason");
    }
  };

  return (
    <div
      className={`container-fluid ${Style.mainContainer}`}
      style={{
        backgroundImage: `url('${backgroundImage || defaultBg}')`,
      }}
    >
      <div className="container">
        <span className={`d-flex justify-content-center ${Style.welcome}`}>
          Welcome {title}
        </span>
        {isLoader ? (
          <div className={Style.spiner}>
            <Spinner isWhite />
          </div>
        ) : (
          <div className="row mt-4 pt-3">
            <div className="col-lg-5 col-md-12 col-sm-12 mb-2">
              <div className={`${Style.leftContainer}`}>
                <Box className={`d-flex flex-column align-items-center`}>
                  <div className={`${Style.imageContainer}`}>
                    <DisplayImage
                      imageUrl={welcomeData.image}
                      className="rounded-circle w-100 h-100"
                    />
                  </div>
                  <h3 className="mt-3">{welcomeData.authorName}</h3>
                  <span>{welcomeData.authorDesignation}</span>
                </Box>
              </div>
            </div>
            <div
              className={`col-lg-7  col-md-12 col-sm-12 mb-2 d-flex justify-content-end ${Style.rightPortion}`}
            >
              <div className={` ${Style.videoContainer}`}>
                <iframe
                  className={`${Style.video}`}
                  id="welcome-video-container"
                  src={welcomeData.video}
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
      {!isLoader ? (
        <div className={`d-flex justify-content-end  ${Style.buttonContainer}`}>
          <Button
            onClick={handleNextPage}
            className={`mt-1 white-btn  text-transform-none ${Style.submitButton}`}
          >
            Next
            <span className="ms-2">
              <img src={rightArrow} width="30px" />
            </span>
          </Button>
        </div>
      ) : null}
    </div>
  );
};
export default Welcome;
