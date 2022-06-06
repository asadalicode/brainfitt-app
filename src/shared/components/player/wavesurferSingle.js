import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import Style from "./wavesurferSingle.module.scss";
import { ReactComponent as PlayCircle } from "../../../assets/images/audioPlayer/play circle.svg";
import { ReactComponent as Play } from "../../../assets/images/audioPlayer/play.svg";
import { ReactComponent as Pause } from "../../../assets/images/audioPlayer/pause.svg";
import testAudio from "../../../assets/images/audioPlayer/testAudio.mp3";
import { LinearProgress } from "@mui/material";
import { useBeforeunload } from "react-beforeunload";

const WavesurferSingle = ({
  handleCompleteAudio,
  dashboardHomeMusic = { testAudio },
  progressbar = 0.5,
  cursor = 10,
  mode = false,
  isHome = false,
  container = "wavesurfers",
  boost,
  isLock = false,
  ...props
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [_flagCurrentTime, set_flagCurrentTime] = useState(false);
  const [waveSurfer, setWaveSurfer] = useState(null);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const valueRef = useRef();

  useEffect(() => {
    setWaveSurfer(
      WaveSurfer.create({
        container: `#${container}`,
        cursorColor: "#ffffff",
        progressColor: "#ffffff",
        waveColor: "#c6c6c6",
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
    set_flagCurrentTime(true);
  }, []);

  useEffect(() => {
    if (waveSurfer) {
      waveSurfer.load(dashboardHomeMusic, [1, 1]);
      waveSurfer.on("ready", () => {
        setIsLoading(false);
      });
      waveSurfer?.on("finish", () => {
        finishAudio();
        waveSurfer.pause();
      });
    }
    return () => {
      waveSurfer?.pause();
    };
  }, [waveSurfer]);

  const finishAudio = () => {
    setIsPlaying(false);
    handleCompleteAudio?.();
  };

  useEffect(() => {
    return () => {
      mode && onUnload();
    };
  }, []);
  useBeforeunload((event) => {
    event.preventDefault();
    onUnload();
  });

  const onUnload = (e) => {
    localStorage.setItem(
      `currentTime_${container}`,
      JSON.stringify({ id: container, timeCount: valueRef.current })
    );
    e.preventDefault();
    e.returnValue = "";
  };
  const getCurrentTime = () => {
    const tokenString = localStorage.getItem(`currentTime_${container}`);
    const getData = JSON.parse(tokenString);
    return getData;
  };

  const onSingleMusicPlay = () => {
    if (!isLock) {
      let _timeRelatedData = getCurrentTime();
      if (waveSurfer) {
        if (_timeRelatedData?.id === container && _flagCurrentTime) {
          waveSurfer.on("ready", () => {
            waveSurfer.play(_timeRelatedData?.timeCount);
            set_flagCurrentTime(false);
          });
          if (_flagCurrentTime) {
            waveSurfer.play(_timeRelatedData?.timeCount);
            set_flagCurrentTime(false);
          }
        } else {
          waveSurfer.play();
        }
        setIsPlaying(true);
        onCurrentTime();
        // onRemainingTime()
        setDuration(onTimeDuration());
      }
    }
  };

  const onSingleMusicPause = () => {
    if (waveSurfer) {
      waveSurfer.pause();
      setIsPlaying(false);
    }
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
      valueRef.current = time;
      setCurrentTime(total);
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

  // --------------------- Remaining Time ----------------------
  const onRemainingTime = () => {
    let _total, _remain, _reaminingTime;
    _total = waveSurfer.getDuration();
    waveSurfer.on("audioprocess", () => {
      _remain = _total - waveSurfer.getCurrentTime();

      let _hours = Math.floor(_remain / 3600); // get _hours(integer) from time
      let _tmp1 = Math.round(_remain - _hours * 60); // get minutes(integer) from time

      let _minute = Math.floor(_tmp1 / 60); // get _minute(integer) from time
      let _tmp = Math.round(_tmp1 - _minute * 60); // get second(integer) from time

      let _second = (_tmp < 10 ? "0" : "") + _tmp; // make two-figured integer if less than 10
      _minute = (_minute < 10 ? "0" : "") + _minute;
      _hours = (_hours < 10 ? "0" : "") + _hours;

      _reaminingTime = String(
        _hours !== "00"
          ? _hours + ":" + _minute + ":" + _second
          : _minute + ":" + _second
      ); // combine _minute and second in string

      // setDuration(_reaminingTime)
      return _reaminingTime;
    });
  };

  return (
    <div className={`${Style.container}`}>
      {mode ? (
        <div className="d-flex">
          <div
            className={`${Style.buttonContainerBox} ${
              !isLock ? "cursor-pointer" : ""
            }`}
          >
            <div className="d-flex justify-content-center">
              <div className="mr-4">
                {isPlaying ? (
                  <Pause
                    onClick={onSingleMusicPause}
                    className={Style.playPauseTab}
                  />
                ) : (
                  <Play
                    onClick={onSingleMusicPlay}
                    className={Style.playPauseTab}
                  />
                )}
              </div>
            </div>
          </div>

          <div className={`ms-2 mt-2 ${Style.waveSurfer}`}>
            <div id={container} >
            {/* style={{ pointerEvents: "none" }} */}
              {isLoading && <LinearProgress color="inherit" />}
            </div>
            <div className="d-flex justify-content-between">
              <span className={Style.timeFont}>{currentTime}</span>
              <span className={Style.timeFont}>{duration}</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className={`${Style.buttonContainerBox} ${
              !isLock ? "cursor-pointer" : ""
            }`}
          >
            <div className="d-flex justify-content-center mb-3">
              <div className="mx-4">
                {isPlaying ? (
                  <Pause
                    onClick={onSingleMusicPause}
                    className={Style.pauseBox}
                  />
                ) : (
                  <PlayCircle
                    onClick={onSingleMusicPlay}
                    className={Style.playPauseBox}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-around">
            <div className="d-flex justify-content-center">
              <div
                className={`${Style.currentTimeSingle} ${
                  boost ? Style.currentTimeBoost : ""
                } ${isHome ? Style.singleTimeTop : ""}`}
              >
                {currentTime}
              </div>
              <div id={container}></div>
              {/* <div className={Style.duration}>{duration}</div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default WavesurferSingle;
