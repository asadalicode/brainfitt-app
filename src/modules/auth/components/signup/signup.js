import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-intl-tel-input/dist/main.css";
import { useLocation, useNavigate } from "react-router-dom";
import CarouselSlider from "../../../../shared/components/carouselSlider/carouselSlider";
import AuthLayout from "../authLayout/authLayout";
import SignupForm from "../signupForm.js/signupForm";
import rightBackgroundImage1 from "../../../../assets/images/signup/bg1.png";
import rightBackgroundImage from "../../../../assets/images/signup/bg.png";
import Blissiree from "../../../../assets/images/signup/blissiree.svg";
import { getUserActiveStatus } from "../../../../shared/js/getUserActiveStatus";
import { webFlowRoutes } from "../../../../shared/js/webFlowRoutes";
import { authChecker, getUserIsGuest } from "../../../../shared/js/authChecker";
import Otp from "../otp/otp";

const slides = [
  {
    image: Blissiree,
    description:
      "Blissiree is perfect for you whether you suffer with a mental illness, want to elevate your performance, enhance personal growth or boost your mental wellbeing.",
  },
  {
    image: Blissiree,
    description:
      "Specifically designed for all ages, Blissiree may help reduce your emotional and psychological stress from as early as in the womb while you sleep at night.",
  },
  {
    image: Blissiree,
    description:
      "In use and tested for over 15 years, the programs you experience using Blissiree are currently undergoing evidence-based research. Blissiree is safe and effective.",
  },
  {
    image: Blissiree,

    description:
      "Blissiree supports you while yo heal. We employ qualified mental health therapists to support you while you recover from mental health challenges.",
  },
  {
    image: Blissiree,
    description:
      "Try before you buy. It is important to have confidence in Blissiree, so we offer a free trial. Experience life differently without financial risk.",
  },
  {
    image: Blissiree,
    description:
      "Blissiree’s mission is to end all emotional suffering, reignite happiness and empower others to live extraordinary lives.",
  },
];

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShowOtp, setIsShowOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [signupInfo, setSignupInfo] = useState({
    id: 0,
    phoneNumber: "",
  });

  const [isMobileTab, setIsMobileTab] = useState(false);
  const [rightContainerBackground, setRightContainerBackground] = useState(
    rightBackgroundImage1
  );

  useEffect(() => {
    if (!getUserIsGuest()) {
      if (authChecker()) {
        let _status = getUserActiveStatus();
        let _redirectUrl = webFlowRoutes.find(
          (routeObj) => routeObj.status === _status
        )?.route;
        navigate(_redirectUrl || "/");
      }
    }
  }, []);

  const handleResize = () => {
    let _flag = window.innerWidth <= 850;
    if (_flag) {
      setRightContainerBackground(rightBackgroundImage);
    } else {
      setRightContainerBackground(rightBackgroundImage1);
    }
    setIsMobileTab(_flag);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize());
  }, []);

  const handleChange = (status, phoneNumber, country) => {
    setSignupInfo({ ...signupInfo, phoneNumber });
  };
  const onSubmit = () => {
    let path = location.search.split("=");
    axios("http://localhost:3002/signupInfo", {
      method: "POST",
      data: signupInfo,
    }).then((response) => {
      if (response.status === 201) {
        sessionStorage.setItem(
          "brainFit",
          JSON.stringify({ token: "123456789" })
        );
        path.length > 1 ? navigate(path[1]) : navigate("/home");
      }
      console.log("res ==", response);
    });
  };
  const handleOtpPage = (value, phoneNumber) => {
    setIsShowOtp(value);
    setPhoneNumber(phoneNumber);
  };
  return (
    <>
      {!isShowOtp ? (
        <AuthLayout
          LeftComponent={() => <CarouselSlider carouselSlides={slides} />}
          RightComponent={() => <SignupForm handleOtpPage={handleOtpPage} />}
          rightBackgroundImage={rightContainerBackground}
          isOtp={false}
        />
      ) : (
        <Otp phoneNumber={phoneNumber} />
      )}
    </>
  );
};

export default SignUp;
