import Empowerment from "../empowerment/empowerment";
import { improvementPlanEnum } from "../../../shared/js/enums";
import Unstoppable from "./unstoppable";

const UnstoppableOuterContainer = () => {
  return (
    <>
      <Unstoppable improvementPlanId={improvementPlanEnum.unstoppable} />
    </>
  );
};
export default UnstoppableOuterContainer;
