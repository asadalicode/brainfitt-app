import environment from "../../../environment";
import { backendCall } from "../../../shared/backendService/backendCall";
import {
  sessionPaymentStatus,
  sessionStatusEnum,
  sessionTaskStatusEnum,
} from "../../../shared/js/enums";
import { handleToastMessage } from "../../../shared/js/handleToastMessage";
import { ComparisonEmojimodel } from "../model/comparisonEmojiModel";
import { SessionsModel } from "../model/sessionsModel";
import { SessionTaskModel } from "../model/sessionTaskModel";
import myMusic from "../../../assets/images/audioPlayer/testAudio.mp3";
import { async } from "@firebase/util";
import {
  deleteTransectionIdFromLocalStorage,
  getTransectionId,
  setTransectionIdInLocalStorage,
} from "../../../shared/js/userCredential";

export const getAllSessionAPiCall = async (improvementPlanId) => {
  let _url = `empowerment/get_sessions`;
  let _data = {
    improvement_plan_id: improvementPlanId,
  };
  let _response = {
    isSuccess: false,
    sessionList: [],
  };

  await backendCall(_url, "POST", _data).then(async (response) => {
    let _sessionModel = new SessionsModel();
    let _sessionList = [];
    if (!response.error) {
      _sessionList = response.data.map((session, index) => {
        const {
          description,
          next_interval,
          next_step,
          payment_status,
          price,
          status,
          title,
          is_maintenance,
          id,
        } = session;
        _sessionModel = {
          label: index === 0 ? "Free" : index,
          id: id,
          title: title,
          description: description,
          nextInterval: next_interval,
          nextStep: next_step,
          isPaid: sessionPaymentStatus.paid === payment_status ? true : false,
          isComplete: sessionStatusEnum.completed === status ? true : false,
          price: price,
          selected: false,
          isMaintenance: is_maintenance === 1 ? true : false,
          session: "",
          status: status,
        };

        return _sessionModel;
      });
      let _index = _sessionList.findIndex(
        (session) => session.status === sessionStatusEnum.active
      );
      if (_index === -1) {
        _index = 0;
      }
      _sessionList[_index].selected = true;
      _response = {
        isSuccess: !response.error,
        sessionList: _sessionList,
      };
    }
  });

  return _response;
};

export const isSessionAlreadyStartAPICall = async (
  sessionId,
  isMaintenance = false
) => {
  let _url = `empowerment/get_tasks`;
  if (isMaintenance) {
    _url = `empowerment_maintenance/get_tasks`;
  }
  let _data = {
    session_id: sessionId,
  };
  let _response = {
    isSuccess: false,
    isSessionStart: false,
    sessionFirstTask: [],
  };

  await backendCall(_url, "POST", _data).then(async (response) => {
    if (!response.error) {
      let _completed = false;
      if (response?.data?.length > 0) {
        if (response?.data?.[0].status === sessionStatusEnum.completed) {
          _completed = true;
        }
        _response = {
          isSuccess: !response.error,
          isSessionStart: _completed,
          sessionFirstTask: response?.data?.[0],
        };
      }
    }
  });

  return _response;
};

export const getSessionTaskAPiCall = async (sessionId, isMaintenance) => {
  let _url = `empowerment/get_tasks`;
  if (isMaintenance) {
    _url = `empowerment_maintenance/get_tasks`;
  }
  let _data = {
    session_id: sessionId,
  };
  let _response = {
    isSuccess: false,
    taskList: [],
  };

  await backendCall(_url, "POST", _data).then(async (response) => {
    let _sessionTaskModel = new SessionTaskModel();
    let _taskList = [];
    if (!response.error) {
      if (response.data.length > 0) {
        _taskList = response.data.map((sessionTask, index) => {
          const {
            id,
            title,
            description,
            audio_url,
            pdf_url,
            google_form_link,
            google_form_id,
            is_paid,
            pre_interval,
            next_step,
            task_type,
            pre_req,
            notification_pre_req,
            status,
            lesson_pdf,
            month,
            post_assessment_form,
          } = sessionTask;
          _sessionTaskModel = {
            id: id,
            title: title,
            description: description,
            audioUrl: `${environment.serverUrl}` + `${audio_url}`,
            pdfUrl: `${environment.serverUrl}` + `${pdf_url}`,
            isPdfUrl: pdf_url ? true : false,
            googleFormLink: google_form_link,
            googleFormId: google_form_id,
            preInterval: pre_interval,
            month: month,
            lessonPdf: `${environment.serverUrl}` + `${lesson_pdf}`,
            isLessonPdf: lesson_pdf ? true : false,
            nextStep: next_step,
            isPaid: is_paid,
            status: status,
            previousReq: pre_req,
            notificationPreviousReq: notification_pre_req,
            isComplete:
              sessionTaskStatusEnum.completed === status ? true : false,
            isLock: sessionTaskStatusEnum.completed === status ? false : true,
            postAssessmentForm:
              `${environment.serverUrl}` + `${post_assessment_form}`,
            taskValue: task_type,
          };

          return _sessionTaskModel;
        });
        let _index = _taskList.findIndex(
          (session) => session.status === sessionTaskStatusEnum.active
        );

        if (_index === -1) {
          _index = _taskList.findIndex(
            (session) => session.status === sessionTaskStatusEnum.pending
          );
          if (_index === -1) {
            _index = 0;
          }
        }
        if (_taskList[_index].preInterval === "0") {
          _taskList[_index].isLock = false;
        }
        _response = {
          isSuccess: !response.error,
          taskList: _taskList,
        };
      }
    }
  });

  return _response;
};

export const getPostAssessmentAPICall = async (taskId) => {
  let _url = `empowerment/get_post_assessment`;
  let _data = {
    task_id: taskId,
  };
  let _response = {
    isSuccess: false,
    pdf: "",
  };

  await backendCall(_url, "POST", _data).then(async (response) => {
    if (!response.error) {
      const { post_assessment_form } = response.data;
      let _isSuccess =
        !response.error === true
          ? post_assessment_form
            ? true
            : false
          : !response.error;
      _response = {
        isSuccess: _isSuccess,
        pdf: `${environment.serverUrl}` + `${post_assessment_form}`,
      };
    }
  });

  return _response;
};

export const setCompleteTaskAPiCall = async (taskId, answer, isMaintenance) => {
  let _url = `empowerment/complete_task`;
  if (isMaintenance) {
    _url = "empowerment_maintenance/complete_task";
  }
  let _data = {
    task_id: taskId,
    answer: answer,
  };
  let _response = {
    isSuccess: false,
  };

  await backendCall(_url, "POST", _data).then(async (response) => {
    !response.error &&
      handleToastMessage("success", "Task completed successfully");
    _response.isSuccess = !response.error;
  });

  return _response;
};

export const getComparisonReportAPICall = async (sessionId, isMaintenance) => {
  let _url = `empowerment/get_comparison_report`;
  if (isMaintenance) {
    _url = `empowerment_maintenance/get_comparison_report`;
  }
  let _data = {
    session_id: sessionId,
  };
  let _response = {
    isSuccess: false,
    emojisData: [],
  };

  await backendCall(_url, "POST", _data).then(async (response) => {
    let _comparsionEmojiModel = new ComparisonEmojimodel();
    let _emojisData = [];
    if (!response.error) {
      _emojisData = response.data.map((sessionTask, index) => {
        const { id, title, description, answer, task_type } = sessionTask;
        _comparsionEmojiModel = {
          id: id,
          title: title,
          description: description,
          answer: answer,
          taskType: task_type,
        };

        return _comparsionEmojiModel;
      });
      _response = {
        isSuccess: !response.error,
        emojisData: _emojisData,
      };
    }
  });

  return _response;
};

export const completeGoogleFormTaskAPICall = async (taskId, isMaintenance) => {
  let _url = "empowerment/complete_google_form_task";
  if (isMaintenance) {
    _url = "empowerment_maintenance/complete_google_form_task";
  }
  let _data = {
    task_id: taskId,
  };
  let _response = {
    isSuccess: false,
  };
  let _isSuccess = false;
  await backendCall(_url, "POST", _data).then(async (response) => {
    _isSuccess = !response.error;
  });
  _response = {
    isSuccess: _isSuccess,
  };
  return _response;
};

export const createPaymentIntentAPICall = async (sessionId) => {
  let _url = "empowerment/create_payment_intent";
  let _data = {
    session_id: sessionId,
  };
  let _response = {
    isSuccess: false,
    clientSecret: "",
  };
  await backendCall(_url, "POST", _data).then((response) => {
    if (!response.error) {
      setTransectionIdInLocalStorage(response.data.id);
      _response = {
        isSuccess: !response.error,
        clientSecret: response.data.intent.client_secret,
        amount: response.data.price,
      };
    }
  });
  return _response;
};

export const verifyPaymentIntentAPICall = async () => {
  let transectionId = await getTransectionId();
  let _url = "empowerment/verify_payment_intent";
  let _data = {
    transaction_id: transectionId,
  };
  let _response = {
    isSuccess: false,
  };
  await backendCall(_url, "POST", _data).then((response) => {
    if (!response.error) {
      deleteTransectionIdFromLocalStorage();
    }
    _response = {
      isSuccess: !response.error,
    };
  });
  return _response;
};

export const checkTaskPreRequisitAPICall = async (taskId) => {
  let _url = `empowerment/check_task_pre_req/${taskId}`;
  let _response = {
    isSuccess: false,
    time: 0,
  };

  await backendCall(_url, "GET", {}, true, false).then((response) => {
    let _time = 0;
    if (response.message.split("'")[1]) {
      _time = response.message.split("'")[1];
    }
    _response = {
      isSuccess: response.error,
      time: _time,
    };
  });

  return _response;
};
