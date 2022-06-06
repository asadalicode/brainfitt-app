import { backendCall } from "../../../../shared/backendService/backendCall";
import { handleToastMessage } from "../../../../shared/js/handleToastMessage";
import { setUserData } from "../../../../shared/js/userCredential";
import { UserModel } from "../../../auth/model/userModel";
import { addUpdateUser } from "../../../chat/services/chat";


//user
export const addUserAPICall = async (data) => {
    let _url = 'user/add_user';

    let formData= new FormData();

    formData.append('first_name', data.firstName)
    formData.append('last_name', data.lastName)
    formData.append('email', data.email)
    formData.append('dob', data.dob)
    formData.append('address', data.address)
    formData.append('country_id', data.country_id)
    formData.append('state_id', data.state_id)
    formData.append('postal_code', data.postalCode)
    formData.append('phone', data.mobileNumber)
    formData.append('image', data.imageUrl)

    let _response;
    await backendCall(
        _url,
        'POST',
        formData,
        false
    ).then((data)=>{
        _response = {
            isSuccess : !data?.error
        }
        if(!data.error){
            handleToastMessage("success", data.message);
        }
    });
    return _response
}
export const updateProfileAPICall = async (data) => {
    let _url = 'user/update_profile';
    let formData= new FormData();

    formData.append('first_name', data.firstName)
    formData.append('last_name', data.lastName)
    formData.append('email', data.email)
    formData.append('dob', data.dob)
    formData.append('address', data.address)
    formData.append('country_id', data.country_id)
    formData.append('state_id', data.state_id)
    formData.append('postal_code', data.postalCode)
    formData.append('phone', data.mobileNumber)
    formData.append('image', data.imageUrl)

    let _response;
    await backendCall(
        _url,
        'POST',
        formData,
    ).then((data)=>{
        _response = {
            isSuccess : !data?.error
        }
        if(!data.error){
            let _user = new UserModel();
            _user.userId =data.data.id;
            _user.mobileNumber = data.data.phone;
            _user.dob = data.data.dob;
            _user.imageUrl = data.data.image_url;
            _user.email = data.data.email;
            _user.firstName = data.data.first_name;
            _user.lastName = data.data.last_name;
            _user.country = data.data.country_id;
            _user.state = data.data.state_id;
            _user.postalCode = data.data.postal_code;
            _user.status = data.data.status;
            _user.address = data.data.address
            let _userFirebaseData = {
              id:_user.userId,
              userEmail: _user.email,
              online: true,
              userDisplayName: `${_user.firstName ?_user.firstName : ""}${
                _user.lastName ? _user.lastName : ""
              }`,
              userPhotoUrl: _user.imageUrl ? _user.imageUrl : "",
            };
            setUserData(_user)
            handleToastMessage("success", data.message);
            addUpdateUser(_userFirebaseData);
        }
    });
    return _response
}
export const updateUserAPICall = async (data) => {
    let _url = `user/update_user/${data.id}`;

    let formData= new FormData();

    formData.append('first_name', data.firstName)
    formData.append('last_name', data.lastName)
    formData.append('email', data.email)
    formData.append('dob', data.dob)
    formData.append('address', data.address)
    formData.append('country_id', data.country_id)
    formData.append('state_id', data.state_id)
    formData.append('postal_code', data.postalCode)
    formData.append('phone', data.mobileNumber)
    formData.append('image', data.imageUrl)

    let _response; 
    await backendCall(
        _url,
        'PUT',
        formData,
    ).then((data)=>{
        _response = {
            isSuccess : !data?.error
        }
        if(!data.error){
            handleToastMessage("success", data.message);
        }
    });
    return _response
}
export const getUserAPICall = async (data) => {
    let _response;
    let _url = 'user/get_users';
    await backendCall(
        _url,
        'GET',
        {},
        false
    ).then((data)=>{
        _response = data?.data
        let _user = new UserModel();

        let _userList = data?.data&&data?.data.map((user, index) => {
            const {
                id,
                phone,
                dob,
                image_url,
                email,
                first_name,
                last_name,
                country_id,
                state_id,
                postal_code,
                status,
                address,
            } = user;
            _user = {
                id:id,
                mobileNumber:phone,
                dob:dob,
                imageUrl: image_url,
                email: email,
                firstName: first_name,
                lastName: last_name,
                country: country_id,
                state: state_id,
                postalCode: postal_code,
                status: status,
                address: address
            };
            return _user;
          });

          _response = _userList
    });
    return _response
}
export const getCountryAPICall = async (data) => {
    let _response={
        isSuccess: false,
        country: []
    };
    let _url = 'user/get_countries';
    await backendCall(
        _url,
        'GET'
    ).then((data)=>{
        _response = {
            isSuccess: true,
            country: data?.data
        }
    });
    return _response
}
export const getStateAPICall = async (id) => {
    let _response={
        isSuccess: false,
        states: []
    };
    let _url = `user/get_states/${id}`;
    await backendCall(
        _url,
        'GET'
    ).then((data)=>{
        _response ={
            states: data?.data,
            isSuccess:true
        }
    });
    return _response
}
export const removeUserAPICall = async (data) => {
    let _url = 'user/remove_users';
    await backendCall(
        _url,
        'POST',
        data,
        false
    ).then((data)=>{
        handleToastMessage("success", data.message);
    });
}
//journal
export const getNoteAPICall = async (data) => {
    let _response;
    let _url = 'user/get_notes';
    await backendCall(
        _url,
        'GET'
    ).then((data)=>{
        _response = data?.data
    });
    return _response
}
export const addNoteAPICall = async (data) => {
    let _response;

    let formatData= new FormData();
    formatData.append('title', data.title)
    formatData.append('description', data.note)

    let _url = 'user/add_notes';
    await backendCall(
        _url,
        'POST',
        formatData
    ).then((data)=>{
        if(!data.error){
            handleToastMessage("success", data.message);
        }
    });
    return _response
}
//FAQ's
export const getFAQsAPICall = async (data) => {
    let _response;
    let _url = 'user/get_faqs';
    await backendCall(
        _url,
        'GET'
    ).then((data)=>{
        _response = data?.data
    });
    return _response
}
//Referral Status
export const getReferralStatusAPICall = async (data) => {
    let _response;
    let _url = 'user/referral_stats';
    await backendCall(
        _url,
        'GET'
    ).then((data)=>{
        _response = data?.data
    });
    return _response
}
export const getActiveSubscribePlanAPICall = async (data) => {
    let _response;
    let _url = 'boost/get_active_subscription';
    await backendCall(
        _url,
        'GET',
        '',
        false,
        false
    ).then((data)=>{
        _response = {
            success: !data?.error,
            data: data?.data
        }
    });
    return _response
}
export const addReferralInviteAPICall = async (data) => {
    let _response;
    let _url = 'user/add_referral_invite';
    await backendCall(
        _url,
        'POST',
    ).then((data)=>{});
    return _response
}