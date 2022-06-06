import CustomButton from "../../../../shared/components/customButton/customButton";
import Style from "./premiumCard.module.scss";
const PremiumCard = ({ premium, handleChoosePackage }) => {
  const handleClick = () => {
    handleChoosePackage?.(premium.stripePriceId, premium.id);
  };

  return (
    <div
      className={`${Style.card} p-4 d-flex flex-column justify-content-between`}
    >
      <div>
        <h3 className="mb-0">{premium.title}</h3>
        <span className={`${Style.description}`}>{premium.titleTagline}</span>
        <div className={`mt-4 ${Style.priceMainContainer}`}>
          <h5 className={`${Style.priceContainer} `}>
            <span className={`${Style.currency} me-2`}>$</span>
            {premium.price}
            <span className={`${Style.duration} ms-2`}>
              /<span className={`ms-1`}>{premium.interval}</span>
            </span>
          </h5>
          <span
            className={`d-flex justify-content-center text-center mb-1 ${Style.allowUser}`}
          >
            {/* {premium.allowUser > 0 && ` For ${premium.allowUser} Users`} */}
            {premium.shorDescription}
          </span>
        </div>
        <div className={Style.listDescription}>
          <div dangerouslySetInnerHTML={{ __html: premium.description }}></div>
        </div>
      </div>
      <div className={`d-flex mt-3 justify-content-center`}>
        <CustomButton
          title={premium.isSubscribed ? "Subscribed" : "Choose"}
          handleButtonClick={handleClick}
          buttonStyle={`white-btn ${Style.whiteButton}`}
          disabled={premium.isSubscribed ? true : false}
        />
        {/* <button
          onClick={handleClick}
          className={}
        >
          {}
        </button> */}
      </div>
    </div>
  );
};

export default PremiumCard;
