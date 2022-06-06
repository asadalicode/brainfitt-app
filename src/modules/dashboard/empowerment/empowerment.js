import Style from "./empowerment.module.scss";
import { useEffect, useState } from "react";
import { ToggleButtonGroup } from "@material-ui/core";
import { ToggleButton } from "@mui/material";
import StepperCard from "../../../shared/components/stepperCard/stepperCard";
import SessionDetail from "../sessionDetail/sessionDetail";
import { useLocation, useNavigate } from "react-router-dom";
import EmpowermentSession from "./empowermentSession/empowermentSession";
import {
  checkTaskPreRequisitAPICall,
  getAllSessionAPiCall,
  isSessionAlreadyStartAPICall,
} from "../dashboardService/empowermentUnstoppable";
import {
  improvementPlanEnum,
  sessionStatusEnum,
  sessionTaskStatusEnum,
} from "../../../shared/js/enums";
import { async } from "@firebase/util";
import PaidSessionPopup from "./paidSessionPopup/paidSessionPopup";
import { Spinner } from "../../../shared/components/spinner/spinner";
import BottomTimer from "../../../shared/components/bottomTimer/bottomTimer";

const sessionsList = [
  {
    label: "Free",
    title: "Free Empowerment",
    session: "Introductory Session",
    selected: true,
    isComplete: false,
  },
  {
    label: "01",
    title: "Empowerment",
    session: "Session 1",
    selected: false,
    isComplete: false,
  },
  {
    label: "02",
    title: "Empowerment",
    session: "Session 2",
    selected: false,
    isComplete: false,
  },
  {
    label: "03",
    title: "Empowerment",
    session: "Session 3",
    selected: false,
    isComplete: false,
  },
  {
    label: "04",
    title: "Empowerment",
    session: "Session 4",
    selected: false,
    isComplete: false,
  },
  {
    label: "05",
    title: "Empowerment",
    session: "Session 5",
    selected: false,
    isComplete: false,
  },
  {
    label: "06",
    title: "Empowerment",
    session: "Session 6",
    selected: false,
    isComplete: false,
  },
  {
    label: "07",
    title: "Empowerment",
    session: "Session 7",
    selected: false,
    isComplete: false,
  },
  {
    label: "08",
    title: "Empowerment",
    session: "Session 8",
    selected: false,
    isComplete: false,
  },
  {
    label: "09",
    title: "Empowerment",
    session: "Session 9",
    selected: false,
    isComplete: false,
  },
  {
    label: "10",
    title: "Empowerment",
    session: "Session 10",
    selected: false,
    isComplete: false,
  },
  {
    label: "11",
    title: "Empowerment",
    session: "Session 11",
    selected: false,
    isComplete: false,
  },
  {
    label: "12",
    title: "Empowerment",
    session: "Session 12",
    selected: false,
    isComplete: false,
  },
  {
    label: "13",
    title: "Empowerment",
    session: "Session 13",
    selected: false,
    isComplete: false,
  },
  {
    label: "14",
    title: "Empowerment",
    session: "Session 14",
    selected: false,
    isComplete: false,
  },
  {
    label: "15",
    title: "Empowerment",
    session: "Maintenance Session",
    selected: false,
    isComplete: false,
  },
];

const Empowerment = ({ improvementPlanId }) => {
  const [isSessionStart, setIsSessionStart] = useState(false);
  const [stepperList, setStepperList] = useState([]);
  const [selectedStepper, setSelectedStepper] = useState(0);
  const [toggleButtonValue, setToggleButtonValue] = useState("progress");
  const [isMobileTab, setIsMobileTab] = useState(false);
  const [isShowCompletedTask, setIsShowCompletedTask] = useState(false);
  const [isSessionLoading, setIsSessionLoading] = useState(false);
  const [startSessionId, setStartSessionId] = useState(null);
  const [isShowTimer, setIsShowTimer] = useState(true);
  const [timerValue, setTimerValue] = useState(0);
  const [month, setMonth] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [increamentMaintenanceSession, setIncreamentMaintenanceSession] =
    useState(0);
  const { sessionStart, preEmoji, activeSession } = state || {};

  useEffect(async () => {
    if (improvementPlanId) {
      await getSessions();
    }
  }, [improvementPlanId]);

  const getSessions = async () => {
    setIsSessionLoading(true);
    let _response = await getAllSessionAPiCall(improvementPlanId);
    if (_response.isSuccess) {
      if (_response.sessionList[0].status === sessionStatusEnum.pending) {
        navigate("/purchase-program");
        return;
      }
      setStepperList(_response.sessionList);
      let _flag = _response.sessionList.findIndex(
        (stepper) => stepper.selected === true
      );

      setSelectedStepper(_flag);
      let _session = _response.sessionList[_flag];
      let _sessionId = _session.id;
      if (!_session.isMaintenance) {
        setIsShowTimer(false);
      }
      checkSessionAlreadyStart(
        _flag,
        _sessionId,
        _response.sessionList,
        _session.isMaintenance
      );
    }
  };

  useEffect(() => {
    setIsSessionStart(sessionStart);
  }, []);

  useEffect(() => {
    if (activeSession !== undefined) {
      setSelectedStepper(activeSession);
    }
  }, [activeSession]);

  const handleResize = () => {
    setIsMobileTab(window.innerWidth <= 850);
  };
  const checkSessionAlreadyStart = async (
    index,
    sessionId,
    sessionList,
    isMaintenance
  ) => {
    let _result = await isSessionAlreadyStartAPICall(sessionId, isMaintenance);
    setIsSessionLoading(false);

    if (_result.isSuccess) {
      let _task = _result.sessionFirstTask;
      setMonth(_task.month);
      if (isMaintenance) {
        if (
          _task.pre_interval !== "0" &&
          _task.status !== sessionTaskStatusEnum.completed
        ) {
          getTaskPreReq(_task.id);
        } else if (_result.isSessionStart) {
          if (!sessionList[index].isComplete) {
            setIsSessionStart(true);
            setStartSessionId(sessionId);
          }
        } else {
          setIsShowTimer(false);
        }
        return;
      }
      if (_result.isSessionStart) {
        if (!sessionList[index].isComplete) {
          setIsSessionStart(true);
          setStartSessionId(sessionId);
        }
      }
    }
  };
  const getTaskPreReq = async (taskId) => {
    let _respopnse = await checkTaskPreRequisitAPICall(taskId);
    if (_respopnse.time === 0) {
      setIsShowTimer(false);
      return;
    }
    if (_respopnse.isSuccess) {
      setTimerValue(parseInt(_respopnse.time));
      setIsShowTimer(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize());
  }, []);

  const handleSessionstart = (value, sessionId) => {
    if (!stepperList[selectedStepper].isComplete) {
      setIsSessionStart(value);
      setStartSessionId(sessionId);
    }
  };

  const handleChange = (event, value) => {
    setToggleButtonValue(value);
    setIsSessionStart(false);
  };
  const handleResponsiveCondition = (toggleValue) => {
    return isMobileTab
      ? toggleButtonValue === toggleValue
        ? true
        : false
      : true;
  };
  const handleSelectedStepper = (index) => {
    let _stepList = [...stepperList];
    _stepList[selectedStepper].selected = false;
    _stepList[index].selected = true;
    setSelectedStepper(index);
    setStepperList([..._stepList]);
    isMobileTab && setToggleButtonValue("tasks");
    handleCompleteTaskList(false);
  };
  const handleCompleteTask = () => {
    let _stepperList = [...stepperList];
    _stepperList[selectedStepper].isComplete = true;
    setStepperList([..._stepperList]);
  };
  const hideCompletedTask = () => {
    setIsShowCompletedTask(false);
  };
  const handleCompleteTaskList = (value) => {
    setIsShowCompletedTask(value);
  };
  const handleNextSession = () => {
    if (selectedStepper === 0) {
      navigate("/case-studies", {
        state: {
          page:
            improvementPlanId === 2
              ? "testimonialsEmpowerment"
              : "testimonialsUnstoppable",
        },
      });
      return;
    }
    if (stepperList[selectedStepper].isMaintenance) {
      // setIncreamentMaintenanceSession((prev) => ++prev);
      // return;
      setIsSessionStart(false);
      setIsShowTimer(true);
      let _session = stepperList[selectedStepper];
      let _sessionId = _session.id;
      if (selectedStepper !== -1) {
        checkSessionAlreadyStart(
          selectedStepper,
          _sessionId,
          stepperList,
          _session.isMaintenance
        );
      }
      return;
    }
    let _stepperList = [...stepperList];
    _stepperList[selectedStepper].selected = false;
    _stepperList[selectedStepper].isComplete = true;
    _stepperList[selectedStepper + 1].selected = true;
    setStepperList([..._stepperList]);
    setSelectedStepper((prev) => ++prev);
    setIsSessionStart(false);
  };
  const handleTimer = () => {
    setIsShowTimer(false);
  };

  return (
    <div className={`container-fluid ${Style.unStappableContainer}`}>
      {isSessionLoading ? (
        <Spinner isWhite={true} />
      ) : (
        <>
          {isMobileTab && (
            <>
              <h5 className={`${Style.title}`}>
                {improvementPlanEnum.empowerment === improvementPlanId
                  ? "Empowerment Program"
                  : improvementPlanEnum.unstoppable === improvementPlanId
                  ? "Unstoppable You Program"
                  : ""}
              </h5>
              <div className="d-flex justify-content-center">
                <ToggleButtonGroup
                  color="primary"
                  value={toggleButtonValue}
                  exclusive
                  onChange={handleChange}
                  className={`${Style.groupButton}`}
                >
                  <ToggleButton
                    className="text-transform-none"
                    value="progress"
                  >
                    Progress
                  </ToggleButton>
                  <ToggleButton
                    className="text-transform-none"
                    value="tasks"
                    disabled
                  >
                    Tasks
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </>
          )}

          <div className="row">
            <div
              className={`col-lg-7 col-md-12 col-sm-12 col-12 ${Style.leftContainer}`}
            >
              {!isMobileTab && (
                <h5 className={`${Style.title}`}>
                  {improvementPlanEnum.empowerment === improvementPlanId
                    ? "Empowerment Program Tasks"
                    : improvementPlanEnum.unstoppable === improvementPlanId
                    ? "Unstoppable You Tasks"
                    : ""}
                </h5>
              )}
              {handleResponsiveCondition("tasks") && (
                <div className="mt-5">
                  {isSessionStart ? (
                    <EmpowermentSession
                      selectedSession={selectedStepper}
                      preEmoji={preEmoji}
                      maintenanceMonth={month}
                      nextSessionId={stepperList[selectedStepper + 1]?.id}
                      nextSessionIsMaintenance={
                        stepperList[selectedStepper + 1]?.isMaintenance
                      }
                      sessionDetail={stepperList[selectedStepper]}
                      emojiSelect={sessionStart}
                      sessionId={startSessionId}
                      title={sessionsList[selectedStepper].session}
                      handleCompleteTaskList={handleCompleteTaskList}
                      handleCompleteTask={handleCompleteTask}
                      handleNextSession={handleNextSession}
                      increamentMaintenanceSession={
                        increamentMaintenanceSession
                      }
                      hideCompletedTask={hideCompletedTask}
                      price={stepperList[selectedStepper].price}
                      isShowCompletedTask={isShowCompletedTask}
                      isPaidSession={stepperList[selectedStepper]?.isPaid}
                      isMaintenance={
                        stepperList[selectedStepper]?.isMaintenance
                      }
                      isEmopwerment={
                        improvementPlanId === improvementPlanEnum.empowerment
                          ? true
                          : false
                      }
                    />
                  ) : (
                    <>
                      {stepperList[selectedStepper]?.isMaintenance &&
                      !stepperList[selectedStepper]?.isPaid ? (
                        <div
                          className={`mx-auto ${Style.paidSessionContainer}`}
                        >
                          <PaidSessionPopup
                            isMaintenance={
                              stepperList[selectedStepper]?.isMaintenance
                            }
                            isEmopwerment={true}
                            price={stepperList[selectedStepper]?.price}
                            currentSession={selectedStepper - 1}
                            currentSessionId={stepperList[selectedStepper]?.id}
                          />
                          {isShowTimer && timerValue > 0 && (
                            <div className={`${Style.bottomTimerContainer}`}>
                              <div className={`${Style.bottomTimer}`}>
                                <BottomTimer
                                  isUnstoppable={true}
                                  expiryTime={timerValue}
                                  month={month}
                                  currentSession={selectedStepper}
                                  handleTimer={handleTimer}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <>
                          <SessionDetail
                            isShowTimer={isShowTimer}
                            month={month}
                            sessionDetail={stepperList[selectedStepper]}
                            title={sessionsList[selectedStepper].session}
                            handleSessionstart={handleSessionstart}
                          />
                          {isShowTimer && timerValue > 0 && (
                            <div className={`${Style.bottomTimerContainer}`}>
                              <div className={`${Style.bottomTimer}`}>
                                <BottomTimer
                                  isUnstoppable={true}
                                  expiryTime={timerValue}
                                  month={month}
                                  currentSession={selectedStepper}
                                  handleTimer={handleTimer}
                                />
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 col-12">
              {!isMobileTab && (
                <h5 className={`${Style.title} w-50`}>
                  {improvementPlanEnum.empowerment === improvementPlanId
                    ? "Empowerment Program Progress"
                    : improvementPlanEnum.unstoppable === improvementPlanId
                    ? "Unstoppable You Progress"
                    : ""}
                </h5>
              )}
              {handleResponsiveCondition("progress") && (
                <div className={`${Style.steppersContainer} mt-5`}>
                  {stepperList?.map((step, index) => (
                    <StepperCard
                      key={Math.random()}
                      label={step.label}
                      index={index}
                      title={step.title}
                      session={step.session}
                      totalLength={stepperList.length}
                      selected={step.selected}
                      isComplete={step.isComplete}
                      handleSelectedStepper={handleSelectedStepper}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Empowerment;
