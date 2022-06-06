import Style from './messageCard.module.scss';

const MessageCard = ({ message }) => {
    return (
        <div className={`d-flex mb-3 ${Style.container} ${message.isSender ? 'justify-content-end' : 'justify-content-start'}`}>
            <div className={`${Style.messageContainer}`}>
                <p className={`${Style.message} ${message.isSender ? Style.senderTextDesign : Style.receiverTextDesign}`}>{message.message}</p>
                <div className={`d-flex mt-1 ${Style.time} ${message.isSender ? 'justify-content-start' : 'justify-content-end'}`}>
                    <span>{message.messageDateTime}</span>
                </div>
            </div>
        </div>
    );
}
export default MessageCard;