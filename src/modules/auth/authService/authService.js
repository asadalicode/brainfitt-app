import { backendCall } from "../../../shared/backendService/backendCall";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import {
  setEntryId,
  setItemInLocalStorage,
  setUserData,
  setUserToken,
} from "../../../shared/js/userCredential";
import { UserModel } from "../model/userModel";
import { UserStatus } from "../../../shared/js/enums";
import { handleToastMessage } from "../../../shared/js/handleToastMessage";
import { startDateTimeActivityAPICall } from "../../dashboard/dashboardService/dashboard";
import { addUpdateUser } from "../../chat/services/chat";

export const singUpAPICall = async (
  phoneNumber,
  isUserStoreInLocalStorage = true
) => {
  let _url = "user/signup";
  let _data = {
    phone: phoneNumber,
  };
  let _isSuccess = false;
  await backendCall(_url, "POST", _data).then(async (response) => {
    if (!response.error) {
      if (response.data.status === UserStatus.deleted) {
        handleToastMessage("error", "Access denied");
        _isSuccess = false;
      } else {
        if (isUserStoreInLocalStorage) {
          let {
            phone,
            token,
            last_name,
            first_name,
            postal_code,
            email,
            dob,
            image_url,
            status,
            scores,
            country_id,
            id,
            state_id,
            address,
          } = response.data;
          let _user = new UserModel();

          _user.mobileNumber = phone;
          _user.dob = dob;
          _user.imageUrl = image_url;
          _user.email = email;
          _user.firstName = first_name;
          _user.lastName = last_name;
          _user.postalCode = postal_code;
          _user.userId = id;
          _user.status = status;
          _user.scores = scores;
          _user.country = country_id;
          _user.state = state_id;
          _user.address = address;

          await setUserData(_user);
          await setUserToken(token);
          await setItemInLocalStorage("isGuest", false);
          let _userFirebaseData = {
            id: _user.userId,
            userEmail: _user.email,
            online: true,
            userDisplayName: `${_user.firstName ? _user.firstName : ""}${
              _user.lastName ? _user.lastName : ""
            }`,
            userPhotoUrl: _user.imageUrl ? _user.imageUrl : "",
          };
          addUpdateUser(_userFirebaseData);
        }
        _isSuccess = !response.error;
      }
    }
  });
  let _entryId = await startDateTimeActivityAPICall(new Date().toISOString());
  setEntryId(_entryId?.data?.id);
  return _isSuccess;
};

const setInvisibleRecaptcha = () => {
  const recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha_container",
    {
      size: "invisible",
      callback: (response) => {
        console.log("response", response);
      },
    },
    auth
  );
  window.recaptchaVerifier = recaptchaVerifier;
  recaptchaVerifier.render();
};

export const requestOtp = async (phoneNumber) => {
  setInvisibleRecaptcha();
  const appVerifier = window.recaptchaVerifier;
  await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      console.log("confirmationResult", confirmationResult);
    })
    .catch((error) => {
      console.log("confirmationResult", error);
    });
};

export const verifyOtp = async (otp) => {
  let _isSuccess = false;
  await window.confirmationResult
    .confirm(otp)
    .then((result) => {
      const user = result.user;
      _isSuccess = true;
    })
    .catch((error) => {
      console.log("error", error);
      _isSuccess = false;
    });

  return _isSuccess;
};

export const updateEmailAPICall = async (email) => {
  let _url = "user/update_email";
  let _data = {
    email: email,
  };
  let _isSuccess = false;
  await backendCall(_url, "POST", _data).then(async (response) => {
    if (!response.error) {
      let {
        phone,
        last_name,
        first_name,
        postal_code,
        email,
        dob,
        image_url,
        status,
        id,
        scores,
      } = response.data;
      let _user = new UserModel();
      _user.mobileNumber = phone;
      _user.dob = dob;
      _user.imageUrl = image_url;
      _user.userId = id;
      _user.email = email;
      _user.firstName = first_name;
      _user.lastName = last_name;
      _user.postalCode = postal_code;
      _user.status = status;
      _user.scores = scores;
      await setUserData(_user);
    }
    _isSuccess = !response.error;
  });

  return _isSuccess;
};
export const ReferralCodeAPICall = async (referral_code, referral_platform) => {
  let _url = "user/set_referral_code";
  let _data = {};
  if (referral_code) {
    _data = {
      referral_code,
      referral_platform,
    };
  }
  let _isSuccess = false;
  await backendCall(_url, "POST", _data).then(async (response) => {
    _isSuccess = !response.error;
    if (!response.error) {
      let {
        phone,
        last_name,
        first_name,
        postal_code,
        email,
        dob,
        image_url,
        status,
        id,
        scores,
      } = response.data;
      let _user = new UserModel();
      _user.mobileNumber = phone;
      _user.dob = dob;
      _user.imageUrl = image_url;
      _user.userId = id;
      _user.email = email;
      _user.firstName = first_name;
      _user.lastName = last_name;
      _user.postalCode = postal_code;
      _user.status = status;
      _user.scores = scores;
      await setUserData(_user);
    }
  });

  return _isSuccess;
};

export const socialLoginAPICall = async (authData) => {
  let _url = "user/social_login";
  let _data = {
    email: authData.email,
    social_media_platform: authData.platform,
    social_media_token: authData.token,
  };
  let _isSuccess = false;
  await backendCall(_url, "POST", _data).then(async (response) => {
    if (!response.error) {
      let {
        phone,
        token,
        last_name,
        first_name,
        postal_code,
        email,
        dob,
        image_url,
        status,
        id,
        scores,
      } = response.data;
      let _user = new UserModel();

      _user.mobileNumber = phone;
      _user.dob = dob;
      _user.imageUrl = image_url;
      _user.email = email;
      _user.firstName = first_name;
      _user.lastName = last_name;
      _user.userId = id;
      _user.postalCode = postal_code;
      _user.status = status;
      _user.scores = scores;
      await setUserData(_user);
      await setItemInLocalStorage("isGuest", false);
      await setUserToken(token);
    }
    _isSuccess = !response.error;
  });

  return _isSuccess;
};
export const getUserPlanStatus = async (authData) => {
  let _url = "user/get_profile";
  let _response = {
    userPlanStatuses: [],
    isSuccess: false,
  };
  await backendCall(_url, "GET", {}).then(async (response) => {
    if (!response.error) {
      _response = {
        isSuccess: !response.error,
        userPlanStatuses: response.data.UserPlanStatuses,
        userReferralCoins: response.data.referral_coins,
        averageSleepTime: response.data.average_sleep_time,
        referralCode: response.data.referral_code,
      };
    }
  });

  return _response;
};
