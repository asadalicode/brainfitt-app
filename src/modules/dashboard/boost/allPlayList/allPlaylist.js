import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "../../../../shared/components/spinner/spinner";
import { playListCategoryEnum } from "../../../../shared/js/enums";
import { getYourPlaylistAPICall } from "../../dashboardService/boost";
import AudioPlayerCard from "../audioPlayerCard/audioPlayerCard";
import Style from "./allPlaylist.module.scss";

const pageSize = 10;

const AllPlaylist = ({
  playListIndicator,
  handleAudioFromPlaylist,
  searchText,
}) => {
  const [yourPlaylist, setYourPlaylist] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [paginationOffset, setPaginationOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const musicList = useSelector((state) => state.musicList);
  const PreviousMusicList = useSelector((state) => state.PreviousMusicList);
  const previousMusicIndex = useSelector((state) => state.previousMusicIndex);
  const inActivePlayerIndex = useSelector((state) => state.inActivePlayerIndex);
  const yourPlaylistCount = useSelector((state) => state.yourPlaylistCount)

  useEffect(async () => {
    let _flag =
      paginationOffset === 0 ? true : totalRecord > yourPlaylist.length;
    if (_flag) {
      if (playListIndicator === playListCategoryEnum.yourPlaylist) {
        await getYourPlaylist(pageSize, paginationOffset, searchText);
      }
    }
  }, [playListIndicator, paginationOffset, searchText]);
  
  useEffect(async () => {
      await getYourPlaylist(pageSize, paginationOffset, searchText);
  }, [yourPlaylistCount]);

  const getYourPlaylist = async (limit, offset, searchField = "") => {
    setIsLoading(true);
    let _result = await getYourPlaylistAPICall(limit, offset, searchField);
    setIsLoading(false);
    if (_result.isSuccess) {
      let _yourPlaylist =
        offset === 0
          ? [..._result.yourPlaylist]
          : [...yourPlaylist, ..._result.yourPlaylist];

      setYourPlaylist([..._yourPlaylist]);
      setTotalRecord(_result.count);
    }
  };
  const handleAudioInPlaylist = (playlistId, playlistTitle) => {
    handleAudioFromPlaylist?.(playlistId, playlistTitle, playListIndicator);
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
      {!isLoading ? 
      (yourPlaylist.length ? (
        <div
          onScroll={scrollListner}
          className={`d-flex flex-wrap mt-5 ${Style.container}`}
        >
          {yourPlaylist.map((playList, i) => (
            <div key={i} className={`${Style.playListCard} mb-3`}>
              <AudioPlayerCard
                musicList={yourPlaylist}
                PreviousMusicList={PreviousMusicList}
                inActivePlayerIndex={inActivePlayerIndex}
                activePlayerIndex={musicList.activePlayerIndex}
                previousIndex={previousMusicIndex}
                index={i}
                myPlayerIndex={playListIndicator}
                title={playList.title}
                isLock={playList.isLock}
                image={playList.imageUrl}
                veritcal={false}
                isPlaylist={true}
                handlePlaylist={() =>
                  handleAudioInPlaylist(playList.id, playList.title)
                }
              />
            </div>
          ))}
        </div>
      ):
        <div className={Style.emptyList}>
          <p>No Audio is Available in the playlist.</p>
        </div>):
        <div className={Style.spiner} >
          <Spinner isWhite />
        </div>
      }
    </>
  );
};
export default AllPlaylist;
