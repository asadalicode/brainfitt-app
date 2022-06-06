import { useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "../../../../shared/components/spinner/spinner";
import { handleToastMessage } from "../../../../shared/js/handleToastMessage";
import { addAudioInPlaylistAPICall } from "../../dashboardService/boost";
import Style from "./playlistItem.module.scss";

const PlaylistItem = ({ playList }) => {
  const musicList = useSelector((state) => state.musicList);
  const activeAudioIndex = useSelector((state) => state.musicIndex);
  const [isLoading, setIsLoading] = useState(false);

  const addAudioInPlaylist = async (playlistId) => {
    let _audioId = musicList?.activePlaylistArray?.[activeAudioIndex]?.id;
    setIsLoading(true);
    let _isSuccess = await addAudioInPlaylistAPICall(playlistId, _audioId);
    setIsLoading(false);
    if (_isSuccess) {
      handleToastMessage("success", "Audio successfully add in playlist.");
    }
  };

  return (
    <>
      <span
        className={`d-flex justify-content-between mb-2 align-items-center cursor-pointer ${Style.createPlaylist}`}
      >
        <span className="ms-2 text-truncate">{playList.title}</span>
        {!isLoading ? (
          <u
            onClick={() => addAudioInPlaylist(playList.id)}
            className="me-2 cursor-pointer"
          >
            Add
          </u>
        ) : (
          <div className="me-2">
            <Spinner isWhite={true} />
          </div>
        )}
      </span>
    </>
  );
};
export default PlaylistItem;
