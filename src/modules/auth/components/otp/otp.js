import React, { useState, useEffect } from "react";
import "react-intl-tel-input/dist/main.css";
import CarouselSlider from "../../../../shared/components/carouselSlider/carouselSlider";
import AuthLayout from "../authLayout/authLayout";
import rightBackgroundImage from "../../../../assets/images/otp/bg.png";
import rightBackgroundImage1 from "../../../../assets/images/otp/bg1.png";
import Blissiree from "../../../../assets/images/signup/blissiree.svg";
import Style from "./otp.module.scss";
import OtpForm from "../otpForm/otpForm";

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

const Otp = ({ phoneNumber }) => {
  const [isMobileTab, setIsMobileTab] = useState(false);
  const [rightContainerBackground, setRightContainerBackground] = useState(
    rightBackgroundImage1
  );

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

  return (
    <AuthLayout
      LeftComponent={() => (
        <CarouselSlider
          autoPlay={false}
          swipe={true}
          navButtonsAlwaysVisible={true}
          indicatorIcon={<span className={Style.indicatorIcon}></span>}
          centerIndicator={false}
          carouselSlides={slides}
          activeIndicatorIcon={{
            style: {
              width: "23px",
              backgroundColor: "black",
              height: "5px",
              borderRadius: "4px",
            },
          }}
        />
      )}
      RightComponent={() => <OtpForm phoneNumber={phoneNumber} />}
      rightBackgroundImage={rightContainerBackground}
      isOtp={true}
    />
  );
};
export default Otp;
