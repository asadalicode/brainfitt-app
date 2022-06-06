import { async } from "@firebase/util";
import environment from "../../../environment";
import { backendCall } from "../../../shared/backendService/backendCall";
import { getYoutubeVideoId } from "../../../shared/js/getYoutubeVideoId";
import {
  getUserData,
  setItemInLocalStorage,
  setUserData,
} from "../../../shared/js/userCredential";
import { UserModel } from "../../auth/model/userModel";
import { ChooseReasonModel } from "../model/chooseReasonModel";
import { PaymentPlanModel } from "../model/paymentPlanModel";
import { PurchaseProgramModel } from "../model/purchaseProgramModel";
import { SelectProblemModel } from "../model/selectProblemModel";
import { WelcomeModel } from "../model/welcomeModel";

export const setReasonAPICall = async (objectives) => {
  let _url = "user/set_user_objectives";
  let _data = {
    objectives: objectives,
  };
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
        scores,
        id,
      } = response.data;
      let _user = new UserModel();

      _user.mobileNumber = phone;
      _user.dob = dob;
      _user.imageUrl = image_url;
      _user.email = email;
      _user.firstName = first_name;
      _user.lastName = last_name;
      _user.postalCode = postal_code;
      _user.status = status;
      _user.userId = id;
      _user.scores = scores;
      await setUserData(_user);
    }
  });

  return _isSuccess;
};
export const getReasonAPICall = async () => {
  let _url = "user/get_objectives";
  let _response = {
    isSuccess: false,
    reasons: [],
  };
  await backendCall(_url, "GET", {}).then(async (response) => {
    let _reasonModel = new ChooseReasonModel();

    let _reasons = response.data.map((reason) => {
      const { id, image_url, title } = reason;
      _reasonModel = {
        id: id,
        title: title,
        icon: image_url,
        isSelected: false,
      };
      return _reasonModel;
    });

    _response = {
      isSuccess: !response.error,
      reasons: _reasons,
    };
  });

  return _response;
};

export const getWelcomeDataAPICall = async () => {
  let _url = "user/get_app_intro_data";
  let _response = {
    isSuccess: false,
    reasons: {},
  };

  await backendCall(_url, "GET", {}).then(async (response) => {
    let _welcomeModel = new WelcomeModel();
    const {
      author_name,
      app_intro_video,
      app_intro_image,
      author_designation,
      google_form_link,
    } = response.data;

    _welcomeModel = {
      authorName: author_name,
      authorDesignation: author_designation,
      video: "//www.youtube.com/embed/" + getYoutubeVideoId(app_intro_video),
      image: app_intro_image,
      googleForm: google_form_link,
    };
    setItemInLocalStorage("googleFormLink", google_form_link);

    _response = {
      isSuccess: !response.error,
      welcomeData: _welcomeModel,
    };
  });

  return _response;
};

export const getBoostPlanAPICall = async () => {
  let _url = "boost/get_plans";
  let _response = {
    isSuccess: false,
    paymentPlanList: [],
  };

  await backendCall(_url, "GET", {}).then(async (response) => {
    let _paymentPlanModel = new PaymentPlanModel();

    let _paymentPlanList = response.data.map((paymentPlan, index) => {
      const {
        id,
        title,
        description,
        price,
        is_trial,
        trial_days,
        interval,
        stripe_price_id,
        is_family_plan,
        family_member_allowed,
        short_description,
      } = paymentPlan;
      let _titleArray = title.split("-");
      _paymentPlanModel = {
        id: id,
        title: _titleArray[0],
        description: description,
        price: price,
        isTrial: is_trial,
        trialDays: trial_days,
        interval: interval,
        stripePriceId: stripe_price_id,
        isFamilyPlan: is_family_plan,
        currentPackage: index === 0 ? true : false,
        allowUser: family_member_allowed,
        shorDescription: short_description,
        isSubscribed: false,
        titleTagline:
          _titleArray[1].trim()[0].toUpperCase() +
          _titleArray[1].trim().slice(1),
      };
      return _paymentPlanModel;
    });

    _response = {
      isSuccess: !response.error,
      paymentPlanList: _paymentPlanList,
    };
  });

  return _response;
};

export const getPurchaseProgramAPICall = async () => {
  let _url = "user/get_improvement_plans";
  let _response = {
    isSuccess: false,
    purchaseProgramList: [],
  };
  const programs = [
    {
      navigateLink: "/premium",
    },
    {
      navigateLink: "/select-problem",
    },
    {
      navigateLink: "/select-multiple-problem",
    },
  ];
  await backendCall(_url, "GET", {}).then(async (response) => {
    let _purchaseProgramModel = new PurchaseProgramModel();
    let _purchaseProgramList;
    if (!response.error) {
      _purchaseProgramList = response.data.map((purchaseProgram, index) => {
        const {
          id,
          title,
          description,
          intro_video,
          image_url,
          author_name,
          author_designation,
        } = purchaseProgram;
        _purchaseProgramModel = {
          id: id,
          title: title,
          description: description ? description : programs[index].description,
          navigateLink: programs[index].navigateLink,
          introVideo: intro_video,
          imageUrl: image_url,
          authorDesignation: author_designation,
          authorName: author_name,
        };
        return _purchaseProgramModel;
      });
    }

    let _scores = getUserData().scores;
    if (_scores >= 0 && _scores <= 4) {
      _purchaseProgramList[0].isRecomended = true;
      _purchaseProgramList[2].isRecomended = true;
    } else if (_scores > 4 && _scores <= 10) {
      _purchaseProgramList[0].isRecomended = true;
      _purchaseProgramList[1].isRecomended = true;
    }

    _response = {
      isSuccess: !response.error,
      purchaseProgramList: _purchaseProgramList,
    };
  });

  return _response;
};

export const setSubscribePlan = async (paymentDetail) => {
  let _url = "boost/subscribe_plan";
  let _data = {
    boost_plan_id: paymentDetail.boostPlanId,
    improvement_plan_id: paymentDetail.improvementPlanId,
    stripe_token: paymentDetail.stripeTokenId,
  };
  let _isSuccess = false;
  await backendCall(_url, "POST", _data).then(async (response) => {
    _isSuccess = !response.error;
  });

  return _isSuccess;
};
export const updateSubscribePlan = async (planId) => {
  let _url = `boost/change_subscription_plan/${planId}`;

  let _isSuccess = false;
  await backendCall(_url, "PUT").then(async (response) => {
    _isSuccess = !response.error;
  });

  return _isSuccess;
};

export const completeGoogleFormStepAPICall = async (isShowErrorMessage) => {
  let _url = "user/complete_google_form";
  let _data = {};
  let _isSuccess = false;
  await backendCall(_url, "POST", _data, true, isShowErrorMessage).then(
    async (response) => {
      _isSuccess = !response.error;
      if (!response?.error) {
        let {
          phone,
          last_name,
          first_name,
          postal_code,
          email,
          dob,
          image_url,
          id,
          status,
          scores,
        } = response.data;
        let _user = new UserModel();

        _user.mobileNumber = phone;
        _user.dob = dob;
        _user.userId = id;
        _user.imageUrl = image_url;
        _user.email = email;
        _user.firstName = first_name;
        _user.lastName = last_name;
        _user.postalCode = postal_code;
        _user.status = status;
        _user.scores = scores;
        await setUserData(_user);
      }
    }
  );

  return _isSuccess;
};

export const getOnboardingVideosAPICall = async (improvementPlanId, type) => {
  let _url = "empowerment/get_onboarding_content";
  let _response = {
    isSuccess: false,
    videoList: [],
  };
  let _data = {
    improvement_plan_id: improvementPlanId,
    type: type,
  };
  let _videoList = [];
  await backendCall(_url, "POST", _data).then(async (response) => {
    if (!response.error) {
      let _videoContent;
      _videoList = response.data.map((videoContent, index) => {
        const { id, title, video_link } = videoContent;
        _videoContent = {
          title: title,
          videoUrl: getYoutubeVideoId(video_link),
        };
        return _videoContent;
      });
    }

    _response = {
      isSuccess: !response.error,
      videoList: _videoList,
    };
  });

  return _response;
};

export const getComplicationsAPICall = async (improvementPlanId) => {
  let _url = "empowerment/get_complications";
  let _response = {
    isSuccess: false,
    complicationsList: [],
  };
  let _data = {
    improvement_plan_id: improvementPlanId,
  };
  let _complicationList = [];
  await backendCall(_url, "POST", _data).then(async (response) => {
    if (!response.error) {
      let _complication = new SelectProblemModel();
      _complicationList = response.data.map((complication, index) => {
        const { id, title, image } = complication;
        _complication = {
          id: id,
          title: title,
          icon: `${environment.serverUrl}` + `${image}`,
          isSelected: false,
        };
        return _complication;
      });
    }

    _response = {
      isSuccess: !response.error,
      complicationsList: _complicationList,
    };
  });

  return _response;
};

export const setComplicationsAPICall = async (
  complications,
  improvementPlanId
) => {
  let _url = "empowerment/set_complications";
  let _response = {
    isSuccess: false,
  };
  let _data = {
    complications: complications,
    improvement_plan_id: improvementPlanId,
  };
  let _isSuccess = false;
  await backendCall(_url, "POST", _data).then(async (response) => {
    _isSuccess = !response.error;
    let {
      phone,
      last_name,
      first_name,
      postal_code,
      email,
      dob,
      image_url,
      id,
      status,
      scores,
    } = response.data;
    let _user = new UserModel();
    _user.mobileNumber = phone;
    _user.dob = dob;
    _user.imageUrl = image_url;
    _user.email = email;
    _user.firstName = first_name;
    _user.userId = id;
    _user.lastName = last_name;
    _user.postalCode = postal_code;
    _user.status = status;
    _user.scores = scores;
    await setUserData(_user);
  });

  _response = {
    isSuccess: _isSuccess,
  };

  return _response;
};
