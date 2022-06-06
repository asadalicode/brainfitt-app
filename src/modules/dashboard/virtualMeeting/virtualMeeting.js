import { useEffect, useState } from 'react';
import Style from './virtualMeeting.module.scss';
import { ReactComponent as LeftArrow } from '../../../assets/images/leftArrow.svg';
import { ReactComponent as RightArrow } from '../../../assets/images/rightArrow.svg';
import { ReactComponent as RightAngle } from '../../../assets/images/rightAngle.svg';
import { ReactComponent as LeftAngle } from '../../../assets/images/leftAngle.svg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { addMeeting, getAvailableSlots } from './virtualMeetingService/virtualMeetingService';
import CustomButton from '../../../shared/components/customButton/customButton';
import LoadStripe from '../../../shared/components/loadStripe/loadStripe';
import Popup from '../../../shared/components/popup/popup';
import { deleteMeetingDetail, deleteScheduleDetail, getMeetingDetail, getScheduleDetail, getUserData, setScheduleDetail } from '../../../shared/js/userCredential';
const VirtualMeeting = () => {
    const [dataValue, setDataValue] = useState(new Date());
    const [isMeetingDetail, setIsMeetingDetail] = useState(false);
    const [isDisableButton, setIsDisableButton] = useState(true);
    const [slotsDetail, setSlotsDetail] = useState([]);
    const [meetingDetail, setMeetingDetail] = useState({});
    const [selectedSlot, setSelectedSlot] = useState('00:00');
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [stripeOption, setStripeOption] = useState({});
    const navigate = useNavigate();

    useEffect( async()=>{
        let _getLink = await getMeetingDetail();
        let _dateTime = await getScheduleDetail();
        let _userData = getUserData();
        let _detail={
            _dateTime,
            _getLink,
            firstName:_userData?.firstName,
            lastName:_userData?.lastName,
            email: _userData?.email
        }
        setMeetingDetail({
            ..._detail
        })
        !_getLink?.isMeeting && handleDate(dataValue)
        setIsMeetingDetail(_getLink?.isMeeting)
    },[])
    useEffect(()=>{
        setIsDisableButton(selectedSlot === '00:00' ? true : false)
    },[selectedSlot])
    useEffect(() => {
        if (Object.keys(stripeOption).length > 0) {
          setIsShowPopup(true);
        }
      }, [stripeOption]);

    const handleMeeting = async (value) => {

        let _day,_month,_year;
        _day = (dataValue.getDate() > 9) ? dataValue.getDate() : `0${dataValue.getDate()}`
        _month = (dataValue.getMonth()+1 > 9) ? dataValue.getMonth()+1 : `0${dataValue.getMonth()+1}`
        _year = dataValue.getFullYear()
        setScheduleDetail({
            date:dataValue,
            time: selectedSlot,
        })

        let _response = await addMeeting(`${`${_year}-${_month}-${_day}`} ${selectedSlot}`)


        if (_response.isSuccess) {
            let _option = {
              clientSecret: _response.clientSecret,
            };
            setStripeOption({ ..._option });
          }

        // setMeetingDetail(_response.data)
        // setIsMeetingDetail(value);
    }

    const handleDate = async (date) => {
        let _day,_month,_year;
        _day = date.getDate()
        _month = date.getMonth()+1
        _year = date.getFullYear()
        
        let _slots
        _slots = await getAvailableSlots(`${_year}-${_month}-${_day}`)
        setSlotsDetail(_slots)
        setDataValue(date);
        setSelectedSlot('00:00')
        setIsMeetingDetail(false)
    }
    const handleSlot = async (slot, availabilityId) => {
        setSelectedSlot(slot?.slice(0,8))
        slotsDetail.map((_slot)=>{
            (_slot.availability_id === availabilityId) ? _slot.style = true : _slot.style = false
        })
    }
    const handleBackButton = () => {
        if(isMeetingDetail){
            deleteScheduleDetail()
            deleteMeetingDetail()
        }
        isMeetingDetail
            ? handleDate(dataValue)
            : navigate("/dashboard");
    }
    const handleClosePopup = () => {
        setIsShowPopup(false)
    }
    return (
        <div className={`pt-5  ${Style.container}`}>
            {/* <div className={`d-flex justify-content-center pb-3 ${Style.header}`}>
                <span onClick={handleBackButton} className={`cursor-pointer ${Style.backArrow}`}>
                    <LeftArrow height={25} fill={"white"} />
                </span>
                <h5>Virtual Meeting</h5>
            </div> */}
            <div className={`d-flex align-items-center mb-3  ms-5 ${Style.header}`}>
                <LeftArrow
                    onClick={handleBackButton}
                    height={35}
                    fill="white"
                    className={`cursor-pointer ms-4 ${Style.backArrow}`}
                />
                <h5 className={`ms-4 mb-0 ${Style.title}`}>Virtual Meeting</h5>
            </div>
            <div className={`${Style.contentContainer}`}>
                {
                    !isMeetingDetail ?
                        <>
                            <div className={`${Style.outerContainer}`}>
                                <div className='d-flex'>
                                    <span className={`d-flex justify-content-center align-items-center ${Style.headerCount}`}> 1</span>
                                    <span className='ms-5'>Select a suitable time</span>
                                </div>
                                <Calendar
                                    value={dataValue}
                                    next2Label={null}
                                    prev2Label={null}
                                    onChange={handleDate}
                                    nextLabel={<RightAngle height={25} />}
                                    prevLabel={<LeftAngle height={25} />}
                                    className={`${Style.calender}`}
                                />
                            </div>
                            <div className={`${Style.outerContainer} mt-3 mb-3`}>
                                <div className='d-flex'>
                                    <span className={`d-flex justify-content-center align-items-center ${Style.headerCount}`}>2</span>
                                    <span className='ms-5'>Select a suitable time</span>
                                </div>
                                <div className={`${Style.timeContainer}`}>
                                    <div className={`d-flex justify-content-center ${Style.date}`}>
                                        <span>{new Intl.DateTimeFormat('en-GB', {dateStyle: 'full'}).format(dataValue)}</span>
                                    </div>
                                    <div className={`d-flex justify-content-center flex-wrap mt-3 ${Style.timerPicker}`}>
                                        {
                                            slotsDetail.length ? slotsDetail.map(slot => 
                                                <AvailableSlots
                                                    slot={slot}
                                                    handleSlot={() => handleSlot(slot?.start_time, slot?.availability_id)}
                                                    isSelectedSlot={slot.style}
                                                />
                                                ):
                                                <span> No Slot Available</span>
                                            
                                        }
                                    </div>
                                </div>
                            </div>
                            <CustomButton
                                handleButtonClick={() => handleMeeting(true)}
                                buttonStyle={`white-btn mb-5 ${Style.whiteBtn}`}
                                title={'Book'}
                                disabled={isDisableButton}
                            ><RightArrow fill= {isDisableButton ? '#696868' : '#000000'} height={30}/></CustomButton>
                        </>
                        :
                        <>
                            <div className={`${Style.meetingDetail}`}>
                                <div>
                                    <span className={`${Style.title}`}>Name:</span>
                                    <span className={`${Style.titleValue}`}>{meetingDetail?.firstName} {meetingDetail?.lastName}</span>
                                </div>
                                <div>
                                    <span className={`${Style.title}`}>Email:</span>
                                    <span className={`${Style.titleValue}`}>{meetingDetail?.email}</span>
                                </div>
                                <div>
                                    <span className={`${Style.title}`}>Meeting Date:</span>
                                    <span className={`${Style.titleValue}`}>{new Intl.DateTimeFormat('en-GB', {dateStyle: 'full'}).format(new Date(meetingDetail?._dateTime?.date))}</span>
                                </div>
                                <div>
                                    <span className={`${Style.title}`}>Meeting Time:</span>
                                    <span className={`${Style.titleValue}`}>
                                    {new Date('1970-01-01T' + meetingDetail?._dateTime?.time + 'Z')
                                        .toLocaleTimeString('en-US',
                                        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
                                    )}
                                    </span>
                                </div>
                            </div>
                            <div className={`mt-4 ${Style.meetingLinkContainer}`}>
                                <div className={`d-flex flex-column align-items-center justify-content-between h-50`}>
                                    <span>Meeting Link</span>
                                    <span>{meetingDetail?._getLink?.joinLink}</span>
                                </div>
                            </div>
                        </>
                }
                        {isShowPopup && (
                            <Popup isOpen={true} handleClose={handleClosePopup} title={"Checkout"}>
                                <LoadStripe
                                    isConfirmPayment={true}
                                    buttonLoading={false}
                                    options={stripeOption}
                                    return_url={'/dashboard/success-paid-virtual-meeting'}
                                />
                            </Popup>
                        )}
            </div>

        </div >
    )
}

export default VirtualMeeting;

const AvailableSlots = ({slot, handleSlot, isSelectedSlot}) => {
    return (
        <span className={`${isSelectedSlot ? Style.selectedSlot: ''}`} role="button" onClick={()=>handleSlot(slot.start_time?.slice(0, 8))}>
            {new Date('1970-01-01T' + slot.start_time + 'Z')
                .toLocaleTimeString('en-US',
                {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
            )} to {new Date('1970-01-01T' + slot.end_time + 'Z')
                .toLocaleTimeString('en-US',
                {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
            )}
            </span>
    )
}