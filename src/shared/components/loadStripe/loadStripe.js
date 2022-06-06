import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  Elements,
  CardExpiryElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useMemo, useState } from "react";
import environment from "../../../environment";
import CustomButton from "../customButton/customButton";
import { loadStripe } from "@stripe/stripe-js";
import { Spinner } from "../spinner/spinner";

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          color: "white",
          letterSpacing: "0.025em",
          padding: "5px",
          "::placeholder": {
            color: "white",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    []
  );

  return options;
};

const CheckoutForm = ({
  handlePaymentDetail,
  buttonLoading = false,
  isConfirmPayment,
  amount,
  return_url,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentElementLoading, setPaymentElementLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(buttonLoading);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    if (isConfirmPayment) {
      setIsLoading(true);
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: environment.appUrl + return_url,
        },
      });
      if (result.error) {
        setErrorMessage(result.error.message);
        setIsLoading(false);
      } else {
      }
    } else {
      let _element = elements.getElement(CardNumberElement);
      setIsLoading(true);
      const _result = await stripe.createToken(_element);
      if (_result.error) {
        setIsLoading(false);
        setErrorMessage(_result.error.message);
      } else {
        handlePaymentDetail?.(_result.token.id);
      }
    }
  };
  const handlePaymentElement = () => {
    setPaymentElementLoading(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <>
          <span className="text-danger fw-bold">{errorMessage}</span>
          <br />
        </>
      )}
      {isConfirmPayment ? (
        <>
          {paymentElementLoading && <Spinner />}
          <div className={paymentElementLoading ? "invisible" : "visible"}>
            <PaymentElement onReady={handlePaymentElement} />
          </div>
        </>
      ) : (
        <>
          <label>Card number</label>
          <CardNumberElement options={options} />
          <label>Expiration date</label>
          <CardExpiryElement options={options} />
          <label> CVC</label>
          <CardCvcElement onReady={handlePaymentElement} options={options} />
        </>
      )}
      <div className="d-flex justify-content-center">
        {isConfirmPayment ? (
          !paymentElementLoading && (
            <CustomButton
              type="submit"
              title={`Pay ${amount > 0 ? "$" + amount : ""}`}
              disabled={!stripe || !elements}
              isLoading={isLoading}
            />
          )
        ) : (
          !paymentElementLoading && <CustomButton
            type="submit"
            title={`Pay ${amount > 0 ? "$" + amount : ""}`}
            disabled={!stripe || !elements}
            isLoading={isLoading}
          />
        )}
      </div>
    </form>
  );
};
const stripePromise = loadStripe(environment.stripePublicKey);

const LoadStripe = ({
  handlePyamentPayload,
  buttonLoading = false,
  isConfirmPayment = false,
  options,
  amount,
  return_url = "/dashboard/success-paid",
}) => {
  const handlePaymentDetail = (stripeTokenId) => {
    handlePyamentPayload?.(stripeTokenId);
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        handlePaymentDetail={handlePaymentDetail}
        buttonLoading={buttonLoading}
        isConfirmPayment={isConfirmPayment}
        return_url={return_url}
        amount={amount}
      />
    </Elements>
  );
};

export default LoadStripe;
