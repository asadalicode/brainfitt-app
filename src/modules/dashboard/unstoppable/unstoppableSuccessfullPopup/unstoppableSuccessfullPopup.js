import Style from "../../../../shared/components/empowermentAndUnstoppablePopup/empowermentAndUnstoppablePopup.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../../../../shared/components/customButton/customButton";

const UnstoppableSuccessfullPopup = ({
  title,
  selectedSession,
  isEmopwerment,
  currentSession,
  price,
  showButton = false,
  handlePopup,
  isMaintenance,
  month,
  handleBuyButton,
  isButtonLoading = false,
  isNeextSessionPaid,
}) => {
  const handleButtonClick = () => {
    handlePopup?.(true);
  };

  const handlePurchaseButton = () => {
    handleBuyButton?.();
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

        {currentSession === 0 && !isNeextSessionPaid && (
          <div className="mt-5">
            <CustomButton
              title={`Buy Unstoppable You "$${price}"`}
              disabled={isButtonLoading}
              isLoading={isButtonLoading}
              buttonStyle={"white-btn cursor-pointer w-100 mt-1"}
              handleButtonClick={handlePurchaseButton}
            />
          </div>
        )}
        {currentSession !== 0 && !isMaintenance && showButton && (
          <div className="mt-5">
            {/* {selectedSession === 0 && (
              <span className={`${Style.aboveText}`}>
                {task?.button.aboveText}
              </span>
            )} */}
            <button
              onClick={handleButtonClick}
              className="white-btn cursor-pointer w-100 mt-1"
            >
              {currentSession === 10 && "Booster Pre-Session Audio"}
              {currentSession >= 11 && "Pre-Session Maintenance"}

              {currentSession > 0 && currentSession < 10 && (
                <>Pre-Session {currentSession + 1} Audio</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default UnstoppableSuccessfullPopup;
