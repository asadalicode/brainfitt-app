import WavesurferSingle from "../player/wavesurferSingle";
import Style from "./sessionTask.module.scss";
import { ReactComponent as LockIcon } from "../../../assets/images/lock.svg";
import HappyEmoji from "../../../assets/images/homeModule/shareFeeling/happy.png";
import { TasksEnum } from "../../js/tasksEnum";
import { ReactComponent as PlayButton } from "../../../assets/images/play.svg";
import { ReactComponent as TickIcon } from "../../../assets/images/tick.svg";
import { ReactComponent as DownloadIcon } from "../../../assets/images/download.svg";
import { ReactComponent as EBooklet } from "../../../assets/images/eBooklet.svg";
import musicUrl from "../../../assets/images/audioPlayer/testAudio.mp3";
import { useEffect, useState } from "react";
import { preEmojiList } from "../../../modules/home/shareFeeling/shareFeeling";
import { getComparisonReportAPICall } from "../../../modules/dashboard/dashboardService/empowermentUnstoppable";
import EmojiBox from "../../../modules/home/shareFeeling/emojiBox/emojiBox";
import environment from "../../../environment";
import { sessionTaskStatusEnum } from "../../js/enums";
import { handleToastMessage } from "../../js/handleToastMessage";

const SessionTask = ({
  task,
  handleClick,
  index,
  sessionId,
  handleCompleteAudio,
}) => {
  const [isShowPreEmojis, setIsShowPostEmojis] = useState(false);
  const [emojiList, setEmojiList] = useState([]);

  useEffect(() => {
    if (task.taskValue === TasksEnum.preEmoji && task.isComplete) {
      setCompletedTaskPreEmojis();
    }
  }, [task.isComplete]);

  const setCompletedTaskPreEmojis = async () => {
    let _emojis = await getComparisonReport();
    let _emojisData = _emojis.find(
      (emojiData) => emojiData.taskType === TasksEnum.preEmoji
    );
    let _emojisList = _emojisData.answer.split(",");
    _emojisList = preEmojiList.filter((item) => {
      if (_emojisList.includes(item.title)) {
        return item;
      }
    });

    setIsShowPostEmojis(true);
    setEmojiList(_emojisList);
  };

  const getComparisonReport = async () => {
    let _response = await getComparisonReportAPICall(sessionId);
    if (_response.isSuccess) {
      return _response.emojisData;
    }
  };

  const handleSessionClick = () => {
    if (task?.isComplete) {
      return;
    }
    if (
      !task?.isLock &&
      (task.taskValue === TasksEnum.audio ||
        task.taskValue === TasksEnum.lession)
    ) {
      return;
    }
    if (
      (!task?.isLock && !task?.isComplete) ||
      task.status === sessionTaskStatusEnum.active
    ) {
      handleClick(index, task.taskValue, task.id);
    }
  };

  const handleTaskConditions = () => {
    const taskArray = [TasksEnum.report, TasksEnum.moodComparision];
    return !taskArray.includes(task.taskValue);
  };

  const handleEmptyLesson = () => {
    handleToastMessage("error", "No content");
  };

  const handleEmptyPdf = () => {
    handleToastMessage("error", "No content");
  };
  return (
    <>
      {
        //   task.taskValue !== TasksEnum.notificationPopup &&
        //     task.taskValue !== TasksEnum.completeSessionPopup &&
        //     task.taskValue !== TasksEnum.timer &&
        //     task.taskValue !== TasksEnum.report &&
        handleTaskConditions() && (
          <div
            onClick={handleSessionClick}
            className={`${Style.taskbar} ${
              !task?.isLock && !task?.isComplete ? "cursor-pointer" : ""
            } mt-3`}
          >
            <div className="d-flex justify-content-between">
              <span className={`${Style.title}`}>
                {task.taskValue === TasksEnum.preEmoji ? (
                  <>{task.isComplete ? "Your Mood Now" : task?.title}</>
                ) : (
                  task?.title
                )}
              </span>
              <div
                className={`d-flex justify-content-center align-items-center ${Style.lock}`}
              >
                {task?.isComplete && <TickIcon height={30} width={30} />}
                {task?.isLock && <LockIcon height={30} width={30} />}
              </div>
            </div>
            {task?.heading && task?.timerEnd && (
              <h6
                className={`d-flex justify-content-center mt-4 mb-2 ${Style.instructions}`}
              >
                {task?.heading}
              </h6>
            )}
            <p className={`mt-2 ${Style.description}`}>
              {task?.taskValue === TasksEnum.preEmoji && !task.isComplete && (
                <img src={HappyEmoji} className="me-1" height={20} />
              )}

              {task.taskValue === TasksEnum.form && <EBooklet height={18} />}
              {/* display emojis when pre-mood task completed */}

              {task.taskValue === TasksEnum.preEmoji && task.isComplete ? (
                <>
                  {isShowPreEmojis && (
                    <div className={`d-flex ${Style.emojiContainer}`}>
                      {emojiList.map((emoji) => (
                        <div
                          key={Math.random()}
                          className={`d-flex flex-column ${Style.emojiBox}`}
                        >
                          <img
                            className="me-1"
                            height={20}
                            width={20}
                            src={emoji.Icon}
                          />
                          <span>{emoji.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                task?.description
              )}
            </p>

            {/* auido */}
            {task.taskValue === TasksEnum.audio && (
              <div
                className={`${Style.audioBox} justify-content-between align-items-center d-flex mt-4`}
              >
                <WavesurferSingle
                  handleCompleteAudio={handleCompleteAudio}
                  dashboardHomeMusic={`${task.audioUrl}`}
                  mode={"unstoppable"}
                  container={`container${task.id}`}
                  isLock={task.isLock || task.isComplete}
                />
              </div>
            )}
            {/* lesson */}
            {task?.taskValue === TasksEnum.lession && (
              <>
                <div
                  className={`${Style.audioBox} justify-content-between align-items-center d-flex mt-4`}
                >
                  <WavesurferSingle
                    handleCompleteAudio={handleCompleteAudio}
                    dashboardHomeMusic={`${task.audioUrl}`}
                    mode={"unstoppable"}
                    container={`container${task.id}`}
                    isLock={task.isLock || task.isComplete}
                  />
                </div>
                <div
                  className={`d-flex mt-2 justify-content-between align-items-center ${Style.readLessonBox}`}
                >
                  <span className={`${Style.readLessonTitle} cursor-pointer`}>
                    {task?.isLessonPdf ? (
                      <a
                        className={`${
                          task.isComplete || task.isLock ? Style.disabled : ""
                        }`}
                        href={task.lessonPdf}
                      >
                        Read Your Lesson
                      </a>
                    ) : (
                      <a
                        className={`${
                          task.isComplete || task.isLock ? Style.disabled : ""
                        }`}
                        onClick={handleEmptyLesson}
                      >
                        Read Your Lesson
                      </a>
                    )}
                  </span>
                  <button className={`white-btn ${Style.activiesButton}`}>
                    {task?.isPdfUrl ? (
                      <a
                        className={`${
                          task.isComplete || task.isLock ? Style.disabled : ""
                        }`}
                        download
                        href={task.pdfUrl}
                      >
                        Activities
                        <span>
                          <DownloadIcon
                            height={15}
                            fill={"black"}
                            opacity={0.7}
                          />
                        </span>
                      </a>
                    ) : (
                      <a
                        className={`${
                          task.isComplete || task.isLock ? Style.disabled : ""
                        }`}
                        onClick={handleEmptyPdf}
                      >
                        Activities
                        <span>
                          <DownloadIcon
                            height={15}
                            fill={"black"}
                            opacity={0.7}
                          />
                        </span>
                      </a>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        )
      }
    </>
  );
};
export default SessionTask;
