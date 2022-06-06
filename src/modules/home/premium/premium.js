import Style from "./premium.module.scss";
import PremiumCard from "./premiumCard/premiumCard";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../../../assets/images/leftArrow.svg";
import premiumBg from "../../../assets/images/homeModule/premiumbg.png";
import {
  getBoostPlanAPICall,
  setSubscribePlan,
  getPurchaseProgramAPICall,
  updateSubscribePlan,
} from "../homeService/homeService";
import LoadStripe from "../../../shared/components/loadStripe/loadStripe";
import Popup from "../../../shared/components/popup/popup";
import { PaymentDetailModel } from "../model/paymentDetailModel";
import { handleToastMessage } from "../../../shared/js/handleToastMessage";
import boostBackgroundImage from "../../../assets/images/dashboardModule/empowerment/bg.png";
import { Spinner } from "../../../shared/components/spinner/spinner";
import { getUserIsGuest } from "../../../shared/js/authChecker";
import { getActiveSubscribePlanAPICall } from "../../dashboard/settings/settingService/settingService";

const premiumArray = [
  {
    id: 4,
    title: "14 Days",
    description: "Free Trail",
    price: "Free",
    duration: "14 days",
    currentPackage: true,
    tagline: "",
  },
  {
    id: 1,
    title: "Monthly",
    description: "Membership",
    price: "19.99",
    duration: "month",
    currentPackage: false,
    tagline: "For 2 Users",
  },
  {
    id: 2,
    title: "Yearly",
    description: "Membership",
    price: "150",
    duration: "year",
    currentPackage: false,
    tagline: "Saving $89.99",
  },
  {
    id: 3,
    title: "Family",
    description: "Package",
    price: "29.99",
    duration: "year",
    currentPackage: false,
    tagline: "For 5 Users",
  },
];

const Premium = () => {
  const [premiums, setPremiums] = useState([]);
  const [isShowStripeModel, setIsShowStripeModel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [boostPlanId, setBoostPlanId] = useState(false);
  const [stripeButtonLoading, setStripButtonLoading] = useState(false);
  const [improvementPlanId, setImprovementPlanId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { settingBackgroundImage, sourcePage } = state || {};

  const location = useLocation();
  const search = location?.search;
  const pathname = location?.pathname;
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 991);
  };

  useEffect(() => {
    let _improvementPlanId = new URLSearchParams(search).get(
      "improvementPlanId"
    );
    setImprovementPlanId(_improvementPlanId);
  }, []);

  useEffect(async () => {
    let _response = await getPurchaseProgramAPICall();
    let _improvementPlanId = _response?.purchaseProgramList[0]?.id;
    setImprovementPlanId(_improvementPlanId);
  }, []);

  useEffect(async () => {
    let _paymentPlan = await getBoostPlanAPICall();
    setPremiums([..._paymentPlan.paymentPlanList]);
    setActivePlan(_paymentPlan.paymentPlanList);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize());
  }, []);

  const setActivePlan = async (premiumPlan) => {
    let _response = await getActiveSubscribePlanAPICall();
    if (!_response.error) {
      let _activePlanId = _response.data.plan_id;
      let _premiums = [...premiumPlan];
      let _premium = _premiums.find((plan) => plan.id === _activePlanId);
      _premium.isSubscribed = true;
      setPremiums([..._premiums]);
    }
  };

  const handleChangePackage = (index) => {
    let _premium = premiums;
    _premium = _premium.map((item) => {
      return { ...item, currentPackage: false };
    });
    _premium[index].currentPackage = true;
    setPremiums([..._premium]);
  };

  const handleChoosepackage = (stripePriceId, boostPlanId) => {
    if (getUserIsGuest()) {
      handleToastMessage(
        "error",
        "You are not currently not registered with us. <br/> Kindly sign up and subscribe us from the Boost Section"
      );
      return;
    }
    setIsShowStripeModel(true);
    setBoostPlanId(boostPlanId);
  };
  const handleBackButton = () => {
    navigate(-1);
  };
  const handleClosePopup = () => {
    setIsShowStripeModel(false);
  };

  const handleStripePayment = async (stripeTokenId) => {
    let _paymentDetail = new PaymentDetailModel();
    _paymentDetail.boostPlanId = boostPlanId;
    _paymentDetail.stripeTokenId = stripeTokenId;
    _paymentDetail.improvementPlanId = improvementPlanId;
    setStripButtonLoading(true);
    let _isSuccess = false;
    let _isAvtivePlan = await getActiveSubscribePlanAPICall();
    let _plan = getBoostPlan(boostPlanId);
    let _isFree = parseInt(_plan.price) > 0 ? false : true;

    if (
      _isAvtivePlan.success &&
      parseInt(_isAvtivePlan.data.price) > 0 &&
      !_isFree
    ) {
      _isSuccess = await updateSubscribePlan(boostPlanId);
    } else {
      _isSuccess = await setSubscribePlan(_paymentDetail);
    }
    setStripButtonLoading(false);
    if (_isSuccess) {
      setIsShowStripeModel(false);
      if (parseInt(_plan.price) > 0) {
        handleToastMessage(
          "success",
          `Your amount for ${_plan.title} ${_plan.titleTagline} is received successfully.`
        );
      } else {
        handleToastMessage("success", "Plan subscribe successfully.");
      }
      navigate("/welcome", {
        state: {
          title: "to Boost",
          backgroundImage: boostBackgroundImage,
          page: "boost",
        },
      });
    }
  };

  const getBoostPlan = (id) => {
    return premiums.find((premium) => premium.id === id);
  };

  return (
    <div
      className={`container-fluid  ${Style.mainContainer} pb-2`}
      style={{
        backgroundImage: `url('${settingBackgroundImage || premiumBg}')`,
      }}
    >
      {isShowStripeModel && (
        <Popup
          isOpen={isShowStripeModel}
          handleClose={handleClosePopup}
          title={"Checkout"}
        >
          <LoadStripe
            handlePyamentPayload={handleStripePayment}
            buttonLoading={stripeButtonLoading}
          />
        </Popup>
      )}
      <div className={`container ${Style.container}`}>
        <div className="d-flex">
          {settingBackgroundImage && (
            <LeftArrow
              fill={"white"}
              onClick={handleBackButton}
              className={`cursor-pointer ${Style.backButton}`}
            />
          )}
          <h2 className={`py-2 text-center mx-auto ${Style.title}`}>
            Add Premium Smiles To Your Free Account
          </h2>
        </div>
        {!isLoading ? (
          <div className={`row ${Style.premiumContainer}`}>
            {premiums?.length ? (
              premiums?.map((premium) => {
                let _flag = isMobile ? premium.currentPackage : true;
                if (_flag)
                  return (
                    <div key={premium.id} className={`col-lg-3 col-12 p-0`}>
                      <PremiumCard
                        premium={premium}
                        handleChoosePackage={handleChoosepackage}
                      />
                    </div>
                  );
              })
            ) : (
              <div className={"d-flex justify-content-center my-5"}>
                No Plan Avalilable{" "}
              </div>
            )}
          </div>
        ) : (
          <div className={"d-flex justify-content-center my-5"}>
            <Spinner isWhite />
          </div>
        )}
        {isMobile && (
          <div className="mt-2">
            <Button
              class={`${Style.premiumBtn} ${
                premiums[0].currentPackage ? "white-btn" : "unselected-btn"
              } `}
              onClick={() => handleChangePackage(0)}
            >
              Free Trail
            </Button>
            <Button
              class={`${Style.premiumBtn} ${
                premiums[1].currentPackage ? "white-btn" : "unselected-btn"
              }`}
              onClick={() => handleChangePackage(1)}
            >
              Monthly
            </Button>
            <Button
              class={`${Style.premiumBtn}  ${
                premiums[2].currentPackage ? "white-btn" : "unselected-btn"
              } `}
              onClick={() => handleChangePackage(2)}
            >
              Yearly
            </Button>
            <Button
              class={`${Style.premiumBtn}  ${
                premiums[3].currentPackage ? "white-btn" : "unselected-btn"
              } `}
              onClick={() => handleChangePackage(3)}
            >
              Family pkg
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Premium;
