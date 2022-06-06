import { Box, Container } from "@mui/material";
import "react-intl-tel-input/dist/main.css";
import Style from "./referralCodeForm.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../shared/components/customButton/customButton";
import InputField from "../../../../shared/components/inputField/inputField";
import { ReactComponent as CheckIcon } from "../../../../assets/images/check.svg";
import {
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators,
} from "react-reactive-form";
import {
  ReferralCodeAPICall,
  updateEmailAPICall,
} from "../../authService/authService";
import { getUserData } from "../../../../shared/js/userCredential";
import { UserModel } from "../../model/userModel";
import { UserStatus } from "../../../../shared/js/enums";

// const referralReference = [
//     {
//       checkBox: false,
//       description: 'Through any social media account.',
//     },
//     {
//       checkBox: false,
//       description: 'Listening from any friend.',
//     },
//     {
//       checkBox: false,
//       description: 'Through our website.',
//     },
//     {
//       checkBox: false,
//       description: 'Other.',
//     }
//   ];

const ReferralCodeForm = () => {
  const navigate = useNavigate();
  const emailVerificationForm1 = FormBuilder.group({
    referral_code: [""],
    referralReference: [
      [
        {
          checkBox: false,
          description: "Through any social media account.",
        },
        {
          checkBox: false,
          description: "Listening from any friend.",
        },
        {
          checkBox: false,
          description: "Through our website.",
        },
        {
          checkBox: false,
          description: "Other.",
        },
      ],
    ],
  });

  const handleCheckValue = (check, i) => {
    emailVerificationForm1.value.referralReference[i].checkBox = !check;
    emailVerificationForm1.patchValue({
      ...emailVerificationForm1,
    });
  };
  const handleNextPageNavigation = async () => {
    let _route = "/welcome";
    let _userData = await getUserData();
    let _user = new UserModel();
    _user = _userData;
    switch (_user.status) {
      case UserStatus.onboarding:
        _route = "/welcome";
        break;
      case UserStatus.postOnboarding:
        _route = "/welcome";
        break;
      default:
        _route = "/welcome";
        break;
    }
    navigate(_route);
  };

  const handleSubmit = async (e, formValue) => {
    e.preventDefault();
    let _code = formValue.referral_code;
    let _referralReference="";
    let _referralPlatform = formValue.referralReference;
    _referralPlatform.map(item => {
      if(item.checkBox) {
        _referralReference += item.description+','
      }
    })
    // await ReferralCodeAPICall(_code);
    let _isSuccess = await ReferralCodeAPICall(_code,_referralReference);
    if(_isSuccess){
      handleNextPageNavigation();
    }
  };

  return (
    <div>
      <h3 class={`text-white text-center mb-1 ${Style.mainHeading}`}>
        Step towards happiness
      </h3>
      <Container className={`${Style.signupBox} `}>
        <h4 class={`text-white mt-3 ${Style.title}`}>Referral Code</h4>
        <p
          class={`text-white text-center mx-auto ${Style.description} ${Style.fieldWidth}`}
        >
          If anyone refers you then please enter the referral code.
        </p>
        <FieldGroup
          control={emailVerificationForm1}
          render={({ get, invalid, disabled, value }) => (
            <form onSubmit={(e) => handleSubmit(e, value)}>
              <label
                class={`text-white  mb-0  mt-2 text-start ${Style.fieldWidth} ${Style.labelText}`}
              >
                Referral Code
              </label>
              <div id="recaptcha_container"></div>
              <Container
                class={`d-flex py-2 justify-content-between ${Style.otpFieldBox}`}
              >
                <FieldControl
                  name="referral_code"
                  render={TextInput}
                  meta={{
                    label: "Referral Code",
                    placeholder: "Type Referral Code here ...",
                    type: "text",
                    inputStyle: Style.emailInput,
                    containerStyle: Style.emailContainer,
                  }}
                />
              </Container>
              <label
                class={`text-white  mb-3 ms-5 mt-2 text-start ${Style.fieldWidth} ${Style.labelText}`}
              >
                If not then tell how you come to know about this application.
              </label>
              {value.referralReference.map((item, i) => (
                <p
                  class={`text-white text-start mx-auto ${Style.description} ${Style.fieldWidth}`}
                >
                  <span
                    onClick={() => handleCheckValue(item.checkBox, i)}
                    className={`${Style.checkBox} me-2`}
                  >
                    {item.checkBox ? (
                      <CheckIcon className={Style.checkIcon} width={10} />
                    ) : (
                      <span className={Style.emptyTag} />
                    )}
                  </span>
                  {item.description}
                </p>
              ))}
              <Box
                sx={{ display: "flex" }}
                className={`mx-auto text-white justify-content-between ${Style.fieldWidth} ${Style.resendTextBox}`}
              >
                <div className="cursor-pointer">
                  {/* <img src={chatIcon} className={`${Style.chatIcon}`} /> */}
                  <span className={`${Style.labelText} m-2`}></span>
                </div>
                <span className={`${Style.labelText}`}></span>
              </Box>
              <p class={`text-white mt-2 mb-1 ${Style.second}`}></p>
              <CustomButton
                type="submit"
                title="Continue"
                buttonStyle={Style.submitButton}
                disabled={invalid}
                isLoading={false}
              />
            </form>
          )}
        />
      </Container>
    </div>
  );
};

const TextInput = ({ handler, touched, hasError, meta }) => (
  <div className="w-100">
    <InputField
      placeholder={`${meta.placeholder}`}
      error={touched && hasError("required") && `${meta.label} is required`}
      handler={handler}
      type={meta.type}
      inputStyle={meta.inputStyle}
      containerStyle={meta.containerStyle}
    />
    <span className={Style.inputError}>
      {touched && hasError("required") && `${meta.label} is required`}
    </span>
  </div>
);

export default ReferralCodeForm;
