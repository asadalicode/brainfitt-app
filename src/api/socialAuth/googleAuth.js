import React from "react";
import Style from "./socialAuth.module.scss";
import GoogleLogin from "react-google-login";
import googleLogo from "../../assets/images/signup/google.svg";
import environment from "../../environment";
import { SocialSigninModel } from "../../modules/auth/model/socialSigninModel";

const clientId = environment.googleClientId;

const GoogleAuth = ({ handleAuthData }) => {
  
  const responseGoogle = (res) => {
    let _authData = new SocialSigninModel();
    _authData = {
      email: res?.profileObj.email,
      token: res.googleId,
      platform: "google",
    };
    handleAuthData?.(_authData);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <img
            className={`${Style.socialIcon}`}
            onClick={renderProps.onClick}
            src={googleLogo}
            alt="googleLogo"
          />
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleAuth;
