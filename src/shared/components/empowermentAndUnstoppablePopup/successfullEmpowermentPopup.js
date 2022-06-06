import Style from "./empowermentAndUnstoppablePopup.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { TasksEnum } from "../../js/tasksEnum";

const SuccessfullEmpowermentPopup = ({
  title,
  selectedSession,
  isEmopwerment,
  currentSession,
  showButton = false,
  handlePopup,
  isMaintenance,
  month,
}) => {
  const handleButtonClick = () => {
    handlePopup?.(true);
  };

  return (
    <div className={`${Style.popup} mt-3 pb-5`}>
      {
        <div
          onClick={handleButtonClick}
          className={`d-flex justify-content-end cursor-pointer ${Style.cross}`}
        >
          <CloseIcon />
        </div>
      }
      <div
        className={`d-flex flex-column align-items-center text-center  ${Style.content}`}
      >
        <h5 className="mb-5">
          Successfully Completed
          {!isMaintenance && ` ${title}`}
          {isMaintenance && " Maitenance Session"}
          {month > 0 && ` Month ${month}`}
        </h5>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          ndustry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </p>

        {!isMaintenance && showButton && (
          <div className="mt-5">
            <button
              onClick={handleButtonClick}
              className="white-btn cursor-pointer w-100 mt-1"
            >
              {`${
                currentSession >= 14
                  ? "Pre-Session Maintenance"
                  : "Pre-Session " + `${currentSession + 1}`
              }  Audio`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default SuccessfullEmpowermentPopup;
