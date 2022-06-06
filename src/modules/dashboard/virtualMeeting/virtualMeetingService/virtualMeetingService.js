import { backendCall } from "../../../../shared/backendService/backendCall";
import { deleteAvailabilityIdFromLocalStorage, getAvailabilityId, setAvailabilityIdInLocalStorage, setMeetingDetail } from "../../../../shared/js/userCredential";

export const getAvailableSlots = async (date) => {
    let _response;
    let _url = `user/meetings?date=${date}`;
    await backendCall(
        _url,
        'GET'
    ).then((data)=>{
        _response = data?.data
        
        _response = data?.data.map((slot)=>{

            return (
                slot={
                    ...slot,
                    style: false
                }
            ) 
        })
    });
    return _response
}
export const addMeeting = async (date) => {
    let _response;
    let formatData= new FormData();
    formatData.append('start_date_time', date)
    let _url = `user/create_meeting `;
    await backendCall(
        _url,
        'POST',
        formatData
    ).then((data)=>{
        if(!data.error){
            _response = {
                data:data?.data,
                isSuccess: !data.error,
                clientSecret: data?.data?.intent?.client_secret
            } 
            setAvailabilityIdInLocalStorage( data?.data?.availability_id)
        }
    });
    return _response
}


export const verifyPaymentIntentAPICallVM = async () => {
    let availabilityId = await getAvailabilityId();
    let _url = "user/verify_meeting_payment_intent";
    let _data = {
        availability_id: parseInt(availabilityId),
    };
    let _response = {
      isSuccess: false,
    };
    await backendCall(_url, "POST", _data).then((response) => {
      if (!response.error) {
        deleteAvailabilityIdFromLocalStorage();
        setMeetingDetail({
            joinLink: response.data?.join_link,
            isMeeting: true,
        })
      }
      _response = {
        isSuccess: !response.error,
      };
    });
    return _response;
  };