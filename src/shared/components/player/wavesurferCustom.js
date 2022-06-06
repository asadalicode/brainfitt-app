import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
// import CursorPlugin from 'wavesurfer.js/src/plugin/cursor/index.js'
import Style from "./wavesurfer.module.scss";
import { ReactComponent as Play } from "../../../assets/images/audioPlayer/play.svg";
import { Tooltip } from "@mui/material";
import { ReactComponent as Pause } from "../../../assets/images/audioPlayer/pause.svg";
import { ReactComponent as Next } from "../../../assets/images/audioPlayer/next.svg";
import { ReactComponent as Previous } from "../../../assets/images/audioPlayer/previous.svg";
import { ReactComponent as Loop } from "../../../assets/images/audioPlayer/loop.svg";
import { ReactComponent as Rewind } from "../../../assets/images/audioPlayer/rewind.svg";
import { ReactComponent as Forward } from "../../../assets/images/audioPlayer/forward.svg";
import { ReactComponent as Speaker } from "../../../assets/images/audioPlayer/speaker.svg";
import { ReactComponent as Playlist } from "../../../assets/images/audioPlayer/playlist.svg";
import audioPlayerImage from "../../../assets/images/dashboardModule/boost/image3.png";
import DisplayImage from "../displayImage/displayImage";
import heart from "../../../assets/images/audioPlayer/heart.svg";
import { LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  pauseMusic,
  playMusic,
  addPreviousMusicIndex,
  selectedMusicIndex,
  addInactivePlayerIndex,
  addPreviousMusicList,
  addMusicList,
} from "../../../redux/Action/wavesurfer";
import NewPlaylist from "../../../modules/dashboard/newPlaylist/newPlaylist";
import {setUserActivitiesAPICall} from "../../../modules/dashboard/dashboardService/dashboard.js";
import environment from "../../../environment";
import { deepEqual } from "assert";
import { handleToastMessage } from "../../js/handleToastMessage";
let ISLOOP = false;
const Wavesurfer = ({
  isControlButtons = false,
  playPauseButton = false,
  isPlayList = false,
  isVolume = false,
  isProgressbar = true,
  progressbar = 0.5,
  cursor = 10,
  handleSubscribePlan,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveSurfer, setWaveSurfer] = useState(null);
  const [nextOpacity, setNextOpacity] = useState(1);
  const [previousOpacity, setPreviousOpacity] = useState(0.5);
  const [volumeOpacity, setVolumeOpacity] = useState(1);
  const [loopOpacity, setLoopOpacity] = useState(0.5);
  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(0);
  const [interactionSecond, setInteractionSecond] = useState(0);
  const [previousInteractionSecond, setPreviousInteractionSecond] = useState(0);
  const [previousInteractionMinute, setPreviousInteractionMinute] = useState(0);
  const [interactionMinute, setInteractionMinute] = useState(0);
  const [isPlayButtonClickAble, setIsPlayButtonClickAble] = useState(true);

  const musicPurchased = true;

  const dispatch = useDispatch();
  const musicList = useSelector((state) => state.musicList.activePlaylistArray);
  const activePlayerIndex = useSelector(
    (state) => state.musicList.activePlayerIndex
  );
  const inActivePlayerIndex = useSelector((state) => state.inActivePlayerIndex);
  const musicIndex = useSelector((state) => state.musicIndex);
  const previousMusicIndex = useSelector((state) => state.previousMusicIndex);
  const wavesurferRef = useRef();
  const musicObjRef = useRef();

  const [isMobileTab, setIsMobileTab] = useState(false);

  const handleResize = () => {
    setIsMobileTab(window.innerWidth <= 850);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize());
  }, []);

  useEffect(() => {
    setWaveSurfer(
      WaveSurfer.create({
        container: "#waveform",
        cursorColor: "#ffffff",
        progressColor: "#ffffff",
        waveColor: "rgb(253, 254, 254,0.3)",
        mediaType: "audio",
        cursorWidth: 10,
        barHeight: progressbar,
        height: cursor,
        minPxPerSec: 5,
        responsive: true,
        hideScrollbar: true,
        // barGap: 2,
        barWidth: 5000,
        closeAudioContext: true,
        backend: "MediaElement",
        drawingContextAttributes: {
          desynchronized: false,
        },
        plugins: [
          // CursorPlugin.cursor.create({
          //     showTime: true,
          //     opacity: 1,
          //     customShowTimeStyle: {
          //         'background-color': '#000',
          //         color: '#fff',
          //         padding: '2px',
          //         'font-size': '10px'
          //     }
          // })
        ],
      })
    );
  }, []);

  useEffect(() => {
    if (musicList[musicIndex].isLock) {
      let _flag =
        interactionMinute > 0 ? true : interactionSecond > 44 ? true : false;
      if (_flag) {
        waveSurfer.setCurrentTime(previousInteractionSecond - 1);
        setIsPlayButtonClickAble(false);
        onPause(true);
      } else {
        // setIsPlayButtonClickAble(true);
      }
    }
  }, [interactionSecond, interactionMinute]);

  useEffect(() => {
    setIsPlaying(false);

    if (waveSurfer) {
      wavesurferRef.current = waveSurfer;
      musicObjRef.current = {
        musicList,
        musicIndex,
        activePlayerIndex,
      };
      if (musicList[musicIndex]?.isPlay) {
        if (
          previousMusicIndex === musicIndex &&
          activePlayerIndex === inActivePlayerIndex
        ) {
          onPlay();
          setIsPlaying(true);
        } else {
          waveSurfer.load(musicList[musicIndex].music, [1, 1]);
          waveSurfer.on("ready", () => {
            setIsPlaying(true);
            onPlay();
          });
          let _audioId = musicList[musicIndex]?.id
          setUserActivitiesAPICall(_audioId?.toString())
          waveSurfer.on("seek", () => {
            let time = waveSurfer.getCurrentTime();
            let minute = Math.floor(time / 60);
            let tmp = Math.floor(time - minute * 60);
            let temp = tmp - 1;
            let second = (temp < 10 ? "0" : "") + temp; // make two-figured integer if less than 10
            setInteractionSecond(tmp);
            setInteractionMinute(minute);
            if (musicList[musicIndex].isLock) {
              let _flag = minute > 0 ? true : tmp > 44 ? true : false;
              if (_flag) {
                waveSurfer.pause();
                setIsPlayButtonClickAble(false);
                handleToastMessage(
                  "error",
                  "You don't have any active subscription to listen the full audio"
                );
                handleSubscribePlan?.();
                // waveSurfer.setCurrentTime(0);
                onPause(true);
              } else {
                setIsPlayButtonClickAble(true);
              }
            }
          });
          waveSurfer.on("interaction", () => {
            let time = waveSurfer.getCurrentTime();
            let minute = Math.floor(time / 60);
            let tmp = Math.floor(time - minute * 60);
            setPreviousInteractionSecond(tmp);
            setPreviousInteractionMinute(minute);
          });
          waveSurfer?.on("finish", () => {
            ISLOOP
              ? onPlay()
              : dispatch(
                  pauseMusic({
                    musicList: musicList,
                    index: musicIndex,
                    activePlayerIndex,
                  })
                );
          });
          dispatch(addPreviousMusicIndex(musicIndex));
        }
        setNextOpacity(musicIndex + 1 === musicList.length ? 0.5 : 1);
        setPreviousOpacity(musicIndex === 0 ? 0.5 : 1);
      } else {
        onPause();
        setIsPlaying(true);
      }
    }
  }, [
    musicList[musicIndex]?.isPlay,
    musicIndex,
    activePlayerIndex,
    waveSurfer,
  ]);

  useEffect(() => {
    if (waveSurfer) {
      if (volume == "0") {
        waveSurfer.setVolume(volume);
        setVolumeOpacity(0.5);
      } else if (volume > "0") {
        waveSurfer.setVolume(volume);
        setVolumeOpacity(1);
      }
    }
  }, [volume]);

  //use for componentWillUnmount
  useEffect(() => {
    return () => {
      wavesurferRef?.current?.pause();
      dispatch(
        pauseMusic({
          musicList: musicObjRef.current?.musicList,
          index: musicObjRef.current?.musicIndex,
          activePlayerIndex: musicObjRef.current?.activePlayerIndex,
        })
      ); // for pause Icon in audioPlayerCard.js
      dispatch(addMusicList({ musicList: [], activePlayerIndex: 0 })); // for hide the wavesurfer main bar.
      dispatch(addInactivePlayerIndex(0)); // for wavesurfer.on.ready function called in useEffect
    };
  }, []);

  const onPlay = (playMode = false) => {
    if (isPlayButtonClickAble) {
      playMode &&
        isPlaying &&
        dispatch(
          playMusic({
            musicList: musicList,
            index: musicIndex,
            activePlayerIndex: inActivePlayerIndex,
          })
        );
      dispatch(addInactivePlayerIndex(activePlayerIndex));

      onCurrentTime();
      setDuration(onTimeDuration());
      waveSurfer.play();
    }
  };
  const onPause = (pauseMode = false) => {
    if (isPlayButtonClickAble) {
      waveSurfer.pause();
      // setIsPlaying(false)
      pauseMode &&
        dispatch(
          pauseMusic({
            musicList: musicList,
            index: musicIndex,
            activePlayerIndex,
          })
        );
      onLoop();
    }
  };

  const onPrevious = () => {
    if (musicIndex > 0) {
      dispatch(selectedMusicIndex(musicIndex - 1));
      dispatch(
        playMusic({
          musicList: musicList,
          index: musicIndex - 1,
          activePlayerIndex,
        })
      );
      dispatch(
        pauseMusic({
          musicList: musicList,
          index: musicIndex,
          activePlayerIndex,
        })
      );
      setPreviousOpacity(musicIndex === 1 ? 0.5 : 1);
      setLoopOpacity(0.5);
      setIsLoop(false);
      ISLOOP = false;
    }
  };
  const onNext = () => {
    if (musicIndex + 1 < musicList.length && musicPurchased) {
      dispatch(selectedMusicIndex(musicIndex + 1));
      dispatch(
        playMusic({
          musicList: musicList,
          index: musicIndex + 1,
          activePlayerIndex,
        })
      );
      dispatch(
        pauseMusic({
          musicList: musicList,
          index: musicIndex,
          activePlayerIndex,
        })
      );
      setNextOpacity(musicIndex + 2 === musicList.length ? 0.5 : 1);
      setLoopOpacity(0.5);
      setIsLoop(false);
      ISLOOP = false;
    }
  };
  const onRewind = () => {
    waveSurfer.skipBackward(5);
  };
  const onForward = () => {
    waveSurfer.skipForward(5);
  };
  const onVolumeChange = (event) => {
    setVolume(event.target.value);
  };
  const onMute = () => {
    if (volume) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
  };
  const onLoop = () => {
    if (!isLoop) {
      setLoopOpacity(1);
    } else {
      setLoopOpacity(0.5);
    }
    setIsLoop((prev) => !prev);
    ISLOOP = !isLoop;
  };
  const onCurrentTime = () => {
    let total;

    waveSurfer.on("audioprocess", () => {
      let time = waveSurfer.getCurrentTime(); // get duration(float) in second

      let minute = Math.floor(time / 60); // get minute(integer) from time

      let tmp = Math.floor(time - minute * 60); // get second(integer) from time

      let second = (tmp < 10 ? "0" : "") + tmp; // make two-figured integer if less than 10

      minute = (minute < 10 ? "0" : "") + minute;

      total = String(minute + ":" + second); // combine minute and second in string

      setCurrentTime(total);
      setDuration(onTimeDuration());
      if (musicList[musicIndex].isLock) {
        let _flag = minute > 0 ? true : tmp > 44 ? true : false;
        if (_flag) {
          waveSurfer.pause();
          setIsPlayButtonClickAble(false);
          onPause(true);
          handleSubscribePlan?.();
        } else {
          setIsPlayButtonClickAble(true);
        }
      }
      return total;
    });
  };
  const onTimeDuration = () => {
    let time = waveSurfer.getDuration(); // get duration(float) in second

    return Math.floor(time / 3600) > 0
      ? [
          Math.floor(time / 3600) > 0
            ? Math.floor(time / 3600) > 9
              ? Math.floor(time / 3600)
              : "0" + Math.floor(time / 3600)
            : "00", //hours
          Math.floor((time % 3600) / 60), //minutes
          ("00" + Math.floor(time % 60)).slice(-2),
        ].join(":") //seconds
      : [
          Math.floor(time / 60) > 0
            ? Math.floor((time % 3600) / 60) > 9
              ? Math.floor((time % 3600) / 60)
              : "0" + Math.floor((time % 3600) / 60)
            : "00", // minutes
          ("00" + Math.floor(time % 60)).slice(-2), // seconds
        ].join(":");
  };
  const onPlaylist = (e) => {
    let file = e.target.files;
    // this will be inside the reader.onload()
    // let blob = new window.Blob([new Uint8Array(event.target.result)],{
    //   type: "audio/*"
    // })
    Object.values(file).map((item) => {
      let reader = new FileReader();
      reader.readAsDataURL(item);
      reader.onload = (e) => {
        let audioData = e.target.result;
        let base64 = audioData.split("base64")[1].substring(1);
        console.log("base64 ==", base64);
      };
    });
  };
  const handleClickOpen = (isFavorite) => {
    setIsFavorite(isFavorite);
    setIsOpen(true);
  };

  return (
    <div className={`${Style.container}`}>
      <div className={`d-flex align-items-center justify-content-between`}>
        {!isMobileTab && (
          <LeftPortion
            audioDetail={musicList[musicIndex]}
            handlePopup={handleClickOpen}
          />
        )}
        <div className={`d-flex flex-column  ${Style.middlePortion}`}>
          <div className={`d-flex ${Style.buttonControlBox}`}>
            {isMobileTab && <LeftPortion audioDetail={musicList[musicIndex]} />}
            <div className="d-flex justify-content-center ">
              {!isMobileTab && (
                <div onClick={onPrevious}>
                  <Previous
                    style={{ opacity: previousOpacity }}
                    className={`${Style.controlBtn} me-4`}
                  />
                </div>
              )}
              <div onClick={onRewind} className="mx-2">
                <Rewind className={Style.controlBtn} />
              </div>
              {/* <div onClick={() => onTogglePlayPause()} className='mx-4' > */}
              <div
                className={`mx-2 ${
                  isPlayButtonClickAble ? "cursor-pointer" : ""
                }`}
              >
                {musicList[musicIndex]?.isPlay && isPlaying ? (
                  <Pause
                    onClick={() => onPause(true)}
                    className={Style.playPause}
                  />
                ) : (
                  <Play
                    onClick={() => onPlay(true)}
                    className={Style.playPause}
                  />
                )}
              </div>
              <div onClick={onForward} className="mx-2">
                <Forward className={Style.controlBtn} />
              </div>
              {!isMobileTab && (
                <div onClick={onNext}>
                  <Next
                    style={{ opacity: nextOpacity }}
                    className={`${Style.controlBtn} ms-4`}
                  />
                </div>
              )}
            </div>
          </div>
          <div
            className={`d-flex flex-column justify-content-center ${Style.waveSurferBox}`}
          >
            <div className={`${Style.waveSurferContainer}`}>
              <div className="w-100">
                <div
                  style={{ pointerEvents: "none" }}
                  id="waveform"
                  className={`${!isPlaying ? Style.hidePlayer : ""}`}
                ></div>
                {!isPlaying && (
                  <LinearProgress
                    color="inherit"
                    className={Style.linearProgress}
                  />
                )}
              </div>
              <div className={`d-flex justify-content-between`}>
                <span className={`${Style.time}`}>{currentTime}</span>
                <span className={`${Style.time}`}>{duration}</span>
              </div>
            </div>
          </div>
        </div>
        {!isMobileTab && (
          <div
            className={`d-flex flex-column align-items-end ${Style.rightPortion}`}
          >
            <div className="d-flex">
              <div
                onChange={onPlaylist}
                className="d-flex justify-content-center align-items-start"
              >
                <Tooltip title="Add new playlist" arrow placement="top">
                  <Playlist
                    className={Style.playList}
                    onClick={() => handleClickOpen(false)}
                  />
                </Tooltip>
                {/* ---------- below line is for base64 conversion of imported audio ---------- */}
                {/* <input type={'file'} multiple hidden accept="audio/*" /> */}
              </div>
              <div
                onChange={onPlaylist}
                className="d-flex justify-content-center align-items-start"
              >
                <Loop
                  className={Style.playList}
                  style={{
                    opacity: loopOpacity,
                    marginRight: 5,
                    cursor: "pointer",
                  }}
                  onClick={onLoop}
                />
              </div>
            </div>
            <div className="d-flex">
              <Speaker
                style={{
                  opacity: volumeOpacity,
                  marginRight: 5,
                  cursor: "pointer",
                }}
                onClick={onMute}
              />
              <input
                type="range"
                className={Style.slider}
                min="0"
                max="1"
                value={volume}
                onChange={onVolumeChange}
                step="0.05"
              />
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <NewPlaylist
          isOpen={isOpen}
          isFavorite={isFavorite}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};
export default Wavesurfer;

const LeftPortion = ({ audioDetail, handlePopup }) => {
  const handleClick = () => {
    handlePopup(true);
  };
  return (
    <div className={`d-flex align-items-center ${Style.leftPortion}`}>
      <div className={`${Style.imageBox}`}>
        <DisplayImage imageUrl={environment.serverUrl + audioDetail?.image} />
      </div>
      <div className={`d-flex flex-column ms-2`}>
        <span className={Style.title}>{audioDetail?.title}</span>
        {/* <span className={Style.artistName}>Artist name</span> */}
        <img
          className={`${Style.imgHeart} cursor-pointer`}
          onClick={handleClick}
          src={heart}
        />
      </div>
    </div>
  );
};
