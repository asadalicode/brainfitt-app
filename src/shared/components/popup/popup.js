import React from "react";
import { Dialog, DialogTitle } from "@mui/material";
import Style from "./popup.module.scss";
import { ReactComponent as Close } from "../../../assets/images/x.svg";

const Popup = ({
  isOpen,
  handleClose,
  title,
  width = 475,
  borderRadius =15,
  isFullScreen = false,
  isShowHeader = true,
  childClassName ,
  containerClassName,
  children,
}) => {
  const closePopup = () => {
    handleClose?.(true);
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        // onClose={handleClose}
        fullScreen={isFullScreen}
        aria-describedby="alert-dialog-slide-description"
        className={Style.dialog}
        PaperProps={{
          style: {
            backgroundColor: "rgb(255 255 255 / 40%)",
            backdropFilter: "blur(1px)",
            width: width,
            minHeight: 150,
            borderRadius: borderRadius,
          },
        }}
      >
        <div className={`${Style.container} ${containerClassName}` }>
          {isShowHeader && (
            <DialogTitle>
              <div className={Style.title}>
                <div>{title}</div>
                <div className={Style.closeIcon} onClick={closePopup}>
                  <Close height={15} />
                </div>
              </div>
            </DialogTitle>
          )}
          <div className={`${Style.content} ${childClassName}`}>{children}</div>
        </div>
      </Dialog>
    </div>
  );
};

export default Popup;
