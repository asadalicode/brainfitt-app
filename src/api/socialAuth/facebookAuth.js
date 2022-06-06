import React from "react";
import Style from "./socialAuth.module.scss";
import facebookLogo from "../../assets/images/signup/facebook.svg";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import environment from "../../environment";
import { SocialSigninModel } from "../../modules/auth/model/socialSigninModel";

const facebookAppId = environment.facebookAppId;

const FacebookAuth = ({ handleAuthData }) => {
  const responseFacebook = (res) => {
    if (res.id) {
      let _authData = new SocialSigninModel();
      _authData = {
        email: res?.email,
        token: res.id,
        platform: "facebook",
      };
      handleAuthData?.(_authData);
    }
  };
  return (
    <div>
      <FacebookLogin
        appId={facebookAppId}
        fields="name,email,picture"
        callback={responseFacebook}
        icon="fa fa-facebook"
        render={(renderProps) => (
          <img
            className={`${Style.socialIcon}`}
            onClick={renderProps.onClick}
            src={facebookLogo}
            alt="FacebookLogin"
          />
        )}
      />
    </div>
  );
};

export default FacebookAuth;
