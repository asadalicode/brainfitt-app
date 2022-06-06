import Style from "./purchaseProgramCard.module.scss";
import { Button } from "@mui/material";
import rightArrow from "../../../../assets/images/rightArrow.svg";

const PurchaseProgramCard = ({ program, handleSelect }) => {
  const handleClick = () => {
    handleSelect?.(program.navigateLink, program.id);
  };

  return (
    <div className={`${Style.card} text-white text-center`}>
      {program.isRecomended && (
        <div className="position-absolute">
          <p className={`${Style.recommended}`}>Recommended</p>
        </div>
      )}

      <h5 class="mt-5 pt-3">{program.title}</h5>
      <p className={`py-5 ${Style.description}`}>{program.description}</p>

      <Button
        onClick={handleClick}
        className="white-btn bg-white w-100 text-transform-none"
      >
        Select
        <img src={rightArrow} className={`d-none ${Style.whiteButtonArrow}`} />
      </Button>
    </div>
  );
};

export default PurchaseProgramCard;
