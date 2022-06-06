import Style from "./selectMultipleProblem.module.scss";
import SelectMultipleProblemCard from "./selectMultipleProblemCard/selectMultipleProblemCard";
import rightArrow from "../../../assets/images/rightArrow.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import unstoppableBg from "../../../assets/images/dashboardModule/unstoppable/bg.png";
import {
  getComplicationsAPICall,
  getPurchaseProgramAPICall,
  setComplicationsAPICall,
} from "../homeService/homeService";
import { Spinner } from "../../../shared/components/spinner/spinner";
import CustomButton from "../../../shared/components/customButton/customButton";

// const multipleProblem = [
//     { id: 1, title: 'Struggle to achieve my goals.', isSelected: false },
//     { id: 2, title: 'Not focused', isSelected: false },
//     { id: 3, title: 'Performance fatigue', isSelected: false },
//     { id: 4, title: 'Lack of motivation', isSelected: false },
//     { id: 5, title: 'Fear of failure', isSelected: false },
//     { id: 6, title: 'Limited thinking', isSelected: false },
//     { id: 7, title: 'Lack of determination', isSelected: false },
//     { id: 8, title: 'Struggling to reach my success potential.', isSelected: false },
//     { id: 9, title: 'Lack of will power', isSelected: false },
//     { id: 10, title: 'Lack mentality', isSelected: false },
// ];

const SelectMultipleProblem = () => {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isDisableButton, setIsDisableButton] = useState(true);
  const [improvementPlanId, setImprovementPlanId] = useState(null);
  const navigate = useNavigate();

  useEffect(async () => {
    setIsLoading(true);
    let _response = await getPurchaseProgramAPICall();
    if (_response.isSuccess) {
      let _improvementPlanId = _response?.purchaseProgramList[2]?.id;
      setImprovementPlanId(_improvementPlanId);
      await getComplications(_improvementPlanId);
    }
  }, []);

  const getComplications = async (improvementPlanId) => {
    let _response = await getComplicationsAPICall(improvementPlanId);
    setIsLoading(false);
    if (_response.isSuccess) {
      setProblems([..._response.complicationsList]);
    }
  };

  const handleSelectedProblem = (index) => {
    setIsDisableButton(true)
    let _problems = [...problems];
    _problems[index].isSelected = !_problems[index].isSelected;
    setProblems([..._problems]);

    _problems.map(problem => {
      if(problem.isSelected){
        setIsDisableButton(false)
      }
    })
  };

  const handleNextPage = () => {
    navigate("/welcome", {
      state: {
        title: "to Unstoppable You",
        backgroundImage: unstoppableBg,
        page: "unstoppable",
      },
    });
  };
  const handleSelectedComplication = async () => {
    let _complications = problems
      .filter((problem) => problem.isSelected === true)
      .map((prob) => {
        return prob.id;
      });
    setIsButtonLoading(true);
    let _response = await setComplicationsAPICall(
      _complications,
      improvementPlanId
    );
    setIsButtonLoading(false);
    if (_response.isSuccess) {
      handleNextPage();
    }
  };
  return (
    <div className={`${Style.mainContainer}`}>
      <div className={`container pt-3 `}>
        <h2 className={`py-5 ${Style.title}`}>Select Problems You have</h2>
        <div className={`${Style.contentContainer}`}>
          <div className="row">
            {!isLoading ? (
              problems.length ? (
                problems?.map((problem, index) => (
                  <div
                    key={problem.id}
                    className="col-lg-6 col-md-12 col-sm-12 col-12 mb-4"
                  >
                    <SelectMultipleProblemCard
                      index={index}
                      title={problem.title}
                      id={problem.id}
                      isSelected={problem.isSelected}
                      handleSelectedProblem={handleSelectedProblem}
                    />
                  </div>
                ))
              ) : (
                <div className={"d-flex justify-content-center"}>
                  No Problem avalilable{" "}
                </div>
              )
            ) : (
              <div className={"d-flex justify-content-center"}>
                <Spinner isWhite />{" "}
              </div>
            )}
          </div>
          {!isLoading && problems.length > 0 && (
            <div
              className={`d-flex justify-content-end mt-4 ${Style.whiteButtonContainer}`}
            >
              <CustomButton
                isLoading={isButtonLoading}
                title={"Next"}
                disabled={isDisableButton}
                buttonStyle={Style.nextButton}
                handleButtonClick={handleSelectedComplication}
              >
                <span class="pl-2">
                  <img src={rightArrow} className={Style.whiteButtonArrow} />
                </span>
              </CustomButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SelectMultipleProblem;
