import { Box, Container } from "@mui/material";
import "react-intl-tel-input/dist/main.css";
import Style from "./emailVerificationForm.module.scss";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../../../../shared/components/customButton/customButton";
import InputField from "../../../../shared/components/inputField/inputField";
import {
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators,
} from "react-reactive-form";
import { updateEmailAPICall } from "../../authService/authService";
import { getUserData } from "../../../../shared/js/userCredential";
import { UserModel } from "../../model/userModel";
import { UserStatus } from "../../../../shared/js/enums";
import { getUserActiveStatus } from "../../../../shared/js/getUserActiveStatus";
import { webFlowRoutes } from "../../../../shared/js/webFlowRoutes";
import { addUpdateUser } from "../../../chat/services/chat";

const EmailVerificationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const emailVerificationForm1 = FormBuilder.group({
    email: ["", Validators.required],
  });

  useEffect(async()=>{
    let _getEmail = await getUserData() 
    emailVerificationForm1.patchValue({
      ...emailVerificationForm1,
      email: _getEmail?.email
    })
  },[])

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
  const search = useLocation().search;
  const handleSubmit = async (e, formValue) => {
    e.preventDefault();
    let _email = formValue.email;
    if (_email === "") {
      return;
    }
    setIsLoading(true);
    let _isSuccess = await updateEmailAPICall(_email);
    setIsLoading(false);
    if (_isSuccess) {
      let _userData = await getUserData();
      const { userId, email, imageUrl, firstName, lastName, status } =
        _userData;
      let _user = {
        id: userId,
        userEmail: email,
        userDisplayName: `${firstName ? firstName : ""}${
          lastName ? lastName : ""
        }`,
        userPhotoUrl: imageUrl ? imageUrl : "",
        online: true,
      };
      addUpdateUser(_user);
      status === UserStatus.referral
        ? navigate("/referral-code")
        : handleNextPageNavigation();
    }
  };

  return (
    <div>
      <h3 class={`text-white text-center mb-1 ${Style.mainHeading}`}>
        Step towards happiness
      </h3>
      <Container className={`${Style.signupBox} `}>
        <h4 class={`text-white mt-3 ${Style.title}`}>Email Verification</h4>
        <p
          class={`text-white text-center mx-auto ${Style.description} ${Style.fieldWidth}`}
        >
          Please enter your email address because this email will be unique
          identification for you in the application.
        </p>
        <FieldGroup
          control={emailVerificationForm1}
          render={({ get, invalid, disabled, value }) => (
            <form onSubmit={(e) => handleSubmit(e, value)}>
              <label
                class={`text-white  mb-0  mt-2 text-start ${Style.fieldWidth} ${Style.labelText}`}
              >
                Enter Email
              </label>
              <div id="recaptcha_container"></div>
              <Container
                class={`d-flex py-3 justify-content-between ${Style.otpFieldBox}`}
              >
                <FieldControl
                  name="email"
                  render={TextInput}
                  meta={{
                    label: "Email",
                    placeholder: "xyz123@gmail.com",
                    type: "email",
                    inputStyle: Style.emailInput,
                    containerStyle: Style.emailContainer,
                  }}
                />
              </Container>
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
                isLoading={isLoading}
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

export default EmailVerificationForm;
