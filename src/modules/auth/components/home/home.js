import React,{useState, useEffect} from 'react';
import Profile from './profile';
import { useNavigate } from "react-router-dom";
import { getUserInfo } from '../../../../shared/js/userCredential';
let obj;
function Home(props) {
    const [mode, setMode] = useState('')
    const [userForm, setUserForm] = useState('')
    const navigate = useNavigate();
   const userProfile = (mode) => {
       if(mode === 'show'){
           const obj = getUserInfo()
        setUserForm(obj.userForm)
       }
    setMode(mode)
    }
    const userLogout = () => {
        sessionStorage.removeItem("brainFit");
        navigate(`/`);
    }
    //localStorage.removeItem("name of the item")
    return (
        <div style={{backgroundColor: 'green'}}>
            <div >
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1> Protected page</h1>
            <button style={{marginLeft: 10}} onClick={userLogout}>Log Out</button>
            </div>
                <button style={{marginLeft: 10}} onClick={() => userProfile('create')}>Add Profile</button>
                <button style={{marginLeft: 10}} onClick={() => userProfile('show')}>show Profile</button>
            </div>
                {
                    (mode) && 
                    <Profile
                        mode={mode}
                        userForm = {userForm}
                        setMode={setMode}
                    />
                }
            
        </div>
    );
}

export default Home;