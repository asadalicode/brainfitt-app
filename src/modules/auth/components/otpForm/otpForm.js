import { Box, Container } from "@mui/material";
import { Button } from "@mui/material";
import "react-intl-tel-input/dist/main.css";
import chatIcon from "../../../../assets/images/otp/chat.svg";
import Style from "./otpForm.module.scss";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData } from "../../../../shared/js/userCredential";
import { UserModel } from "../../model/userModel";
import { requestOtp, singUpAPICall, verifyOtp } from "../../authService/authService";
import CustomButton from "../../../../shared/components/customButton/customButton";
import { useTimer } from "react-timer-hook";
import { getUserActiveStatus } from "../../../../shared/js/getUserActiveStatus";
import { webFlowRoutes } from "../../../../shared/js/webFlowRoutes";
import { UserStatus } from "../../../../shared/js/enums";

const OtpForm = ({phoneNumber}) => {
  const [otpValue, setOtpValue] = useState("");
  const navigate = useNavigate();
  const [isShowError, setIsShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 59);
  const { seconds, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  const search = useLocation().search;

  const setNewTimerValue = () => {
    let _expiryTimestamp = new Date();
    _expiryTimestamp.setSeconds(_expiryTimestamp.getSeconds() + 59);
    restart(_expiryTimestamp);
  };

  const handleOtp = async () => {
    if (seconds === 0) {
      setNewTimerValue();
      // let _userData = await getUserData();
      // let _user = new UserModel();
      // _user = _userData;
      requestOtp(phoneNumber);
    }
  };

  const handleOtpChange = (value) => {
    setOtpValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let _isSuccess = await verifyOtp(otpValue);
    setIsLoading(false);
    if (_isSuccess) {

        const _isSuccess = await singUpAPICall(phoneNumber);
        if(_isSuccess){
          let _status = getUserActiveStatus();
          let _redirectUrl = webFlowRoutes.find(
            (routeObj) => routeObj.status === _status
          )?.route;
    
          if (_redirectUrl === "/") {
            _redirectUrl = "/email-verification";
          }
          if (_status === UserStatus.active) {
            const _paramsRedirectUrl = new URLSearchParams(search).get(
              "redirectUrl"
            );
            if (_paramsRedirectUrl) {
              _redirectUrl = _paramsRedirectUrl;
            }
          }
          navigate(_redirectUrl);
        }
    } else {
      setIsShowError(true);
    }
  };

  return (
    <div>
      <h3 class={`text-white text-center mb-1 ${Style.mainHeading}`}>
        Step towards happiness
      </h3>
      <Container className={`${Style.signupBox} `}>
        <h4 class={`text-white mt-3 ${Style.title}`}>OTP</h4>
        <p
          class={`text-white text-center mx-auto ${Style.description} ${Style.fieldWidth}`}
        >
          Please enter verification code, we just send to your phone number
        </p>
        <form onSubmit={handleSubmit}>
          <label
            class={`text-white  mb-0  mt-2 text-start ${Style.fieldWidth} ${Style.labelText}`}
          >
            Verification Code
          </label>
          <Container
            class={`d-flex py-3 justify-content-between ${Style.otpFieldBox}`}
          >
            <OtpInput
              value={otpValue}
              onChange={handleOtpChange}
              className={`${Style.inputField}`}
              numInputs={6}
            />
          </Container>
          <div id="recaptcha_container"></div>
          {isShowError && (
            <label
              class={`text-danger  mb-1  mt-1 text-start ${Style.fieldWidth} ${Style.labelText}`}
            >
              Invalid OTP
            </label>
          )}
          <Box
            sx={{ display: "flex" }}
            className={`mx-auto text-white justify-content-between ${Style.fieldWidth} ${Style.resendTextBox}`}
          >
            <div
              onClick={handleOtp}
              className={`${seconds === 0 ? "cursor-pointer" : ""}`}
            >
              <img src={chatIcon} className={`${Style.chatIcon}`} />
              <span className={`${Style.labelText} m-2`}>Resend SMS</span>
            </div>
            <span className={`${Style.labelText}`}>Clear</span>
          </Box>
          <p class={`text-white mt-2 mb-1 ${Style.second}`}>
            {seconds}
            <span> S</span>
          </p>
          <CustomButton
            type="submit"
            title="Verify"
            buttonStyle={Style.submitButton}
            isLoading={isLoading}
          />
        </form>
      </Container>
    </div>
  );
};
export default OtpForm;
