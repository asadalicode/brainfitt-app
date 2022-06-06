import Style from "./profile.module.scss";
import { ReactComponent as CameraIcon } from "../../../../assets/images/camera.svg";
import InputField from "../../../../shared/components/inputField/inputField";
import { ReactComponent as Avatar } from "../../../../assets/images/dashboardModule/settings/avatar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IntlTelInput from "react-intl-tel-input";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators,
} from "react-reactive-form";
import { useEffect, useRef, useState } from "react";
import { parseISO } from "date-fns";
import {
  updateProfileAPICall,
  addUserAPICall,
  getCountryAPICall,
  getStateAPICall,
  updateUserAPICall,
} from "../settingService/settingService";
import { getUserData } from "../../../../shared/js/userCredential";
import environment from "../../../../environment";
import CustomButton from "../../../../shared/components/customButton/customButton";
import { isProfileUpdate } from "../../../../redux/Action/Login";
import { useDispatch } from "react-redux";

const Profile = ({
  isUpdate,
  handleManagePeople,
  selectedPeople,
  myProfile,
  isMyProfile = false,
}) => {
  const [date, setDate] = useState(new Date());
  const phoneRef = useRef(false);
  const dispatch = useDispatch()

  const loginForm = FormBuilder.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", Validators.required],
    dob: [new Date(), Validators.required],
    address: ["", Validators.required],
    country_id: ["", Validators.required],
    state_id: ["", Validators.required],
    postalCode: ["", Validators.required],
    // mobileNumber: ["", Validators.required],
    imageUrl: [""],
    imagebase64: [""],
    isLoading: [false]
  });
  const countryStateData = FormBuilder.group({
    countries: [[], Validators.required],
    states: [[], Validators.required],
  });
  useEffect(() => {
     getCountry();
  }, []);

  useEffect(() => {
    const _profile = selectedPeople
    if (selectedPeople) {
      loginForm.patchValue({
        id: _profile.id,
        firstName: _profile.firstName,
        lastName: _profile.lastName,
        email: _profile.email,
        dob: _profile.dob && parseISO(_profile.dob),
        address: _profile.address,
        country_id: _profile.country,
        state_id: _profile.state,
        postalCode: _profile.postalCode,
        mobileNumber: _profile.mobileNumber,
        imageUrl: _profile.imageUrl,
        imagebase64: _profile.imageUrl ? `${environment.serverUrl}${_profile.imageUrl}` : null,
      });
      getCountry()
      phoneRef.current=_profile.mobileNumber;
    }
  }, [selectedPeople]);


  useEffect(async ()=>{
    const _profile = await getUserData()
    if(isMyProfile){
      phoneRef.current=_profile?.mobileNumber;
      loginForm.patchValue({
        ...loginForm,
        // id: myProfile.id,
        firstName: _profile.firstName,
        lastName: _profile.lastName,
        email: _profile.email,
        dob: _profile.dob && parseISO(_profile.dob),
        address: _profile.address,
        // country_id: _profile.country,
        // state_id: _profile.state,
        postalCode: _profile.postalCode,
        mobileNumber: _profile.mobileNumber,
        imageUrl: _profile.imageUrl,
        imagebase64: _profile.imageUrl ? `${environment.serverUrl}${_profile.imageUrl}` : null,
      });
      await getCountry(_profile)
    }
  },[])

  useEffect(() => {
    loginForm?.get("country_id").valueChanges.subscribe(async (id) => {
      if(typeof id !== 'object'){
        let _response = await getStateAPICall(id);
        if (_response.isSuccess) {
          countryStateData.patchValue({
            ...countryStateData,
            states: _response.states
          })
        }
      }

    });
  }, []);

  useEffect(()=>{
    return () => {
      loginForm?.get('country_id').valueChanges.unsubscribe()
    }
  },[])
  useEffect( async()=>{
    let _emailValue = await loginForm.get('email')
    let _numberValue = await loginForm.get('mobileNumber')

    if(isMyProfile){
      _emailValue?.value && loginForm.controls['email'].disable();
      _numberValue?.value && loginForm.controls['mobileNumber'].disable();
    }
  },[loginForm])

  const getCountry = async (profile) => {
    const _response = await getCountryAPICall();
    if (_response.isSuccess) {
      countryStateData.patchValue({
        ...countryStateData,
        countries: _response.country
      })
      if(selectedPeople || profile?.country){
        const _obj = {
          country : selectedPeople?.country || profile?.country,
          state : selectedPeople?.state || profile?.state
        }

        let _stateResponse = await getStateAPICall(_obj.country);
        if (_stateResponse.isSuccess) {
          let statesObj = _stateResponse.states.filter(item=>item.id === _obj.state)
        
          let countryObj = _response.country.filter(item=>item.id === _obj.country)

          loginForm.patchValue({
            ...loginForm,
            country_id: countryObj,
            state_id: statesObj
          });
          countryStateData.patchValue({
            ...countryStateData,
            states: _stateResponse?.states,//statesObj
            // countries: countryObj
          })
        }
      }
    }
  };

  const handleChangePhoneNumber = (status, phoneNumber, country) => {
    let _phoneNumber = "+" + country.dialCode + phoneNumber;
    phoneRef.current=_phoneNumber;
    loginForm.patchValue({
      ...loginForm,
      mobileNumber: _phoneNumber
    })
  };

  const TextInput = ({ handler, touched, hasError, meta }) => (
    <div>
      <InputField
        placeholder={`${meta.placeholder}`}
        label={meta.label}
        error={touched && hasError("required") && `${meta.label} is required`}
        handler={handler}
      />
      <span className={Style.inputError}>
        {touched && hasError("required") && `${meta.label} is required`}
      </span>
    </div>
  );
  const PhoneNumberInput = ({ handler, touched, hasError, meta }) => (
    <div>
      <p className={Style.lable}> {meta.label}</p>
      <IntlTelInput
            country={"pk"}
            separateDialCode={true}
            containerClassName={`intl-tel-input ${Style.phoneNumberLabel}`}
            inputClassName={`form-control ${Style.phoneInput}`}
            onPhoneNumberChange={handleChangePhoneNumber}
            defaultValue={phoneRef.current || ''}
            disabled={phoneRef.current&&isMyProfile}
          />
      <span className={Style.inputError}>
        {touched && hasError("required") && `${meta.label} is required`}
      </span>
    </div>
  );

  const imageInput = ({ handler, touched, hasError, meta }) => (
    <div>
      <label for="file-input">
        <CameraIcon height={15} className="cursor-pointer" />
      </label>
      <input
        id="file-input"
        type={"file"}
        accept="image/*"
        className="d-none"
        onChange={(e) => uploadFile(e)}
      />
    </div>
  );
  const dropdownInput = ({ handler, touched, hasError, meta }) => (
    <div>
      <span className={Style.lable}>{meta.label}</span>
      <select
        className={`form-select ${Style.calendarInput}`}
        aria-label="Default select example"
        {...handler()}
      >
        <option className={Style.selectedDisableOption} value={handler().value[0]?.id || ''} disabled={(handler().value[0]?.id ) ? false : true}>{ handler().value[0]?.name || `Select ${meta.label}`}</option>
        {
          meta.countryStateData?.value?.map((item, i) => (
              <option key={i} className={Style.selectOption} value={item.id} selected={(handler().value[0]?.id === item.id) ? true : false}>
                {item.name}
              </option>
            ))
            }
      </select>
      <span className={Style.inputError}>
        {touched && hasError("required") && `${meta.label} is required`}
      </span>
    </div>
  );
  const DateInput = ({ handler, touched, hasError, meta, value }) => (
    <div>
      <span className={Style.lable}>{meta.label}</span>
      <DatePicker
        className={Style.calendarInput}
        placeholderText="DD/MM/YY"
        dateFormat="dd/MM/yyyy"
        maxDate={new Date()}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        selected={value}
        onClick={(d) => setDate(d)}
        {...handler()}
      />
      <span className={Style.inputError}>
        {touched && hasError("required") && `${meta.label} is required`}
      </span>
    </div>
  );
  const uploadFile = (e) => {
    let file = e.target.files[0];

    // Object.values(file).map(item => {
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        let imageData = e.target.result;
        let base64 = imageData.split("base64")[1].substring(1);
        loginForm.patchValue({
          ...loginForm,
          imageUrl: file,
          imagebase64: imageData
        });
        // console.log("base64 ==", base64)
      };
    }
    // })
  };
  const onSubmit = async (e, value) => {
    let _mobileNumber =  phoneRef.current?.split(' ').join('')
    _mobileNumber =  _mobileNumber?.split('-').join('')
    loginForm.patchValue({
      ...loginForm,
      isLoading: true
    })
    e.preventDefault();
    if (isUpdate) {
      if (!isMyProfile) {
        let _objId = {};

          _objId = {
            ...value,
            id: selectedPeople?.id,
            country_id:  value?.country_id[0]?.id || value?.country_id,
            state_id:  value?.state_id[0]?.id || value?.state_id,
            mobileNumber: _mobileNumber
          };

        let _response = await updateUserAPICall(_objId);
        if(_response.isSuccess){
          handleManagePeople?.(0)
        }else{
          loginForm.patchValue({
            ...loginForm,
            isLoading: false
          })
        }
      } else {
        let _objId = {};

          _objId = {
            ...value,
            country_id:  value?.country_id[0]?.id || value?.country_id,
            state_id:  value?.state_id[0]?.id || value?.state_id,
            email: myProfile?.email || value?.email,
            mobileNumber: _mobileNumber, //myProfile?.mobileNumber || value?.mobileNumber
          };

        let _response = await updateProfileAPICall(_objId);
        dispatch(isProfileUpdate(Math.random()))
          loginForm.patchValue({
            ...loginForm,
            isLoading: false
          })
          if(_response.isSuccess){
            handleManagePeople?.(0)
          }else{
            loginForm.patchValue({
              ...loginForm,
              isLoading: false
            })
          }
      }
    } else {
      let _objId = {};

          _objId = {
            ...value,
            mobileNumber: _mobileNumber
          };
      let _response = await addUserAPICall(_objId);
      if(_response.isSuccess){
        handleManagePeople?.(0)
      }else{
        loginForm.patchValue({
          ...loginForm,
          isLoading: false
        })
      }
    }
  };
  return (
    <div className={`${Style.container}`}>
      {isUpdate && (
        <h5 className="d-flex justify-content-center mb-3">Profile</h5>
      )}
      <div className={`${Style.contentContainer}`}>
        <FieldGroup
          control={loginForm}
          render={({ get, invalid, value }) => (
            <form onSubmit={(e) => onSubmit(e, value)}>
              <div className="d-flex justify-content-center">
                <div className={`${Style.profileAvatar}`}>
                  {value.imagebase64 ? (
                    <img
                      src={value.imagebase64}
                      className="rounded-circle"
                      height={100}
                      width={100}
                      alt="profile"
                    />
                  ) : (
                    <Avatar
                      height={70}
                      width={70}
                      fill="rgba(206, 205, 205, 0.4)"
                    />
                  )}
                  <div
                    className={`d-flex justify-content-center align-items-center rounded-circle ${Style.cameraIcon}`}
                    onChange={(e) => uploadFile(e)}
                  >
                    <FieldControl
                      name="image"
                      render={imageInput}
                      meta={{ label: "Profile", placeholder: "Profile" }}
                    />
                  </div>
                </div>
              </div>
              <FieldControl
                name="firstName"
                render={TextInput}
                meta={{ label: "First Name", placeholder: "First Name" }}
              />
              <FieldControl
                name="lastName"
                render={TextInput}
                meta={{ label: "Last Name", placeholder: "Last Name" }}
              />
              <FieldControl
                name="email"
                render={TextInput}
                meta={{
                  label: "Email Address",
                  placeholder: "Example@email.com",
                }}
              />
              <FieldControl
                name="dob"
                render={DateInput}
                value={value}
                meta={{ label: "Date of Birth", placeholder: "DD/MM/YY" }}
              />
              <FieldControl
                name="address"
                render={TextInput}
                meta={{
                  label: "Address",
                  placeholder: "123 Street, 321 House, XYZ",
                }}
              />
              <FieldControl
                name="country_id"
                render={dropdownInput}
                meta={{
                  label: "Country",
                  placeholder: "Country Name",
                  countryStateData: countryStateData?.controls?.countries
                }}
              />
              <FieldControl
                name="state_id"
                render={dropdownInput}
                meta={{ 
                  label: "State", 
                  placeholder: "State Name",
                  countryStateData: countryStateData?.controls?.states
                }}
              />
              <FieldControl
                name="postalCode"
                render={TextInput}
                meta={{ label: "Post Code", placeholder: "Post Code" }}
              />
              <FieldControl
                name="mobileNumber"
                render={PhoneNumberInput}
                meta={{ label: "Mobile Number", placeholder: "Mobile Number" }}
              />
              <div className="d-flex justify-content-center">
                <CustomButton
                  type="submit"
                  disabled={!phoneRef.current || invalid}
                  isLoading={value.isLoading}
                  buttonStyle={`white-btn mt-3 ${
                    (!phoneRef.current || invalid) ? Style.disableButton : Style.submitButton
                  }`}
                >
                  {isUpdate ? "Update Profile" : "Add"}
                </CustomButton>
                {/* <button
                  type="submit"
                  disabled={invalid}
                  className={`white-btn mt-3 ${
                    invalid ? Style.disableButton : Style.submitButton
                  }`}
                >
                  {isUpdate ? "Update Profile" : "Add"}
                </button> */}
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};
export default Profile;
