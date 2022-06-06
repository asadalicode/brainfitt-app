import { Spinner } from "../../../../shared/components/spinner/spinner";
import Style from "./settingsCard.module.scss";

const SettingsCard = ({ card, index,coins, handleSelectedCard }) => {
  const handleClick = () => {
    handleSelectedCard?.(index, card?.cardComponentIndex);
  };

  return (
    <div
      onClick={handleClick}
      className={`d-flex  justify-content-between  ${Style.container} ${
        card.isHovar ? "cursor-pointer" : ""
      } ${card.isSelected ? "box-border" : ""}`}
    >
      <div className="d-flex flex-column justify-content-center ">
        <card.Icon height={30} opacity={0.6} />
        {card?.isLoading ? (
          <span className="mt-3">
            <Spinner />
          </span>
        ) : (
          <span className="mt-3">{card.title}</span>
        )}
      </div>
      {card?.isDetail && (
        <div className={Style.coinsValue}>
          {coins}<span className={Style.coinsDetail}>Coins</span>
        </div>
      )}
    </div>
  );
};
export default SettingsCard;
