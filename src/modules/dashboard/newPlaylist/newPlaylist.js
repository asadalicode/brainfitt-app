import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import Style from "./newPlaylist.module.scss";
import InputField from "../../../shared/components/inputField/inputField";
import { ReactComponent as AddRoundedIcon } from "../../../assets/images/addRoundedIcon.svg";
import { ReactComponent as Close } from "../../../assets/images/x.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addAudioInPlaylistAPICall,
  addNewPlaylistAPICall,
  getYourPlaylistAPICall,
} from "../dashboardService/boost";
import { Spinner } from "../../../shared/components/spinner/spinner";
import PlaylistItem from "./playlistItem/playlistItem";
import CustomButton from "../../../shared/components/customButton/customButton";
import {
  addYourPlaylistCount,
  addAudiosCount,
} from "../../../redux/Action/wavesurfer";

const NewPlaylist = ({ isOpen, setIsOpen, isFavorite }) => {
  const [isCreate, setIsCreate] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [playListLoading, setPlaylistLoading] = useState(false);
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);
  const [playlistArray, setPlaylistArray] = useState([]);
  const musicList = useSelector((state) => state.musicList);
  const activeAudioIndex = useSelector((state) => state.musicIndex);
  const yourPlaylistCount = useSelector((state)=>state.yourPlaylistCount);
  const dispatch = useDispatch();

  useEffect(async () => {
    getYourPlaylist();
  }, []);
  useEffect(() => {
    setIsPlaylistVisible(isFavorite);
  }, [isFavorite]);
  const getYourPlaylist = async () => {
    setPlaylistLoading(true);
    let _response = await getYourPlaylistAPICall();
    setPlaylistLoading(false);
    if (_response.yourPlaylist.length > 0) {
      let _playList = _response.yourPlaylist.map((playlist) => {
        return {
          id: playlist.id,
          title: playlist.title,
        };
      });

      setIsPlaylistVisible(true);
      setPlaylistArray(_playList);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsCreate(false);
    setIsPlaylistVisible(false);
    dispatch(addYourPlaylistCount(++yourPlaylistCount));
    dispatch(addAudiosCount(true));
  };
  const handleCreate = () => {
    setIsCreate(true);
    setIsPlaylistVisible(false);
  };
  const onsubmit = async () => {
    let _audioId = musicList?.activePlaylistArray?.[activeAudioIndex]?.id;
    setIsLoading(true);
    let _isSuccess = await addNewPlaylistAPICall(playlistName, _audioId);
    setIsLoading(false);
    if (_isSuccess) {
      setIsCreate(false);
      setIsPlaylistVisible(true);
      getYourPlaylist();
    }
  };
  const handleChange = (value) => {
    setPlaylistName(value);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className={Style.dialog}
        PaperProps={{
          style: {
            backgroundColor: "rgb(255 255 255 / 40%)",
            backdropFilter: "blur(1px)",
            width: 375,
            minHeight: 150,
            borderRadius: 15,
          },
        }}
      >
        <div className={Style.container}>
          <DialogTitle>
            <div className={Style.title}>
              <div>{isFavorite ? "Add to favorite" : "New Playlist"}</div>
              <div className={Style.closeIcon} onClick={handleClose}>
                <Close height={20} />
              </div>
            </div>
          </DialogTitle>
          {!isFavorite && (
            <span
              className={`d-flex justify-content-center mb-2 align-items-center cursor-pointer ${Style.createPlaylist}`}
              onClick={handleCreate}
            >
              <AddRoundedIcon height={20} />
              Create Playlist
            </span>
          )}

          {isCreate ? (
            <div className={Style.inputField}>
              <InputField
                placeholder={"Enter Playlist Name"}
                inputStyle={Style.inputFieldColor}
                onChange={handleChange}
              />
            </div>
          ) : null}
          <div className="d-flex justify-content-center">
            {playListLoading ? (
              <Spinner />
            ) : isFavorite && playlistArray.length === 0 ? (
              <span>Create playlist first</span>
            ) : null}
          </div>
          {isPlaylistVisible
            ? playlistArray?.map((playList) => (
                <PlaylistItem playList={playList} />
              ))
            : null}
          {isCreate ? (
            <DialogActions>
              <div className={Style.buttonStyle}>
                <CustomButton
                  type="button"
                  title="Create"
                  isLoading={isLoading}
                  handleButtonClick={onsubmit}
                />
              </div>
            </DialogActions>
          ) : null}
        </div>
      </Dialog>
    </div>
  );
};

export default NewPlaylist;
