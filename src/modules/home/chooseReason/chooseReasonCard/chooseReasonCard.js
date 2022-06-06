import Style from './chooseReasonCard.module.scss';
const ChooseReasonCard = ({index, title, Icon, isSelected , handleSelectedCard }) => {

    const handleClick = () => {
        handleSelectedCard?.(index)
    }

    return (
        <div
            onClick = {handleClick}
            className={`${Style.card} ${isSelected ? Style.selectedCard : ''} cursor-pointer text-white pt-4 mb-3 p-4 pb-2`}>
            <Icon
                height={'11vh'}
                opacity={0.5}
                width={'11vh'}
                className={`${Style.cardImage}`}
            />
            <h5 class={`py-2 text-center`}>{title}</h5>
        </div>
    );
}

export default ChooseReasonCard;