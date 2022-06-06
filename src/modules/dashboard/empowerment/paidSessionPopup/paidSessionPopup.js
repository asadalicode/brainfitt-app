import { useEffect, useState } from "react";
import LoadStripe from "../../../../shared/components/loadStripe/loadStripe";
import Popup from "../../../../shared/components/popup/popup";
import Style from "./paidSessionPopup.module.scss";
import { createPaymentIntentAPICall } from "../../dashboardService/empowermentUnstoppable.js";
import CustomButton from "../../../../shared/components/customButton/customButton";

const PaidSessionPopup = ({
  isEmopwerment,
  isMaintenance,
  currentSession,
  currentSessionId,
  price,
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
      <div className={`${Style.popup} mt-3 pb-5`}>
        <div
          className={`d-flex flex-column align-items-center text-center  ${Style.content}`}
        >
          <h5 className="mb-5 mt-2">
            Successfully Completed Unstoppable you
            {currentSession === 1
              ? " Introductory Session"
              : ` Session ${currentSession}`}
          </h5>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            ndustry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
          <div className="mt-5 w-100">
            <CustomButton
              title={
                isEmopwerment && isMaintenance
                  ? `Buy Maintenance Session "$${price}"`
                  : `Buy Unstoppable You "$${price}" `
              }
              isLoading={isButtonLoading}
              disabled={isButtonLoading}
              handleButtonClick={handleButtonClick}
              buttonStyle={Style.whiteBtn}
            />
            {/* <button
              onClick={handleButtonClick}
              className="white-btn cursor-pointer w-100 mt-1"
            >{`Buy Session  ${currentSession + 1} `}</button> */}
          </div>
        </div>
      </div>

      {isShowPopup && (
        <Popup isOpen={true} handleClose={handleClosePopup} title={"Checkout"}>
          <LoadStripe
            amount={amount}
            isConfirmPayment={true}
            buttonLoading={isButtonLoading}
            options={stripeOption}
          />
        </Popup>
      )}
    </>
  );
};
export default PaidSessionPopup;
