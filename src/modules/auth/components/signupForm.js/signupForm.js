import React, { useState } from "react";
import { Container } from "@mui/material";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import instagramLogo from "../../../../assets/images/signup/instagram.svg";
import { useNavigate, useLocation } from "react-router-dom";
import GoogleAuth from "../../../../api/socialAuth/googleAuth";
import Style from "./signupForm.module.scss";
import FacebookAuth from "../../../../api/socialAuth/facebookAuth";
import InstagramAuth from "../../../../api/socialAuth/instagramAuth";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
  requestOtp,
  singUpAPICall,
  socialLoginAPICall,
} from "../../authService/authService";
import CustomButton from "../../../../shared/components/customButton/customButton";
import { getUserActiveStatus } from "../../../../shared/js/getUserActiveStatus";
import { webFlowRoutes } from "../../../../shared/js/webFlowRoutes";
import { UserStatus } from "../../../../shared/js/enums";

import {
  getUserToken,
  setItemInLocalStorage,
  setUserToken,
} from "../../../../shared/js/userCredential";
import environment from "../../../../environment";

const SignupForm = ({ handleOtpPage }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const search = useLocation().search;
  const handleChange = (status, phoneNumber, country) => {
    let _phoneNumber = "+" + country.dialCode + phoneNumber;
    setPhoneNumber(_phoneNumber);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isValidPhoneNumber(phoneNumber)) {
      setIsLoading(true);
      let _isUserStoreInLocalStorage = false;

      const _isSuccess = await singUpAPICall(
        phoneNumber,
        _isUserStoreInLocalStorage
      );
      setIsLoading(false);
      if (_isSuccess) {
        setIsLoading(true);
        const _response = await requestOtp(phoneNumber);
        setIsLoading(false);
        // if (_isSuccess) {
        //   if (_isSuccess) {
        //     // navigate("/otp");
        handleOtpPage?.(true, phoneNumber);
        //   }
        // }
      }
    } else {
      setIsValid(isValidPhoneNumber(phoneNumber));
    }
  };

  const handleSocialAuthData = async (userData) => {
    setIsLoading(true);
    let _isSuccess = await socialLoginAPICall(userData);
    setIsLoading(false);
    if (_isSuccess) {
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
  };
  const handleExploreMore = async () => {
    let _token = getUserToken();
    if (!_token) {
      await setItemInLocalStorage("isGuest", true);
      await setUserToken(environment.guestToken);
    }
    navigate("/explore");
  };

  return (
    <div>
      <h4 class={`text-white text-center mb-1 ${Style.mainHeading}`}>
        Step towards happiness
      </h4>
      <Container className={`${Style.signupBox}`}>
        <h4 class={`text-white mt-3 ${Style.title}`}>Sign Up/Sign In</h4>
        <p
          class={`text-white  text-center mx-auto ${Style.description} ${Style.fieldWidth}`}
        >
          Enter phone number to signup, We send you a code for verification.
        </p>
        <form onSubmit={onSubmit}>
          <label
            class={`text-white  mb-1 text-start ${Style.phoneNumberLabel}`}
          >
            Phone Number
          </label>
          <IntlTelInput
            country={"pk"}
            separateDialCode={true}
            containerClassName={`intl-tel-input ${Style.phoneNumberLabel}`}
            inputClassName={`form-control ${Style.phoneInput}`}
            onPhoneNumberChange={handleChange}
          />
          {isValid ? (
            " "
          ) : (
            <label
              class={`text-danger mt-1 text-end ${Style.invalidPhoneNumberLabel}`}
            >
              invalid number
            </label>
          )}
          <div id="recaptcha_container"></div>
          <p class={`${Style.signWithText} text-white mt-2 mb-1`}>
            Or Signup With
          </p>
          <Container
            class={`d-flex py-2 justify-content-center ${Style.socialIconBox}`}
          >
            {/* <img className={`${Style.socialIcon}`} src={instagramLogo} alt="" /> */}

            {/* <div><InstagramAuth/></div> */}
            {/* <div>
              <InstagramAuth />
            </div> */}
            <div>
              <FacebookAuth handleAuthData={handleSocialAuthData} />
            </div>
            <div>
              <GoogleAuth handleAuthData={handleSocialAuthData} />
            </div>
          </Container>
          <CustomButton
            type="button"
            title="Explore more here"
            buttonStyle={Style.exploreButton}
            handleButtonClick={handleExploreMore}
          />
          <br />
          <CustomButton
            type="submit"
            title="SignUp/SignIn"
            buttonStyle={Style.submitButton}
            isLoading={isLoading}
          />
        </form>
      </Container>
    </div>
  );
};
export default SignupForm;
