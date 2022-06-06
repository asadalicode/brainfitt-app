import CustomButton from "../../../shared/components/customButton/customButton";
import Style from "./sessionDetail.module.scss";

const SessionDetail = ({
  handleSessionstart,
  sessionDetail,
  title,
  month,
  isShowTimer,
}) => {
  const handleStartSession = () => {
    handleSessionstart(true, sessionDetail?.id);
  };
  return (
    <>
      <div
        className={`d-flex align-items-center text-center justify-content-between mb-5 ${Style.container} `}
      >
        <div className={`text-center `}>
          <h6 className={`mb-4`}>About {title}</h6>
          <p>
            {sessionDetail?.description} {month ? `Month ${month}` : ""}
          </p>
          {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p> */}
        </div>
        <CustomButton
          disabled={isShowTimer}
          title={"Start Your Session"}
          handleButtonClick={handleStartSession}
          buttonStyle={`white-btn mt-5 cursor-pointer`}
        />
      </div>
    </>
  );
};
export default SessionDetail;
