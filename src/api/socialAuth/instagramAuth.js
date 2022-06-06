import React from 'react'
import Style from './socialAuth.module.scss'
import instagramLogo from '../../assets/images/signup/instagram.svg';
import { useNavigate } from "react-router-dom";
import InstagramLogin from 'react-instagram-login';


function InstagramAuth() {
    const navigate = useNavigate();
    const responseInstagram = (res) =>{
        if(res.id){
            // navigate('/otp');
        }
        console.log("facebook response ==", res)
    }

  return (
      
    <div>
        <InstagramLogin
            clientId="982053265749928"
            cssClass={Style.instagramBtn}
            onSuccess={responseInstagram}
            onFailure={responseInstagram}
        >
            <img className={`${Style.socialIcon}`} src={instagramLogo} alt="instagramLogo" />
        </InstagramLogin>
    </div>
  )
}

export default InstagramAuth