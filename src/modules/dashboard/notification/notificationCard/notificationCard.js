import Style from './notificationCard.module.scss';
import NotificationsIcon from '@mui/icons-material/Notifications';
import moment from 'moment';
const NotificationCard = ({ index, notification, handleClick }) => {

    const handleNotificationClick = () => {
        // handleClick();
    }

    return (
        <div onClick={handleNotificationClick} className={`${Style.notificationContainer} mb-3 box-border cursor-pointer d-flex justify-content-between`}>
            <div className='d-flex'>
                <div style={{width: 60 }} className={"d-flex align-items-center"}>
                    <div className={`${Style.avatar} d-flex justify-content-center align-items-center`}>
                        <NotificationsIcon className={`${Style.icon}`} />
                    </div>
                </div>
                <div className={`${Style.rightContainer} d-flex flex-column justify-content-center`}>
                    <span className={`${Style.text}`}>{moment(notification.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</span>
                    <h5 className={`${Style.heading} mb-0`}>{notification.title}</h5>
                    <span className={`${Style.text}`}>{notification.description}</span>
                </div>
            </div>
        </div>
    );
}
export default NotificationCard;