import Empowerment from './empowerment';
import { improvementPlanEnum } from "../../../shared/js/enums";

const EmpowerOuterContainer = () => {
  return (
    <>
      <Empowerment improvementPlanId={improvementPlanEnum.empowerment} />
    </>
  );
};
export default EmpowerOuterContainer;
