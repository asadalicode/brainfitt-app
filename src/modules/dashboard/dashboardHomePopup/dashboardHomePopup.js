import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import Style from "./dashboardHomePopup.module.scss";

import Crying from "../../../assets/images/homeModule/shareFeeling/preEmojis/crying.png";
import Happy from "../../../assets/images/homeModule/shareFeeling/preEmojis/happy.png";


import CustomButton from "../../../shared/components/customButton/customButton";
import { setHappinessScoreAPICall } from "../dashboardService/dashboard";


const DashboardHomePopup = ({ isOpen, setIsOpen }) => {
    const [emojiValue, setEmojiValue] = useState('1')


    const onChange = (event) => {
        let _value = event.target.value
        setEmojiValue(_value);
      };

    const onsubmit = async () => {
        if(emojiValue > 1){
          setHappinessScoreAPICall("happy")
        }else{
          setHappinessScoreAPICall("sad")
        }
        setIsOpen(false)
    };
    const handleClose = async () => {
        setIsOpen(false)
    };

  return (
    <div>
      <Dialog
        open={isOpen}
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className={Style.dialog}
        PaperProps={{
          style: {
            backgroundColor: "rgb(255 255 255 / 40%)",
            backdropFilter: "blur(1px)",
            width: 375,
            minHeight: 150,
            borderRadius: 15,
          },
        }}
      >
        <div className={Style.container}>
          <DialogTitle>
            <div className={Style.title}>
              <div>Your Current Mood?</div>
            </div>
          </DialogTitle>
          <div className="d-flex justify-content-center my-4"> 
            <div className="w-75 d-flex justify-content-center">
                <img src={Crying} width={50} height={50} onClick={()=>{setEmojiValue(0)}} />
                <input
                    type="range"
                    className={Style.slider}
                    min="0"
                    max="2"
                    value={emojiValue}
                    onChange={onChange}
                    step="1"
                />
                <img src={Happy} width={50} height={50} onClick={()=>{setEmojiValue(2)}}/>
            </div>
          </div>
            <div className={`d-flex justify-content-center`}>
                <DialogActions>
                    <div className={Style.buttonStyle}>
                    <CustomButton
                        type="button"
                        title="OK"
                        disabled={emojiValue==='1'?true:false}
                        isLoading={false}
                        handleButtonClick={onsubmit}
                    />
                    </div>
                </DialogActions>
            </div>
          
        </div>
      </Dialog>
    </div>
  );
};

export default DashboardHomePopup;
