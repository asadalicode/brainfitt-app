import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Style from "./caseStudies.module.scss";
import CaseStudiesCard from "./caseStudiesCard/caseStudiesCard";
import unstoppableBackgroundImage from "../../../assets/images/dashboardModule/unstoppable/bg.png";
import boostBackgroundImage from "../../../assets/images/dashboardModule/empowerment/bg.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getOnboardingVideosAPICall } from "../homeService/homeService";
import { caseStudyTypeEnum } from "../../../shared/js/enums";
import { Spinner } from "../../../shared/components/spinner/spinner";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2.8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const defaultData = {
  slides: [
    {
      title: "TRAILER - BlueRain",
      videoUrl: "https://www.youtube.com/embed/KPaLm_C7iMQ?autoplay=1",
    },
    {
      title: "BlueRain - PTSD The Silent Suffering",
      videoUrl: "https://www.youtube.com/embed/Lh5PoKJ5pYU?autoplay=1",
    },
    {
      title: "Taboo of a Broken Brain Trailer",
      videoUrl: "https://www.youtube.com/embed/0BOLCKLM8Vo?autoplay=1",
    },
    {
      title: "Taboo of A Broken Brain",
      videoUrl: "https://www.youtube.com/embed/vTipXj6VrXQ?autoplay=1",
    },
  ],
  title: "Client Reviews",
  backgroundImage: "",
  title: "Client Reviews",
};
const boost = {
  slides: [
    {
      title: "Jake's Review",
      videoUrl: "https://www.youtube.com/embed/Qs8XxB8ezJw?autoplay=1",
    },
    {
      title: "Less Stressed and Well Rested",
      videoUrl: " https://www.youtube.com/embed/eGjO1FJ7DiQ?autoplay=1",
    },
  ],
  skipUrl: "/dashboard/boost",
  backgroundImage: boostBackgroundImage,
  title: "Client Reviews",
};

const empowerment = {
  slides: [
    {
      title: "Rebecca Was Suicidal",
      videoUrl: "https://www.youtube.com/embed/YNd-pnPpfFo?autoplay=1",
    },
  ],
  skipUrl: "/case-studies",
  state: {
    page: "documentries",
  },
  backgroundImage: "",
  title: "Client Reviews",
};

const documentries = {
  slides: [
    {
      title: "TRAILER - BlueRain",
      videoUrl: "https://www.youtube.com/embed/KPaLm_C7iMQ?autoplay=1",
    },
    {
      title: "BlueRain - PTSD The Silent Suffering",
      videoUrl: "https://www.youtube.com/embed/Lh5PoKJ5pYU?autoplay=1",
    },
    {
      title: "Taboo of a Broken Brain Trailer",
      videoUrl: "https://www.youtube.com/embed/0BOLCKLM8Vo?autoplay=1",
    },
    {
      title: "Taboo of a Broken Brain",
      videoUrl: "https://www.youtube.com/embed/vTipXj6VrXQ?autoplay=1",
    },
  ],
  skipUrl: "/dashboard/empowerment",
  backgroundImage: "",
  title: "Documentaries",
};
const unstoppable = {
  slides: [
    {
      title: "Say No To Self Doubt",
      videoUrl: "https://www.youtube.com/embed/Y2zMxbgAm-Y?autoplay=1",
    },
  ],

  skipUrl: "/case-studies",
  state: {
    page: "unstoppableDocumentries",
  },
  backgroundImage: unstoppableBackgroundImage,
  title: "Client Reviews",
};

const unstoppableDocumentries = {
  slides: [
    {
      title: "TRAILER - BlueRain",
      videoUrl: "https://www.youtube.com/embed/KPaLm_C7iMQ?autoplay=1",
    },
    {
      title: "BlueRain - PTSD The Silent Suffering",
      videoUrl: "https://www.youtube.com/embed/Lh5PoKJ5pYU?autoplay=1",
    },
    {
      title: "Taboo of a Broken Brain Trailer",
      videoUrl: "https://www.youtube.com/embed/0BOLCKLM8Vo?autoplay=1",
    },
    {
      title: "Taboo of A Broken Brain",
      videoUrl: "https://www.youtube.com/embed/vTipXj6VrXQ?autoplay=1",
    },
  ],
  skipUrl: "/dashboard/unstoppable",
  backgroundImage: unstoppableBackgroundImage,
  title: "Documentaries",
};
const testimonialsEmpowerment = {
  slides: [
    {
      title: "",
      videoUrl: "https://www.youtube.com/embed/sIEWOwwXpvc?autoplay=1",
    },
    {
      title: "",
      videoUrl: "https://www.youtube.com/embed/PDtsgIdgass?autoplay=1",
    },
    {
      title: "",
      videoUrl: "https://www.youtube.com/embed/nPpS3nHdslk?autoplay=1",
    },
    {
      title: "",
      videoUrl: "https://www.youtube.com/embed/ssWRy43idG8?autoplay=1",
    },
  ],
  skipUrl: "/dashboard/empowerment",
  state: {
    stepper: 1,
  },
  backgroundImage: "",
  title: "Testimonials",
};
const testimonialsUnstoppable = {
  slides: [
    {
      title: "",
      videoUrl: "https://www.youtube.com/embed/sIEWOwwXpvc?autoplay=1",
    },
    {
      title: "",
      videoUrl: "https://www.youtube.com/embed/PDtsgIdgass?autoplay=1",
    },
    {
      title: "",
      videoUrl: "https://www.youtube.com/embed/nPpS3nHdslk?autoplay=1",
    },
    {
      title: "",
      videoUrl: "https://www.youtube.com/embed/ssWRy43idG8?autoplay=1",
    },
  ],
  skipUrl: "/dashboard/unstoppable",
  state: {
    stepper: 1,
  },
  backgroundImage: unstoppableBackgroundImage,
  title: "Testimonials",
};
const CaseStudies = () => {
  const [activeData, setActiveData] = useState(defaultData);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { page } = state || {};
  const [isMobileTab, setIsMobileTab] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [additionalTransfrom, setAdditionalTransfrom] = useState(0);

  const handleResize = () => {
    setIsMobileTab(window.innerWidth <= 850);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize());
  }, []);

  useEffect(async () => {
    if (page) {
      setCaseStudiesData(page);
    }
  }, [page]);

  const setCaseStudiesData = async (page) => {
    let _data = defaultData;
    switch (page) {
      case "empowerment":
        _data = await getOnboardingVideos(
          2,
          caseStudyTypeEnum.clientReview,
          empowerment
        );
        break;
      case "boost":
        _data = await getOnboardingVideos(
          1,
          caseStudyTypeEnum.clientReview,
          boost
        );
        break;
      case "unstoppable":
        _data = unstoppable;
        _data = await getOnboardingVideos(
          3,
          caseStudyTypeEnum.clientReview,
          unstoppable
        );
        break;
      case "documentries":
        _data = await getOnboardingVideos(
          2,
          caseStudyTypeEnum.documentry,
          documentries
        );
        break;
      case "unstoppableDocumentries":
        _data = await getOnboardingVideos(
          3,
          caseStudyTypeEnum.documentry,
          unstoppableDocumentries
        );
        break;
      case "testimonialsEmpowerment":
        _data = await getOnboardingVideos(
          2,
          caseStudyTypeEnum.testimonial,
          testimonialsEmpowerment
        );
        break;
      case "testimonialsUnstoppable":
        _data = await getOnboardingVideos(
          3,
          caseStudyTypeEnum.testimonial,
          testimonialsUnstoppable
        );
        break;
      default:
        break;
    }

    setActiveData({ ..._data });
  };

  const getOnboardingVideos = async (planId, caseStudyType, dataType) => {
    let _data = {};
    setIsLoading(true);
    let _response = await getOnboardingVideosAPICall(planId, caseStudyType);
    setIsLoading(false);
    if (_response.isSuccess) {
      _data = dataType;
      _data.slides = _response.videoList;
    }
    return _data;
  };

  const handleSkip = () => {
    navigate(activeData.skipUrl, {
      state: activeData?.state || {},
    });
  };

  return (
    <div
      className={`container-fluid ${Style.mainContainer}`}
      style={{
        backgroundImage: `url('${activeData.backgroundImage}')`,
      }}
    >
      <div className={`${Style.titleBar}`}>
        <div className="d-flex justify-content-center">
          <h2>{activeData.title}</h2>
          <span
            onClick={handleSkip}
            className={`cursor-pointer ${Style.skipText}`}
          >
            Skip
          </span>
        </div>
      </div>
      {!isLoading && activeData.slides.length > 0 && (
        <>
          {!isMobileTab && activeData.slides.length > 2 ? (
            <div className="mt-5 pt-3 mb-5 pb-2">
              <Carousel
                responsive={responsive}
                showDots={false}
                swipeable={false}
                containerClass={Style.carousel}
                autoPlay={false}
                autoPlaySpeed={100000000}
                additionalTransfrom={-additionalTransfrom}
                beforeChange={(nextSlide) => {
                  if (nextSlide !== 0 && additionalTransfrom !== 100) {
                    setAdditionalTransfrom(100);
                  }
                  if (nextSlide === 0 && additionalTransfrom === 100) {
                    setAdditionalTransfrom(0);
                  }
                }}
                removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
              >
                {activeData.slides?.map((slide) => (
                  <CaseStudiesCard
                    key={Math.random()}
                    title={slide.title}
                    videoUrl={slide?.videoUrl}
                  />
                ))}
              </Carousel>
            </div>
          ) : (
            <div
              className={`${Style.carouselContainer} ${
                activeData?.slides?.length === 1
                  ? Style.singleCarouselContainer
                  : ""
              } mt-5 pt-3 mb-5 pb-2`}
            >
              {activeData.slides?.map((slide) => (
                <div key={Math.random()}>
                  <div className={`${Style.carouselSlide}`}>
                    <CaseStudiesCard
                      title={slide.title}
                      videoUrl={slide?.videoUrl}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isLoading && (
        <div className="py-5">
          <Spinner isWhite={true} />
        </div>
      )}
      {!isLoading && !activeData.slides.length && (
        <div className="d-flex justify-content-center py-5">
          <p>Videos are not available</p>
        </div>
      )}
      {page !== "documentries" &&
        page !== "unstoppableDocumentries" &&
        page !== "testimonialsEmpowerment" &&
        page !== "testimonialsUnstoppable" && (
          <div className="d-flex justify-content-center">
            <button className={`white-btn ${Style.clientReview}`}>
              <a className="text-decoration-none text-dark" href="http://blissiree.com/" target="_blank">
                More Client Reviews
              </a>
            </button>
          </div>
        )}
    </div>
  );
};
export default CaseStudies;
