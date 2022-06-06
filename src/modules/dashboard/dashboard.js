import { useEffect, useState } from 'react';
import { Box, AppBar } from '@mui/material';
import SideNavbar from '../../shared/components/sideNavbar/sideNavbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Style from './dashboard.module.scss';
import homeDashboardBackground from '../../assets/images/dashboardModule/home/bg.svg';
import boostBackground from '../../assets/images/dashboardModule/boost/bg.svg';
import empowermentBackground from '../../assets/images/dashboardModule/empowerment/bg.png';
import settingBackground from '../../assets/images/dashboardModule/settings/bg.png';
import BottomNavbar from '../../shared/components/bottomNavbar/bottomNavbar';
import unstoppableBackground from '../../assets/images/dashboardModule/unstoppable/bg.png';
import { ReactComponent as HeadphoneIcon } from '../../assets/images/headphones.svg';
import { ReactComponent as ChatIcon } from '../../assets/images/chat.svg';
import { ReactComponent as VideoChatIcon } from '../../assets/images/videoChat.svg';
import Wavesurfer from '../../shared/components/player/wavesurferCustom';
import { useDispatch, useSelector } from 'react-redux';
import Draggable from 'react-draggable';
import Environment from '../../environment'
import {
    FloatingMenu,
    MainButton,
    ChildButton,
} from 'react-floating-button-menu';
import { endDateTimeActivityAPICall, getCheckHappinessScoreStatusAPICall, getSimulatorImagesAPICall, startDateTimeActivityAPICall } from './dashboardService/dashboard';
import { getEntryId, setEntryId } from '../../shared/js/userCredential';
import { getNotificationAPICall } from './notification/notificationService/notificationService';
import { addUnSeenNotificationCount } from '../../redux/Action/notification';
import DashboardHomePopup from './dashboardHomePopup/dashboardHomePopup';

const navigationBackground = [
    { route: '/dashboard', backgroundImage: homeDashboardBackground },
    { route: '/dashboard/boost', backgroundImage: boostBackground },
    { route: '/dashboard/empowerment', backgroundImage: empowermentBackground },
    { route: '/dashboard/unstoppable', backgroundImage: unstoppableBackground },
    { route: '/dashboard/settings', backgroundImage: settingBackground },
    { route: '/dashboard/notification', backgroundImage: empowermentBackground },
    { route: '/dashboard/messages', backgroundImage: empowermentBackground },
    { route: '/dashboard/virtual-meeting', backgroundImage: empowermentBackground },
    { route: '/dashboard/success-paid', backgroundImage: empowermentBackground },
    { route: '/dashboard/unstoppable-success-paid', backgroundImage: unstoppableBackground },
    { route: '/dashboard/success-paid-virtual-meeting', backgroundImage: empowermentBackground },
];

const Dashboard = () => {
    const [pageBackgroundImage, setPageBackgroundImage] = useState('');
    const _location = window.location?.pathname;
    const [isMobileTab, setIsMobileTab] = useState(false);
    const [isFloatingButtonOpen, setIsFloatingButtonOpen] = useState(false);
    const musicList = useSelector(state => state.musicList);
    const navigate = useNavigate();
    const [btnDirection, setBtnDirection] = useState("up");
    const [isSubmitedHappinessToday, setIsSubmitedHappinessToday] = useState(false);

    const handleResize = () => {
        setIsMobileTab(window.innerWidth <= 850);
    }
    const dispatch = useDispatch()

    useEffect(async ()=>{
        let _notificationsList = await getNotificationAPICall(5,0) 
        let _isSubmited = await getCheckHappinessScoreStatusAPICall() 
        if(_notificationsList.success){
            dispatch(addUnSeenNotificationCount(_notificationsList.unseen))
        }
        setIsSubmitedHappinessToday(_isSubmited.isSubmited)
    },[])

    useEffect(async () => {
        document.addEventListener('visibilitychange', async () =>  {
            let _day,_month,_year;
            let dataValue = new Date();
            _day = (dataValue.getDate() > 9) ? dataValue.getDate() : `0${dataValue.getDate()}`
            _month = (dataValue.getMonth()+1 > 9) ? dataValue.getMonth()+1 : `0${dataValue.getMonth()+1}`
            _year = dataValue.getFullYear()

            let _hours,_mints,_seconds;
            var d = new Date();
            _hours = (d.getHours() > 9) ? d.getHours() : `0${d.getHours()}`; 
            _mints = (d.getMinutes() > 9) ? d.getMinutes() : `0${d.getMinutes()}`;
            _seconds = (d.getSeconds() > 9) ? d.getSeconds() : `0${d.getSeconds()}`; 

            let _formatedDate =  `${`${_year}-${_month}-${_day} ${_hours}:${_mints}:${_seconds}`}`

            if(document.hidden){
                endDateTimeActivityAPICall({endDate:_formatedDate, entryId: await getEntryId()?.toString()})
            }
            else{
              let  _entryId = await startDateTimeActivityAPICall(_formatedDate)
              setEntryId(_entryId?.data?.id)
            }
          })
    }, []);
    useEffect(() => {
        window.addEventListener("beforeunload", async () => {


            let _day,_month,_year;
            let dataValue = new Date();
            _day = (dataValue.getDate() > 9) ? dataValue.getDate() : `0${dataValue.getDate()}`
            _month = (dataValue.getMonth()+1 > 9) ? dataValue.getMonth()+1 : `0${dataValue.getMonth()+1}`
            _year = dataValue.getFullYear()

            let _hours,_mints,_seconds;
            var d = new Date(); 
            _hours = (d.getHours() > 9) ? d.getHours() : `0${d.getHours()}`; 
            _mints = (d.getMinutes() > 9) ? d.getMinutes() : `0${d.getMinutes()}`;
            _seconds = (d.getSeconds() > 9) ? d.getSeconds() : `0${d.getSeconds()}`;

            let _formatedDate =  `${`${_year}-${_month}-${_day} ${_hours}:${_mints}:${_seconds}`}`
            endDateTimeActivityAPICall({endDate:_formatedDate, entryId: await getEntryId()?.toString()})
          });
    }, []);

    useEffect(async() => {
        let _bgImages = await getSimulatorImagesAPICall()
        // morning 6 to 14  => 6am to 2pm
        // evening 14 to 20 => 2pm to 8pm
        // night 20 to 6    => 8pm to 6am
        var today = new Date()
        var curHr = today.getHours()
        if (6 >= curHr && curHr < 14) {
            navigationBackground[0].backgroundImage = Environment.serverUrl +_bgImages?.data?.[0]?.imageUrl
        } else if (14 >= curHr && curHr < 20) {
            navigationBackground[0].backgroundImage = Environment.serverUrl +_bgImages?.data?.[1]?.imageUrl
        } else {
            navigationBackground[0].backgroundImage = Environment.serverUrl +_bgImages?.data?.[2]?.imageUrl
        }
        handleBackgroundImage(_location);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return window.removeEventListener("resize", handleResize());
    }, []);

    const handleBackgroundImage = (route) => {
        let _route = route.replace(/\/+$/, '')
        let _backgroundImage = navigationBackground.find(
            (item) => (item.route === _route))?.backgroundImage;
        setPageBackgroundImage(_backgroundImage);
    }

    const handleFloatingButton = () => {
        setIsFloatingButtonOpen((previousValue) => !previousValue);
    }

    const handleFloatingClick = (route) => {
        navigate(route);
        handleFloatingButton();
        handleBackgroundImage(route);
    }

    const handleDragable = (event) => {
        if (event.target.getBoundingClientRect().y < 180) {
            setBtnDirection('down');
            return;
        }
        setBtnDirection('up');
    }
    return (
        <div className={`${Style.mainContainer}`}
            style={{
                backgroundImage: `url('${pageBackgroundImage}')`,
            }}
        >
            <DashboardHomePopup
                isOpen={isSubmitedHappinessToday}
                setIsOpen={setIsSubmitedHappinessToday}
            />
            <Box sx={{ display: 'flex' }} className={`${Style.container}`}>
                {!isMobileTab &&
                    <Box>
                        <SideNavbar handleBackgroundImage={handleBackgroundImage} />
                    </Box>
                }
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'transparent' }}
                    className={`${ Style.outletContainer }`}
                >
                    <div>
                        <Outlet />
                        {_location.replace(/\/+$/, '') !== '/dashboard/messages' &&
                            <Draggable
                                bounds="body"
                                onStop={handleDragable}
                            >
                                <FloatingMenu
                                    slideSpeed={500}
                                    direction={btnDirection}
                                    spacing={8}
                                    isOpen={isFloatingButtonOpen}
                                    className={`${Style.floatingButtonMenu} ${musicList.activePlayerIndex ? Style.floatingBtnPosition : ''} cursor-pointer`}
                                >

                                    <MainButton
                                        iconResting={<HeadphoneIcon height={30} width={30} />}
                                        iconActive={<HeadphoneIcon height={30} width={30} className={`${Style.activeIcon}`} />}
                                        className={`${Style.floatingButonn}`}
                                        onPointerDown={handleFloatingButton}
                                        size={56}
                                    />
                                    <ChildButton
                                        icon={<ChatIcon />}
                                        className={`${Style.floatingButonn}`}
                                        size={56}
                                        onPointerDown={() => handleFloatingClick('/dashboard/messages')}
                                    />
                                    <ChildButton
                                        icon={<VideoChatIcon />}
                                        className={`${Style.floatingButonn}`}
                                        size={56}
                                        onPointerDown={() => handleFloatingClick('/dashboard/virtual-meeting')}
                                    />
                                </FloatingMenu>
                            </Draggable>
                        }

                    </div>
                </Box>
            </Box>
            {isMobileTab && _location.replace(/\/+$/, '') !== '/dashboard/messages' &&
                <BottomNavbar handleBackgroundImage={handleBackgroundImage} />
            }
            {((_location.replace(/\/+$/, '') !== '/dashboard/empowerment' && _location.replace(/\/+$/, '') !== '/dashboard/unstoppable') &&
            musicList.activePlayerIndex) ? <AppBar className={`${Style.bottomAudioPlayer} py-3`} position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <div className={`${Style.content}`}>
                    <Wavesurfer
                        isControlButtons
                        isPlayList
                        isVolume
                    />
                </div>
            </AppBar> : null}
        </div>

    );
}

export default Dashboard;
