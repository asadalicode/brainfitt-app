import { useEffect, useState } from "react";
import Style from "../../style/session.module.scss";
import { ReactComponent as RightIcon } from "../../../../assets/images/rightAngle.svg";
import { ReactComponent as Clipboard } from "../../../../assets/images/clipboard.svg";
import BottomTimer from "../../../../shared/components/bottomTimer/bottomTimer";
import { useNavigate } from "react-router-dom";
import EmpowermentAndUnstoppablePopup from "../../../../shared/components/empowermentAndUnstoppablePopup/empowermentAndUnstoppablePopup";
import SessionTask from "../../../../shared/components/sessionTask/sesssionTask";
import { TasksEnum } from "../../../../shared/js/tasksEnum";
import PdfReader from "../../../../shared/components/pdfReader/pdfReader";
import {
  checkTaskPreRequisitAPICall,
  completeGoogleFormTaskAPICall,
  getComparisonReportAPICall,
  getPostAssessmentAPICall,
  getSessionTaskAPiCall,
  setCompleteTaskAPiCall,
} from "../../dashboardService/empowermentUnstoppable";
import ShareFeeling from "../../../home/shareFeeling/shareFeeling";
import SuccessfullEmpowermentPopup from "../../../../shared/components/empowermentAndUnstoppablePopup/successfullEmpowermentPopup";
import Popup from "../../../../shared/components/popup/popup";
import { Spinner } from "../../../../shared/components/spinner/spinner";
import BottomBuyPopup from "../../../../shared/components/bottomBuyPopup/bottomBuyPopup";
import { handleToastMessage } from "../../../../shared/js/handleToastMessage";
import { sessionTaskStatusEnum } from "../../../../shared/js/enums";
import MoodComparisonReport from "../../empowerment/moodComparisonReport/moodComparisonReport";
import UnstoppableSuccessfullPopup from "../unstoppableSuccessfullPopup/unstoppableSuccessfullPopup";
import { getUserData } from "../../../../shared/js/userCredential";
import { ReactComponent as LeftArrow } from "../../../../assets/images/leftArrow.svg";

let CURRENTTASKID;
const Session = ({
  sessionId,
  nextSessionId,
  selectedSession,
  isNeextSessionPaid,
  emojiSelect,
  isMaintenance,
  preEmoji,
  sessionDetail,
  title,
  handleCompleteTask,
  isShowCompletedTask,
  isButtonLoading,
  handleNextSession,
  nextSessionPrice,
  handleCompleteTaskList,
  isEmopwerment,
  increamentMaintenanceSession,
  isPaidSession = false,
  maintenanceMonth,
  handlePurchaseSession,
  hideCompletedTask,
}) => {
  const navigate = useNavigate();
  const [activeSessionData, setActiveSessionData] = useState([]);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [ishowGoogleForm, setIshowGoogleForm] = useState(false);
  const [googleFormLink, setGoogleFormLink] = useState("");
  const [isShowSuccessPopup, setIsShowSuccessPopup] = useState(false);
  const [isShowTimer, setIsShowTimer] = useState(false);
  const [isShowReport, setIsShowReport] = useState(false);
  const [isShowComparisonReport, setIsShowComparisonReport] = useState(false);
  const [isShowPreEmoji, setIsShowPreEmoji] = useState(false);
  const [isShowPostEmoji, setIsShowPostEmoji] = useState(false);
  const [isShowNoticationPopup, setIsShowNoticationPopup] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [isSessionTaskLoading, setIsSessionTaskLoading] = useState(false);
  const [isShowBuyButton, setIsShowBuyButton] = useState(false);
  const [notificationTime, setNotificationTime] = useState(0);
  const [month, setMonth] = useState(0);
  const [isShowPostAssessmentForm, setIsShowPostAssessmentForm] =
    useState(false);
  const [notificationTaskId, setNotificationTaskId] = useState(null);
  const [isShowEmailPopup, setIsShowEmailPopup] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(async () => {
    let _userData = await getUserData();
    setEmail(_userData.email);
    if (sessionId) {
      setIsShowSuccessPopup(false);
      await getSessionTasks();
    }
  }, [sessionId, increamentMaintenanceSession]);

  const getSessionTasks = async () => {
    setIsSessionTaskLoading(true);
    let _response = await getSessionTaskAPiCall(sessionId, isMaintenance);
    setIsSessionTaskLoading(false);
    if (_response.isSuccess) {
      let _taskList = _response.taskList;
      if (!isPaidSession) {
        _taskList = _response.taskList.map((filterTask) => {
          if (filterTask.isPaid === 0) {
            filterTask.isShow = true;
            return filterTask;
          } else {
            filterTask.isShow = false;
            return filterTask;
          }
        });
      } else {
        _taskList = _response.taskList.map((task) => {
          task.isShow = true;
          return task;
        });

        // for timer
        let _notificationTask = _taskList.find(
          (task) => task.preInterval !== "0"
        );
        if (_notificationTask) {
          getTaskPreReq(_notificationTask.id);
        }
      }
      let _notificationSessionTask = _taskList.find(
        (task) => task.notificationPreviousReq !== null
      );

      if (_notificationSessionTask) {
        let _preReqTask = _taskList.find(
          (task) => task.id === _notificationSessionTask.notificationPreviousReq
        );
        if (_preReqTask) {
          if (_preReqTask.status === sessionTaskStatusEnum.completed) {
            if (isPaidSession) {
              getTaskPreReq(_notificationSessionTask.id);
            }
          }
        }
      }

      setNotificationTaskId(_notificationSessionTask?.id);
      setMonth(_taskList[0].month);
      setActiveSessionData([..._taskList]);
      let _currentTaskId = _response.taskList.find(
        (task) => task.status === sessionTaskStatusEnum.active
      )?.id;
      manageNextTask(_currentTaskId, _taskList);
      // CURRENTTASKID
      CURRENTTASKID = _currentTaskId;
      // setCurrentTaskId(_currentTaskId);
    }
  };

  const handleSessionClick = async (index, taskValue, taskId) => {
    let _activeSession = [...activeSessionData];
    let _activeTask = _activeSession.find((task) => task.id === taskId);
    // setCurrentTaskId(taskId);
    CURRENTTASKID = taskId;
    // if (_activeTask.preInterval && _activeTask.notificationPreviousReq) {
    //   let _respopnse = await checkTaskPreRequisitAPICall(_activeTask.id);
    //   if (_respopnse.isSuccess) {
    //     setNotificationTime(_respopnse.time / 60);
    //     setTimerValue(parseInt(_respopnse.time));
    //     if (!isShowTimer) {
    //       setIsShowNoticationPopup(true);
    //       setIsShowTimer(true);
    //     }
    //     return;
    //   } else {
    //     _activeTask.isLock = false;
    //     setActiveSessionData([..._activeSession]);
    //   }
    // }
    if (taskValue === TasksEnum.preEmoji) {
      setIsShowPreEmoji(true);
    }
    if (taskValue === TasksEnum.postEmoji) {
      setIsShowPostEmoji(true);
    }
    if (taskValue === TasksEnum.form) {
      setIshowGoogleForm(true);
      setIsShowEmailPopup(true);
      let _googleFormLink = activeSessionData.find(
        (session) => session.id == taskId
      )?.googleFormLink;
      setGoogleFormLink(_googleFormLink);
    }
    if (taskValue === TasksEnum.postAssessment) {
      // setIsShowReport(true);
      // setPdfUrl(_activeTask.postAssessmentForm);
      getPostAssessment();
    }
    if (taskValue === TasksEnum.pdf) {
      setIsShowReport(true);
      setPdfUrl(_activeTask.pdfUrl);
    }
    // await handleCompleteSessionTask(taskId);
  };

  const handleCompleteAndUnlockNextTask = async (taskId) => {
    let _activeSession = [...activeSessionData];
    let _activeTask = _activeSession.find((task) => task.id === taskId);
    _activeTask.isComplete = true;
    if (isMaintenance) {
      let _length = _activeSession.findIndex(
        (task) => task.id === _activeTask.id
      );
      if (_length === _activeSession.length - 1) {
        setIsShowSuccessPopup(true);
        getNextSessionTask(true);
        return;
      }
    }
    await manageNextTask(_activeTask.nextStep, _activeSession);
    // setActiveSessionData([..._activeSession]);
    // setCurrentTaskId(_activeTask.nextStep);
    CURRENTTASKID = _activeTask.nextStep;
  };

  const getNextSessionTask = async (isUseCurrentSessionId = false) => {
    let _nextSessioId = isUseCurrentSessionId ? sessionId : nextSessionId;
    setIsSessionTaskLoading(true);
    let _response = await getSessionTaskAPiCall(_nextSessioId, isMaintenance);
    setIsSessionTaskLoading(false);
    if (_response.isSuccess) {
      let _taskList = _response.taskList;
      if (_taskList[0].preInterval !== "0") {
        await getTaskPreReq(_taskList[0].id, true);
      }
    }
  };

  const manageNextTask = async (nextTaskId, activeSession) => {
    let _activeSession = [...activeSession];
    // setCurrentTaskId(nextTaskId);
    CURRENTTASKID = nextTaskId;
    if (nextTaskId === 0) {
      await getNextSessionTask();
      setIsShowSuccessPopup(true);
      return;
    }
    let _nextTask = _activeSession.find((task) => task.id === nextTaskId);
    if (!isPaidSession) {
      if (_nextTask?.isPaid === 1) {
        setIsShowBuyButton(true);
        return;
      }
    }

    // if (
    //   (_nextTask?.preInterval && _nextTask?.notificationPreviousReq) ||
    //   _nextTask?.preInterval !== "0"
    // ) {
    //   let _respopnse = await checkTaskPreRequisitAPICall(_nextTask.id);
    //   if (_respopnse.isSuccess) {
    //     if (_respopnse.time === 0) {
    //       handleCompleteAndUnlockNextTask(_nextTask.id);
    //       return;
    //     }
    //     setTimerValue(parseInt(_respopnse.time));
    //     setNotificationTime(_respopnse.time / 60);
    //     if (!isShowTimer) {
    //       setIsShowNoticationPopup(true);
    //       setIsShowTimer(true);
    //     }
    //     if (isPaidSession) {
    //       _nextTask.isLock = true;
    //       setActiveSessionData([..._activeSession]);
    //     }
    //     return;
    //   } else {
    //     _nextTask.isLock = false;
    //     setActiveSessionData([..._activeSession]);
    //   }
    // }
    if (_nextTask.taskValue === TasksEnum.moodComparision) {
      setIsShowComparisonReport(true);
    }
    if (_nextTask.taskValue === TasksEnum.report) {
      // setIsShowReport(true);
      // setPdfUrl(_nextTask.postAssessmentForm);
      getPostAssessment();
    }
    if (_nextTask.taskValue === TasksEnum.pdf) {
      setIsShowReport(true);
      setPdfUrl(_nextTask.pdf);
    }
    // if (_nextTask.taskValue === TasksEnum.postAssessment) {
    //   setIsShowReport(true);
    //   getPostAssessment();
    //   // setPdfUrl(_nextTask.postAssessmentForm);
    // }
    _nextTask.isLock = false;

    setActiveSessionData([..._activeSession]);
  };

  const handleCompleteSessionTask = async (taskId, answer = "") => {
    let _response = await setCompleteTaskAPiCall(taskId, answer, isMaintenance);
    if (_response.isSuccess) {
      let _nextTask = getTask(taskId);
      if (!(_nextTask?.preInterval && _nextTask?.notificationPreviousReq)) {
        handleCompleteAndUnlockNextTask(taskId);
      } else {
        if (isPaidSession) {
          getTaskPreReq(taskId);
        }
      }
      if (notificationTaskId) {
        let _task = getTask(notificationTaskId);
        if (_task.notificationPreviousReq === taskId) {
          if (isPaidSession) {
            getTaskPreReq(notificationTaskId);
          }
        }
      }
    }
  };

  const getTask = (taskId) => {
    return activeSessionData.find((task) => task.id === taskId);
  };

  const getTaskPreReq = async (taskId, showTimerOnly = false) => {
    let _respopnse = await checkTaskPreRequisitAPICall(taskId);
    if (_respopnse.time === 0 && !showTimerOnly) {
      handleCompleteAndUnlockNextTask(taskId);
      return;
    }
    if (_respopnse.isSuccess) {
      setNotificationTime(_respopnse.time / 60);
      setTimerValue(parseInt(_respopnse.time));

      if (!isShowTimer) {
        if (!showTimerOnly) {
          setIsShowNoticationPopup(true);
        }
        setIsShowTimer(true);
      }
    }
  };

  const getPostAssessment = async () => {
    let _response = await getPostAssessmentAPICall(CURRENTTASKID);
    if (_response.isSuccess) {
      setPdfUrl(_response.pdf);
      setIsShowReport(true);
    } else {
      handleToastMessage(
        "warning",
        "Please wait while PDF is being processed on server side"
      );
    }
    setIsShowPostAssessmentForm(_response.isSuccess);
  };

  const handleCompleteAudio = () => {
    handleCompleteSessionTask(CURRENTTASKID);
  };
  const handleTimer = () => {
    setIsShowTimer(false);
  };
  const handlePopup = () => {
    setIsShowNoticationPopup(false);
  };

  const handlePdfClick = () => {
    setIsShowReport(false);
    setIsShowComparisonReport(false);
    handleCompleteSessionTask(CURRENTTASKID);
  };

  const handleCompletTaskList = () => {
    let _flag = activeSessionData.some((item) => item.isComplete === true);
    if (_flag) {
      handleCompleteTaskList(true);
    } else {
      handleToastMessage("error", "No task completed yet");
    }
  };

  const handleSelectedEmoji = async (isPreEmoji, emojiList) => {
    let _emojis = emojiList.map((emoji) => emoji.title);
    await handleCompleteSessionTask(CURRENTTASKID, _emojis.join(","));
    setIsShowPostEmoji(false);
    setIsShowPreEmoji(false);
  };
  const handleGoogleForm = async () => {
    let _response = await completeGoogleFormTaskAPICall(
      CURRENTTASKID,
      isMaintenance
    );
    if (_response.isSuccess) {
      setIshowGoogleForm(false);
      handleCompleteAndUnlockNextTask(CURRENTTASKID);
    }
  };

  const manageNextSession = () => {
    handleNextSession();
  };

  const handleBuySession = () => {
    handlePurchaseSession?.();
  };
  const handleEmailPopup = () => {
    setIsShowEmailPopup(false);
  };
  const handleBackButton = () => {
    hideCompletedTask?.();
  };

  return (
    <>
      <div className={`${Style.container} `}>
        <div className={`${Style.contentContainer}`}>
          {isSessionTaskLoading ? (
            <Spinner isWhite={true} />
          ) : (
            <>
              {!isShowCompletedTask && (
                <div
                  onClick={handleCompletTaskList}
                  className={`d-flex justify-content-between cursor-pointer ${Style.taskbar}`}
                >
                  <div>
                    <Clipboard width={20} height={20} opacity={0.6} />
                    <span className={`ms-2 ${Style.title}`}>
                      Completed Tasks
                    </span>
                  </div>
                  <RightIcon height={25} />
                </div>
              )}
              <h5 className="d-flex justify-content-center mt-4 mb-4">
                {title}
                {isMaintenance && <>{month ? ` Month ${month}` : ""}</>}
              </h5>
              {!isShowCompletedTask && (
                <>
                  {/* Tasks List */}

                  {!isShowNoticationPopup &&
                    !isShowReport &&
                    !isShowSuccessPopup &&
                    !isShowComparisonReport && (
                      <>
                        {activeSessionData
                          .filter(
                            (filterTask) =>
                              filterTask.isShow && !filterTask.isComplete
                          )
                          ?.map((task, index) => (
                            <SessionTask
                              key={Math.random()}
                              index={index}
                              task={task}
                              sessionId={sessionId}
                              handleCompleteAudio={handleCompleteAudio}
                              handleClick={handleSessionClick}
                            />
                          ))}
                      </>
                    )}
                </>
              )}

              {isShowCompletedTask && (
                <>
                  <span
                    onClick={handleBackButton}
                    className={`cursor-pointer me-3 ${Style.backArrow}`}
                  >
                    <LeftArrow height={25} fill={"white"} />
                  </span>
                  {activeSessionData?.map((item, index) => {
                    if (item.isComplete) {
                      return (
                        <SessionTask
                          key={index}
                          sessionId={sessionId}
                          index={index}
                          task={item}
                          handleClick={handleSessionClick}
                        />
                      );
                    }
                  })}
                </>
              )}
            </>
          )}
          {isShowNoticationPopup && (
            <EmpowermentAndUnstoppablePopup
              isEmopwerment={isEmopwerment}
              isMaintenance={isMaintenance}
              leftTime={notificationTime}
              handlePopup={handlePopup}
            />
          )}
          {isShowSuccessPopup && (
            <UnstoppableSuccessfullPopup
              currentSession={selectedSession}
              showButton={true}
              title={title}
              month={month}
              price={nextSessionPrice}
              isMaintenance={isMaintenance}
              isEmopwerment={isEmopwerment}
              isNeextSessionPaid={isNeextSessionPaid}
              handlePopup={manageNextSession}
              isButtonLoading={isButtonLoading}
              handleBuyButton={handleBuySession}
            />
          )}
          {isShowReport && (
            <PdfReader pdfFile={pdfUrl} handlePdfClick={handlePdfClick} />
          )}
          {isShowComparisonReport && (
            <MoodComparisonReport
              sessionId={sessionId}
              handlePdfClick={handlePdfClick}
            />
          )}
        </div>
        {isShowTimer && (
          <div className={`${Style.bottomTimer}`}>
            <BottomTimer
              month={month}
              isUnstoppable={true}
              expiryTime={timerValue}
              handleTimer={handleTimer}
              currentSession={selectedSession + 1}
            />
          </div>
        )}
        {isShowBuyButton && (
          <div className={`${Style.bottomTimer}`}>
            <BottomBuyPopup
              currentSession={selectedSession}
              isMaintenance={isMaintenance}
              currentSessionId={sessionId}
              selectedSession={selectedSession}
            />
          </div>
        )}

        {isShowPreEmoji && (
          <ShareFeeling preEmoji={true} handleEmojis={handleSelectedEmoji} />
        )}
        {isShowPostEmoji && (
          <ShareFeeling preEmoji={false} handleEmojis={handleSelectedEmoji} />
        )}
      </div>
      {ishowGoogleForm && (
        <Popup
          width="100%"
          isFullScreen={true}
          isOpen={ishowGoogleForm}
          handleClose={handleGoogleForm}
        >
          <Popup isOpen={isShowEmailPopup} handleClose={handleEmailPopup}>
            <h5>You must use this Email "{email}" while filling google form</h5>
          </Popup>
          <iframe src={googleFormLink} className={Style.googFormIFrame} />
        </Popup>
      )}
    </>
  );
};
export default Session;
