import { useEffect, useState } from "react";
import { createPaymentIntentAPICall } from "../../../modules/dashboard/dashboardService/empowermentUnstoppable";
import CustomButton from "../customButton/customButton";
import LoadStripe from "../loadStripe/loadStripe";
import Popup from "../popup/popup";
import Style from "./bottomBuyPopup.module.scss";

const BottomBuyPopup = ({
  currentSessionId,
  selectedSession,
  isMaintenance,
  currentSession,
  price
}) => {
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [stripeOption, setStripeOption] = useState({});
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (Object.keys(stripeOption).length > 0) {
      setIsShowPopup(true);
    }
  }, [stripeOption]);

  const handleButtonClick = async () => {
    setIsButtonLoading(true);
    let _response = await createPaymentIntentAPICall(currentSessionId);
    setIsButtonLoading(false);
    if (_response.isSuccess) {
      let _option = {
        clientSecret: _response.clientSecret,
      };
      setAmount(_response.amount);
      setStripeOption({ ..._option });
    }
  };

  const handleClosePopup = () => {
    setIsShowPopup(false);
  };

  return (
    <>
      <div className="w-100">
        <div
          // onClick={task?.isBuyButton ? "" : handleClick}
          className={`d-flex text-center flex-column align-items-center cursor-pointer ${Style.container}`}
        >
          <p className={`${Style.title}`}>
            {isMaintenance
              ? "Maintenance session"
              : `Empowerment session ${currentSession} `}
            audio will be available in 3 days, once session is bought.
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <CustomButton
            title={
              isMaintenance
                ? `Buy Maintenance Session "$${price}"`
                : `Buy Session ${selectedSession} "$${price}"`
            }
            isLoading={isButtonLoading}
            disabled={isButtonLoading}
            handleButtonClick={handleButtonClick}
          />
        </div>
      </div>
      {isShowPopup && (
        <Popup isOpen={true} handleClose={handleClosePopup} title={"Checkout"}>
          <LoadStripe
            isConfirmPayment={true}
            buttonLoading={false}
            options={stripeOption}
            amount={amount}
          />
        </Popup>
      )}
    </>
  );
};
export default BottomBuyPopup;
