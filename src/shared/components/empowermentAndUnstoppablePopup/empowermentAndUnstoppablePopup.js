import Style from "./empowermentAndUnstoppablePopup.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { TasksEnum } from "../../js/tasksEnum";
import { useTimer } from "react-timer-hook";
import { useEffect, useState } from "react";

const EmpowermentAndUnstoppablePopup = ({
  currentSession,
  leftTime,
  handlePopup,
  isMaintenance,
  isEmopwerment,
}) => {
  const expiryTimestamp = new Date();
  let _seconds = 0;

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + leftTime);

  // const { seconds, minutes, hours, days, restart } = useTimer({
  //   expiryTimestamp,
  //   onExpire: () => {},
  // });

  useEffect(() => {
    setDays(leftTime > 1439 ? Math.floor(leftTime / 1440) : 0);
    setHours(leftTime > 59 ? Math.floor((leftTime / 60) % 24) : 0);
    setMinutes(leftTime < 60 ? leftTime : leftTime % 60);
  }, [leftTime]);
  const handleClick = () => {
    handlePopup?.();
  };

  return (
    <div className={`${Style.popup} mt-3 pb-5`}>
      {
        <div
          onClick={handleClick}
          className={`d-flex justify-content-end cursor-pointer ${Style.cross}`}
        >
          <CloseIcon />
        </div>
      }
      <div
        className={`d-flex flex-column align-items-center text-center  ${Style.content}`}
      >
        {/* <h5 className="mb-5">
          After
          {days ? (
            ` ${days}   days `
          ) : (
            <>
              {hours ? ` ${hours}   hours ` : ""}
              {minutes ? ` ${hours ? "and" : ""} ${ Math.round(minutes * 10) /10 }  minutes ` : ""}
              {!days && !hours && !minutes && (
                <>{_seconds ? `  ${_seconds}   seconds ` : ""}</>
              )}
            </>
          )}
        </h5> */}
        <h5 className="mb-5">
          {currentSession === 0 && "After two hours"}
          {!isEmopwerment && (
            <>{currentSession > 0 && !isMaintenance && "After 24 hours"}</>
          )}
          {isEmopwerment && (
            <>{currentSession > 0 && !isMaintenance && "After 3 days"}</>
          )}
          {isMaintenance && "After 1 month"}
        </h5>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          ndustry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          ndustry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </p>
      </div>
    </div>
  );
};
export default EmpowermentAndUnstoppablePopup;
