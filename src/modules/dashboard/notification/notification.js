import Style from './notification.module.scss';
import { ReactComponent as LeftArrow } from '../../../assets/images/leftArrow.svg'; 
import NotificationCard from './notificationCard/notificationCard';
import NotificationDetail from './notificationDetail/notificationDetail';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotificationAPICall, setUnseenAPICall } from './notificationService/notificationService';
import { useDispatch } from 'react-redux';
import { addUnSeenNotificationCount } from '../../../redux/Action/notification';

const notificationsList = [
    { time: 'Thursday, 18 Nov, 08:23', title: 'Empowerment, Session 1', description: 'Your Order has been completed successfully.' },
    { time: 'Thursday, 18 Nov, 08:23', title: 'Empowerment, Session 1', description: 'Your Order has been completed successfully.' },
    { time: 'Thursday, 18 Nov, 08:23', title: 'Empowerment, Session 1', description: 'Your Order has been completed successfully.' },
    { time: 'Thursday, 18 Nov, 08:23', title: 'Empowerment, Session 1', description: 'Your Order has been completed successfully.' },
    { time: 'Thursday, 18 Nov, 08:23', title: 'Empowerment, Session 1', description: 'Your Order has been completed successfully.' },
]

const Notification = () => {

    const [isShowDetail, setIsShowDetail] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    let _Limit = 20;

    useEffect( ()=>{
        onGetNotification(_Limit, page)
    },[])

    const onGetNotification = async (limit, _page) => {
        await setUnseenAPICall()
        let _notificationsList = await getNotificationAPICall(limit, _page) 
        if(_notificationsList.success){
            let _notify =
            _page === 0
              ? [..._notificationsList.rows]
              : [...notifications, ..._notificationsList.rows];
            setTotalCount(_notificationsList.count)
            setNotifications(_notify)
            setPage(++_page)
            dispatch(addUnSeenNotificationCount(_notificationsList.unseen))
        }
    }

    const handleBackButton = () => {
        isShowDetail
            ? setIsShowDetail(false)
            : navigate(-1);
    }
    const handleNotificationClick = () => {
        setIsShowDetail(true);
    }
    const scrollListner = (e) => {
        const scrolled =
        (e.target.clientHeight + e.target.scrollTop + 100) > e.target.scrollHeight;
        if (scrolled && ((page*_Limit) <= totalCount)) {
            onGetNotification(_Limit, page)
          }
    };
    return (
        <div className={`${Style.container}`}>
            <div className={`d-flex align-items-center pt-4 ms-5 mt-4 ${Style.header}`}>
                <LeftArrow
                    onClick={handleBackButton}
                    height={35}
                    fill="white"
                    className={`cursor-pointer ms-4 ${Style.backArrow}`}
                />
                <h5 className={`ms-4 mb-0 ${Style.title}`}>Notifications</h5>
            </div>
            <div className={`container-fluid mt-4 ${Style.notificationContainer}`} onScroll={scrollListner}>
                {
                    !isShowDetail ?
                        <>
                            {notifications.map((notification, index) =>
                                <NotificationCard
                                    index={index}
                                    key={Math.random()}
                                    notification={notification}
                                    handleClick={handleNotificationClick}
                                />
                            )}
                        </>
                        :
                        <NotificationDetail />
                }
            </div>
        </div>
    );
}
export default Notification;