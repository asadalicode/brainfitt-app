import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPurchaseProgramAPICall } from "../homeService/homeService";
import Style from "./purchaseProgram.module.scss";
import PurchaseProgramCard from "./purchaseProgramCard/purchaseProgramCard";
import { Spinner } from "../../../shared/components/spinner/spinner";
import { getUserPlanStatus } from "../../auth/authService/authService";

// const programs = [
//     { title: 'Boost your Mental Well-being', navigateLink: '/premium', description: 'perfect for you if you have low to moderate mental health challenges and want to wake up every day feeling happier and in a better mood.', isRecomended: true },
//     { title: 'Empowerment Program', navigateLink: '/select-problem', description: 'brilliant if you are looking for healing for your mental illness so that you can live a more inspired life.', isRecomended: true },
//     { title: 'Unstoppable You', navigateLink: '/select-multiple-problem', description: 'brilliant if you are looking for healing for your mental illness so that you can live a more inspired life.', isRecomended: false },
// ]
const PurchaseProgram = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userPlanStatus, setUserPlanStatus] = useState([]);

  useEffect(() => {
    getPurchaseProgramAndStatus();
  }, []);

  const getPurchaseProgramAndStatus = async () => {
    let _response = await getPurchaseProgramAPICall();
    if (_response.isSuccess) {
      setPrograms(_response.purchaseProgramList);
    }
    let _result = await getUserPlanStatus();
    if (_result.isSuccess) {
      setUserPlanStatus([..._result.userPlanStatuses]);
    }
    setIsLoading(false);
  };

  const handlePurchaseProgram = (route, id) => {
    let _url = route + `?improvementPlanId=${id}`;
    let _planStatus = userPlanStatus.find(
      (plan) => plan.improvement_plan_id === id
    ).status;
    if (_planStatus.toLowerCase() === "active") {
      switch (id) {
        case 1:
          _url = "/dashboard/boost";
          break;
        case 2:
          _url = "/dashboard/empowerment";
          break;
        case 3:
          _url = "/dashboard/unstoppable";
          break;
        default:
          break;
      }
    }

    navigate(_url);
  };

  return (
    <div className={`container-fluid  ${Style.mainContainer} pb-4`}>
      <div className={`container pt-4`}>
        <h2 className="py-5">Purchase a program...</h2>
        <div className="row">
          {!isLoading ? (
            programs.length ? (
              programs?.map((program) => (
                <div className={"col-lg-4 col-12 mb-3"}>
                  <PurchaseProgramCard
                    program={program}
                    handleSelect={handlePurchaseProgram}
                  />
                </div>
              ))
            ) : (
              <div className={"d-flex justify-content-center"}>
                No program avalilable{" "}
              </div>
            )
          ) : (
            <div className={"d-flex justify-content-center"}>
              <Spinner isWhite />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseProgram;
