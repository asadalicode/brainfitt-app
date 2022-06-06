import DisplayImage from "../../../../shared/components/displayImage/displayImage";
import Style from "./selectProblemCard.module.scss";

const SelectProblemCard = ({
  index,
  title,
  Icon,
  isSelected,
  handleSelectedCard,
}) => {
  const handleClick = () => {
    handleSelectedCard?.(index);
  };
  return (
    <div
      onClick={handleClick}
      className={`${Style.card} ${
        isSelected ? Style.selectedCard : ""
      } d-flex flex-column justify-content-center cursor-pointer text-white p-3  `}
    >
      <DisplayImage imageUrl={Icon} className={Style.icon} />
      <h5>{title}</h5>
    </div>
  );
};

export default SelectProblemCard;
