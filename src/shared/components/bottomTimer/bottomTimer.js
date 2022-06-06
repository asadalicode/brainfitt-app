import Style from "./bottomTimer.module.scss";
import { useTimer } from "react-timer-hook";

const BottomTimer = ({
  expiryTime,
  handleTimer,
  currentSession,
  isUnstoppable = false,
  month,
}) => {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + expiryTime);

  const { seconds, minutes, hours, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => handleTimer?.(),
  });

  return (
    <div className="w-100">
      <div
        // onClick={task?.isBuyButton ? "" : handleClick}
        className={`d-flex flex-column align-items-center cursor-pointer ${Style.container}`}
      >
        <p className={`d-flex text-center ${Style.title}`}>
          {isUnstoppable && (
            <>
              {currentSession === 0 && "Introductory session audio "}
              {currentSession === 11 && "Booster Session Audio "}
              {currentSession > 11 &&
                `Maintenance session month ${
                  month === undefined ? 1 : month
                } Audio  `}
                  {(currentSession > 0 &&
                currentSession <= 10)&&
                `Session ${currentSession} `}
            </>
          )}
          {!isUnstoppable && (
            <>
              {currentSession === 0 && "Introductory session audio "}
              {currentSession >= 14 &&
                `Maintenance session month ${
                  month === undefined ? 1 : month
                } Audio  `}
              {(currentSession > 0 &&
                currentSession < 14 )&&
                `Session ${currentSession} `}
            </>
          )}
          will be available in
        </p>

        <span className={`${Style.timer}`}>
          {hours}:{minutes}:{seconds}
        </span>
      </div>
    </div>
  );
};
export default BottomTimer;
