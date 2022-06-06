import Style from './emojiBox.module.scss';

const EmojiBox = ({ title, Icon, id, isSelected, handleSelectedEmoji }) => {
    const handleEmoji = () => {
        handleSelectedEmoji?.(id);
    }

    return (
        <div onClick={handleEmoji}
            className={`${Style.container } text-center cursor-pointer`}>
            <div className={`d-flex justify-content-center align-items-center ${Style.emojiContainer}
             ${isSelected ? Style.selectedEmoji :''}`}>
                <img src={Icon} height={60} width={60} />
            </div>
            <span>{title}</span>
        </div>
    );
}
export default EmojiBox;