import React, { useState } from "react";
import Style from "./audioPlayerCard.module.scss";
import { ReactComponent as LockIcon } from "../../../../assets/images/lock.svg";
import { ReactComponent as PlayButton } from "../../../../assets/images/audioPlayer/play.svg";
import { ReactComponent as PauseButton } from "../../../../assets/images/audioPlayer/pause.svg";
import wave from "../../../../assets/images/audioPlayer/Equalizer Gif.gif";
import { useDispatch } from "react-redux";
import {
  addMusicList,
  selectedMusicIndex,
  playMusic,
  pauseMusic,
  addPreviousMusicList,
} from "../../../../redux/Action/wavesurfer";
import environment from "../../../../environment";
import DisplayImage from "../../../../shared/components/displayImage/displayImage";

const AudioPlayerCard = ({
  musicList,
  PreviousMusicList,
  title,
  image,
  veritcal = true,
  isLock = false,
  index,
  previousIndex,
  isPlay,
  myPlayerIndex,
  activePlayerIndex,
  inActivePlayerIndex,
  isPlaylist,
  handlePlaylist,
}) => {
  const dispatch = useDispatch();
  const onPlay = () => {
    if (PreviousMusicList.length) {
      dispatch(
        pauseMusic({
          musicList: PreviousMusicList,
          index: previousIndex,
          activePlayerIndex: inActivePlayerIndex,
        })
      );
    }
    if (myPlayerIndex !== activePlayerIndex) {
      dispatch(addMusicList({ musicList, activePlayerIndex: myPlayerIndex }));
      dispatch(addPreviousMusicList(musicList));
    }
    dispatch(selectedMusicIndex(index));
    dispatch(playMusic({ musicList, index, activePlayerIndex: myPlayerIndex }));
  };
  const onPause = () => {
    dispatch(
      pauseMusic({ musicList, index, activePlayerIndex: myPlayerIndex })
    );
  };
  const handlePlaylistClick = () => {
    isPlaylist && handlePlaylist();
  };
  return (
    <div
      onClick={handlePlaylistClick}
      className={`${Style.container} text-truncate ${isPlaylist ? "cursor-pointer" : ""}`}
    >
      <div
        className={` d-flex justify-content-center align-items-center ${Style.imageContainer}`}
      >
        <div
          className={`rounded-circle ${Style.firstCircle} 
                    ${
                      veritcal
                        ? Style.verticalFirstcircle
                        : Style.horizontalFirstCircle
                    } `}
        >
          <div className={`rounded-circle ${Style.secondCircle}`}>
            <div className={`rounded-circle ${Style.thirdCircle}`}>
              <DisplayImage
                imageUrl={environment.serverUrl + image}
                className={`${Style.image}`}
                playlistImage={true}
              />
              {/* <img
                src={environment.imageUrl + image}
                className={`${Style.image}`}
              /> */}
              { !isPlaylist && (
                <div className={`${Style.play}`}>
                  {/* {isPlay?<PauseButton onClick={onPause}/>:<PlayButton onClick={onPlay}/> } */}
                  {isPlay ? (
                    <img src={wave} width="30px" />
                  ) : (
                    <PlayButton onClick={onPlay} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {isLock && (
          <div className={`${Style.lockIcon}`}>
            <LockIcon height={30} width={30} />
          </div>
        )}
      </div>
      <span>{title}</span>
    </div>
  );
};
export default AudioPlayerCard;
