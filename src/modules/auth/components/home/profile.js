import React,{useEffect, useState} from 'react';
import { setUserInfo } from '../../../../shared/js/userCredential';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
 } from "react-reactive-form";

function Profile(props) {

    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address:''
    })

    const loginForm  = FormBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required]
    })

    useEffect(()=>{
        console.log("userForm ==", userForm)
    },[userForm])

    const handleChange = (e) =>{
        setUserForm({...userForm,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e, value) => {
        console.log("Form values ==", value);
        e.preventDefault();
        setUserForm(value)
        setUserInfo(value)
        props.setMode('show')
    }
    const TextInput = ({ handler, touched, hasError, meta }) => (
        <div style={{color: 'black'}}>
            {/* {console.log("handler ==",handler )} */}
            {console.log("touched ==", touched )}
            {/* {console.log("hasError ==", hasError)} */}
            {/* {console.log("meta ==",meta )} */}
          <input style={{color: 'black'}} name={meta.label} placeholder={`Enter ${meta.label}`} {...handler()} />
          <span>
              {touched
              && hasError("required")
              && `${meta.label} is required`}
          </span>
        </div>  
      )
    return (
        <div>
            <h3>User Profile</h3>
            {props.mode === 'create' && 
            // <><div style={{marginTop: 10}}><span style={{marginRight: 20}}>Name </span><input type={'text'} name='name' onChange={handleChange}/></div>
            // <div style={{marginTop: 10}}><span style={{marginRight: 20}}>Email</span><input type={'text'} name='email' onChange={handleChange}/></div>
            // <div style={{marginTop: 10}}><span style={{marginRight: 20}}>Phone Number</span><input type={'text'} name='phoneNumber' onChange={handleChange}/></div>
            // <div style={{marginTop: 10}}><span style={{marginRight: 20}}>Address</span><input type={'text'} name='address' onChange={handleChange}/></div>
            // <button onClick={onSubmit}>Submit</button></>
            <>
            <FieldGroup
                control={loginForm }
                render={({ get, invalid, disabled, value }) => (
                  <form onSubmit={e => onSubmit(e,  value)}>
                    <FieldControl
                      name="name"
                      render={TextInput}
                      meta={{ label: "name" }}
                    />
                    <FieldControl
                      name="email"
                      render={TextInput}
                      meta={{ label: "email" }}
                    />
                    <button
                      type="submit"
                      disabled={disabled}
                    >
                      Submit
                    </button>
                  </form>
                )}
              /></>
            }
            {props.mode === 'show' && 
            <>
                <p style={{marginRight: 20}}>Name : {userForm.name}</p>
                <p style={{marginRight: 20}}>Email :{userForm.email}</p>
                <p style={{marginRight: 20}}>Ph # :{userForm.phoneNumber}</p>
                <p style={{marginRight: 20}}>Address:{userForm.address}</p>
            </>
            }
        </div>
    );
}

export default Profile;