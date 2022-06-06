import Style from "./selectProblem.module.scss";
import SelectProblemCard from "./selectProblemCard/selectProblemCard";
import rightArrow from "../../../assets/images/rightArrow.svg";
import { ReactComponent as AngerImage } from "../../../assets/images/homeModule/selectProblem/anger.svg";
import { ReactComponent as Insomnia } from "../../../assets/images/homeModule/selectProblem/insomnia.svg";
import { ReactComponent as Anxiety } from "../../../assets/images/homeModule/selectProblem/anxiety.svg";
import { ReactComponent as Depression } from "../../../assets/images/homeModule/selectProblem/depression.svg";
import { ReactComponent as Stress } from "../../../assets/images/homeModule/selectProblem/stress.svg";
import { ReactComponent as BurnOut } from "../../../assets/images/homeModule/selectProblem/burnOut.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getComplicationsAPICall,
  getPurchaseProgramAPICall,
  setComplicationsAPICall,
} from "../homeService/homeService";
import { async } from "@firebase/util";
import CustomButton from "../../../shared/components/customButton/customButton";
import { Spinner } from "../../../shared/components/spinner/spinner";

// const problemsList = [
//   { title: "Insomnia", icon: Insomnia, isSelected: false },
//   { title: "Anger/Aggression", icon: AngerImage, isSelected: false },
//   { title: "Anxiety", icon: Anxiety, isSelected: false },
//   { title: "Depression", icon: Depression, isSelected: false },
//   { title: "Stress", icon: Stress, isSelected: false },
//   { title: "Burn Out", icon: BurnOut, isSelected: false },
// ];
const SelectProblem = () => {
  const [problems, setProblems] = useState([]);
  const [improvementPlanId, setImprovementPlanId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isDisableButton, setIsDisableButton] = useState(true);
  const navigate = useNavigate();
  const search = useLocation().search;

  useEffect(async () => {
    let _response = await getPurchaseProgramAPICall();
    if (_response.isSuccess) {
      let _improvementPlanId = _response?.purchaseProgramList[1]?.id;
      setImprovementPlanId(_improvementPlanId);
      await getComplications(_improvementPlanId);
    }
    setIsLoading(true);
  }, []);

  const getComplications = async (improvementPlanId) => {
    let _response = await getComplicationsAPICall(improvementPlanId);
    setIsLoading(false);
    if (_response.isSuccess) {
      setProblems([..._response.complicationsList]);
    }
  };

  const handleNextPage = () => {
    navigate("/welcome", {
      state: {
        title: "to Empowerment",
        navigationUrl: "/dashboard/empowerment",
        page: "empowerment",
      },
    });
  };
  const handleSelectedCard = (index) => {
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
    <div className={`container-fluid  ${Style.mainContainer} pb-2`}>
      <div className={`container pt-5 ${Style.container}`}>
        <h2 className="py-5">Select Problems You have</h2>
        <div className="row">
        {isLoading  ? (problems.length ?
            <div className="col-lg-9 col-md-12 col-sm-12">
                <div className="row">
                {problems?.map((problem, index) => (
                    <div className={`col-lg-4 col-md-6 col-sm-6 col-6 mb-5`}>
                    <SelectProblemCard
                        key={index}
                        index={index}
                        isSelected={problem.isSelected}
                        handleSelectedCard={handleSelectedCard}
                        title={problem.title}
                        Icon={problem.icon}
                    />
                    </div>
                ))}
                </div>
            </div>:
        <div className={"d-flex justify-content-center"} >No Problem avalilable </div>):
        <div className={"d-flex justify-content-center"} ><Spinner isWhite/> </div>
        }
        </div>
        <div
          className={`d-flex justify-content-end ${Style.whiteButtonContainer}`}
        >
          {problems.length > 0 && (
            <CustomButton
              title={"Next"}
              disabled={isDisableButton}
              isLoading={isButtonLoading}
              handleButtonClick={handleSelectedComplication}
            >
              <img src={rightArrow} className={Style.whiteButtonArrow} />
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectProblem;
