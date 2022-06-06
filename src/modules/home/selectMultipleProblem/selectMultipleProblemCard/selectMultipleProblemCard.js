import Style from './selectMultipleProblemCard.module.scss';

const SelectMultipleProblemCard = ({ index,title, id, isSelected, handleSelectedProblem }) => {
    const handleProblem = () => {
        handleSelectedProblem?.(index);
    }
    return (
        <div onClick={handleProblem}
            className={`${Style.card} ${isSelected ? Style.selectedCard : ''} cursor-pointer text-center`}>
            <span>{title}</span>
        </div>
    );
}
export default SelectMultipleProblemCard;