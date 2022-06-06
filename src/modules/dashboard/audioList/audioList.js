import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAudiosCount } from "../../../redux/Action/wavesurfer";
import { Spinner } from "../../../shared/components/spinner/spinner";
import { playListCategoryEnum } from "../../../shared/js/enums";
import AudioPlayerCard from "../boost/audioPlayerCard/audioPlayerCard";
import {
  getSingalCategoryAudiosAPICall,
  getSuggestedPlaylistAudiosAPICall,
  getYourPlaylistAudioAPICall,
} from "../dashboardService/boost";
import Style from "./audioList.module.scss";

const pageSize = 10;

const AudioList = ({ playlistId, playListIndicator, searchText }) => {
  const [audioList, setAudioList] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationOffset, setPaginationOffset] = useState(0);
  const musicList = useSelector((state) => state.musicList);
  const PreviousMusicList = useSelector((state) => state.PreviousMusicList);
  const previousMusicIndex = useSelector((state) => state.previousMusicIndex);
  const inActivePlayerIndex = useSelector((state) => state.inActivePlayerIndex);
  const audiosCount = useSelector((state) => state.audiosCount);
  const dispatch = useDispatch();

  useEffect(async () => {
    let _flag = paginationOffset === 0 ? true : totalRecord > audioList.length;
    if (_flag) {
      if (playListIndicator === playListCategoryEnum.yourPlaylist) {
        await getYourPlaylistAudios(pageSize, paginationOffset, searchText);
      } else if (playListIndicator === playListCategoryEnum.suggestedPlayList) {
        await getSuggestedPlayListAudios(
          pageSize,
          paginationOffset,
          searchText
        );
      } else if (playListIndicator === playListCategoryEnum.categoryAudios) {
        await getCategoriesAudio(pageSize, paginationOffset, searchText);
      }
    }
  }, [playListIndicator, paginationOffset, searchText]);

  useEffect(async () => {
    if (playListIndicator === playListCategoryEnum.yourPlaylist) {
      await getYourPlaylistAudios(pageSize, paginationOffset, searchText);
      dispatch(addAudiosCount(false));
    }
  }, [audiosCount]);

  const getYourPlaylistAudios = async (limit, offset, searchField) => {
    setIsLoading(true);
    let _response = await getYourPlaylistAudioAPICall(
      limit,
      offset,
      playlistId,
      searchField
    );
    setIsLoading(false);
    if (_response.isSuccess) {
      let _audioList =
        offset === 0
          ? [..._response.audioPlaylist]
          : [...audioList, ..._response.audioPlaylist];

      // setAudioList(_audioList);
      setAudioList(
        musicList.activePlayerIndex === playlistId
          ? musicList.activePlaylistArray
          : _audioList
      );
      setTotalRecord(_response.count);
    }
  };
  const getSuggestedPlayListAudios = async (limit, offset, searchField) => {
    setIsLoading(true);
    let _result = await getSuggestedPlaylistAudiosAPICall(
      limit,
      offset,
      searchField
    );
    setIsLoading(false);
    if (_result.isSuccess) {
      let _audioList =
        offset === 0
          ? [..._result.suggestedPlaylist]
          : [...audioList, ..._result.suggestedPlaylist];
      // setAudioList([..._audioList]);
      setAudioList(
        musicList.activePlayerIndex === playlistId
          ? musicList.activePlaylistArray
          : _audioList
      );
      setTotalRecord(_result.count);
    }
  };

  const getCategoriesAudio = async (limit, offset, searchField = "") => {
    setIsLoading(true);
    let _response = await getSingalCategoryAudiosAPICall(
      playlistId,
      offset,
      limit,
      searchField
    );
    setIsLoading(false);
    if (_response.isSuccess) {
      let _audioList =
        offset === 0
          ? [..._response.categoryAudiolist]
          : [...audioList, ..._response.categoryAudiolist];
      // setAudioList([..._audioList]);
      setAudioList(
        musicList.activePlayerIndex === playlistId
        ? musicList.activePlaylistArray
        : _audioList);
      setTotalRecord(_response.count);
    }
  };
  const scrollListner = (e) => {
    const scrolled =
      e.target.clientHeight + e.target.scrollTop + 10 > e.target.scrollHeight;
    if (scrolled) {
      !isLoading && setPaginationOffset((prev) => ++prev);
    }
  };

  return (
    <>
      {!isLoading ? (
        audioList.length ? (
          <div
            onScroll={scrollListner}
            className={`d-flex flex-wrap mt-5 ${Style.container}`}
          >
            {audioList.map((item, i) => (
              <div key={i} className={`${Style.playListCard} mb-3`}>
                <AudioPlayerCard
                  musicList={audioList}
                  PreviousMusicList={PreviousMusicList}
                  inActivePlayerIndex={inActivePlayerIndex}
                  activePlayerIndex={musicList.activePlayerIndex}
                  previousIndex={previousMusicIndex}
                  index={i}
                  myPlayerIndex={playlistId}
                  title={item.title}
                  isPlay={item.isPlay}
                  isLock={item.isLock}
                  image={item.image}
                  veritcal={false}
                  isPlaylist={false}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={Style.emptyList}>
            <p>No Audio is Available in the Playlist</p>
          </div>
        )
      ) : (
        <div className={Style.spiner}>
          <Spinner isWhite />
        </div>
      )}
    </>
  );
};
export default AudioList;
