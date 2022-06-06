import Style from "./stepperCard.module.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ReactComponent as TickIcon } from "../../../assets/images/tick.svg";

const StepperCard = ({
  label,
  title,
  session,
  index,
  totalLength,
  selected = false,
  isComplete,
  handleSelectedStepper,
}) => {
  const handleClick = () => {
    if (!isComplete && selected) {
      handleSelectedStepper?.(index);
    }
  };
  return (
    <>
      <div className={`d-flex align-items-center ${Style.stepper}`}>
        <div
          className={`${Style.label} ${selected ? Style.selectedLabel : ""}`}
        >
          <span>{label}</span>
        </div>
        <div
          className={`${Style.connectedLine} ${
            selected ? Style.selectedConnectedLine : ""
          }`}
        ></div>
        <div
          onClick={handleClick}
          className={`d-flex justify-content-between align-items-center 
                    ${Style.box} 
                    ${selected ? Style.selectedBox + " cursor-pointer" : ""}`}
        >
          <div
            className={`d-flex flex-column justify-content-center ${Style.titleSession}`}
          >
            <span>{title}</span>
          </div>
          <div className="me-1">
            {selected && !isComplete && <ChevronRightIcon />}
            {isComplete && <TickIcon height={30} />}
          </div>
        </div>
      </div>
      {index + 1 !== totalLength && (
        <div className={`${Style.verticalConnectedLine}`}></div>
      )}
    </>
  );
};
export default StepperCard;
