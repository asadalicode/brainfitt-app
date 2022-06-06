import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyPaymentIntentAPICall } from "../dashboardService/empowermentUnstoppable";
import Style from "./successPaid.module.scss";
import successIcon from "../../../assets/images/success.png";
import { ReactComponent as LeftArrow } from "../../../assets/images/leftArrow.svg";

const SuccessPaid = () => {
  const search = useLocation().search;
  const paymentStatus = new URLSearchParams(search).get("redirect_status");
  const navigate = useNavigate();
  useEffect(async () => {
    if (paymentStatus === "succeeded") {
      await verifyPaymentIntentAPICall();
    }
  }, [paymentStatus]);

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div className="pt-5">
      <LeftArrow
        onClick={handleBackButton}
        height={35}
        fill="white"
        className={`cursor-pointer ms-4 `}
      />
      <div className="d-flex justify-content-center pt-3">
        <div
          className={`mt-5 d-flex flex-column align-items-center ${Style.successBox}`}
        >
          <img src={successIcon} height={60} width={60} />
          <h5 className="mt-2">Payment done successfully</h5>
        </div>
      </div>
    </div>
  );
};
export default SuccessPaid;
