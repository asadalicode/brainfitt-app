import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Style from "./boost.module.scss";
import { Toolbar } from "@mui/material";
import AudioPlayerCard from "./audioPlayerCard/audioPlayerCard";
import { ReactComponent as NoticationIcon } from "../../../assets/images/notification.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { ReactComponent as SearchIcon } from "../../../assets/images/search.svg";
import myMusic from "../../../assets/images/audioPlayer/testAudio.mp3";
import AudioList from "../audioList/audioList";
import { ReactComponent as LeftArrow } from "../../../assets/images/leftArrow.svg";
import WavesurferSingle from "../../../shared/components/player/wavesurferSingle";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as RightAngle } from "../../../assets/images/rightAngle.svg";
import {
  getAllCategoriesAPICall,
  getPopularAudiosAPICall,
  getSuggestedPlaylistAudiosAPICall,
  getYourPlaylistAPICall,
} from "../dashboardService/boost";
import AllPlaylist from "./allPlayList/allPlaylist";
import { playListCategoryEnum } from "../../../shared/js/enums";
import { Spinner } from "../../../shared/components/spinner/spinner";
import { getUserPlanStatus } from "../../auth/authService/authService";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3.8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2.8,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// const yourPlaylist = [
//   {
//     id: 0,
//     title: "Relaxing Audio",
//     image: image1,
//     isLock: false,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 1,
//   },
//   {
//     id: 1,
//     title: "Fitness Workout",
//     image: image1,
//     isLock: false,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 1,
//   },
//   {
//     id: 10,
//     title: "Reduce Stress",
//     image: image1,
//     isLock: false,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 1,
//   },
//   {
//     id: 3,
//     title: "Reduce Tension",
//     image: image1,
//     isLock: false,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 1,
//   },
// ];

// const suggestedPlaylist = [
//   {
//     id: 0,
//     image: image2,
//     title: "Fall Asleep",
//     isLock: false,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 2,
//   },
//   {
//     id: 1,
//     image: image2,
//     title: "Water Fall",
//     isLock: true,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 2,
//   },
//   {
//     id: 2,
//     image: image2,
//     title: "Morning",
//     isLock: false,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 2,
//   },
//   {
//     id: 3,
//     image: image2,
//     title: "Morning",
//     isLock: false,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 2,
//   },
// ];

// const popularAudios = [
//   {
//     id: 0,
//     image: image3,
//     title: "Self Growth",
//     isLock: false,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 3,
//   },
//   {
//     id: 1,
//     image: image3,
//     title: "Water Fall",
//     isLock: false,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 3,
//   },
//   {
//     id: 2,
//     image: image3,
//     title: "Aurara",
//     isLock: false,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 3,
//   },
//   {
//     id: 3,
//     image: image3,
//     title: "Aurara",
//     isLock: false,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 3,
//   },
//   {
//     id: 4,
//     image: image3,
//     title: "Aurara",
//     isLock: false,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 3,
//   },
// ];

// const categories = [
//   {
//     id: 0,
//     image: image4,
//     title: "Self Growth",
//     isLock: true,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 4,
//   },
//   {
//     id: 1,
//     image: image4,
//     title: "Water Fall",
//     isLock: true,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 4,
//   },
//   {
//     id: 2,
//     image: image4,
//     title: "Aurara",
//     isLock: true,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 4,
//   },
//   {
//     id: 3,
//     image: image4,
//     title: "Aurara",
//     isLock: true,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 4,
//   },
//   {
//     id: 4,
//     image: image4,
//     title: "Self Growth",
//     isLock: true,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 4,
//   },
//   {
//     id: 5,
//     image: image4,
//     title: "Water Fall",
//     isLock: true,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 4,
//   },
//   {
//     id: 6,
//     image: image4,
//     title: "Aurara",
//     isLock: true,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 4,
//   },
//   {
//     id: 7,
//     image: image4,
//     title: "Aurara",
//     isLock: true,
//     music: myMusic,
//     isPlay: false,
//     myPlayerIndex: 4,
//   },
// ];

const categoriesPageSize = 10;
const Boost = ({ isGuest = false }) => {
  const musicList = useSelector((state) => state.musicList);
  const PreviousMusicList = useSelector((state) => state.PreviousMusicList);
  const previousMusicIndex = useSelector((state) => state.previousMusicIndex);
  const inActivePlayerIndex = useSelector((state) => state.inActivePlayerIndex);
  const yourPlaylistCount = useSelector((state) => state.yourPlaylistCount);

  const [isMobileTab, setIsMobileTab] = useState(false);
  const [isShowPlaylist, setIsShowPlaylist] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  const [yourPlaylist, setYourPlaylist] = useState([]);
  const [suggestedPlaylist, setSuggestedPlaylist] = useState([]);
  const [popularAudios, setPopularAudios] = useState([]);
  const [categories, setCategories] = useState([]);
  const [yourPlaylistLoader, setYourPlaylistLoader] = useState(true);
  const [suggestedPlaylistLoader, setSuggestedPlaylistLoader] = useState(true);
  const [popularAudiosLoader, setPopularAudiosLoader] = useState(true);
  const [categoriesLoader, setCategoriesLoader] = useState(true);
  const [averageSleepTime, setAverageSleepTime] = useState(0);
  const { state } = useLocation();
  const { key } = state || {};

  useEffect(() => {
    handleCloseAllAudio();
  }, [key]);

  useEffect(async () => {
    let _averageSleep = await getUserPlanStatus()
    if(_averageSleep.isSuccess){
      let time = _averageSleep.averageSleepTime
      let timeArray = time?.split(':',2)
      timeArray[0]=timeArray[0]+' h '
      timeArray[1]=timeArray[1]+' min '
      setAverageSleepTime(timeArray)
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize());
  }, []);

  const handleResize = () => {
    setIsMobileTab(window.innerWidth <= 850);
  };

  useEffect(() => {}, [musicList]);
  const [yourPlaylistAudios, setYourPlaylistAudios] = useState([]);
  const [allAudioList, setAllAudioList] = useState([]);
  const [appBarTitle, setAppBarTitle] = useState("");
  const [categoryOffset, setCategoryOffset] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [isAllAudioVisible, setIsAllAudioVisible] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [isPlaylistAudioVisible, setIsPlaylistAudioVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(async () => {
    if (!isGuest) {
      await getYourPlaylist(5, 0);
    }
  }, [yourPlaylistCount]);

  useEffect(async () => {
    await getSuggestedPlayListAudios(5, 0);
  }, []);

  useEffect(async () => {
    await getPopularAudioList(5, 0);
  }, []);

  useEffect(async () => {
    let _flag =
      categoryOffset === 0 ? true : totalCategories > categories.length;
    if (_flag) {
      await getCategoiresList(categoriesPageSize, categoryOffset, searchText);
    }
  }, [categoryOffset]);

  const getYourPlaylist = async (limit, offset, searchField = "") => {
    let _result = await getYourPlaylistAPICall(limit, offset, searchField);
    setYourPlaylistLoader(false);
    if (_result.isSuccess) {
      setYourPlaylist(_result.yourPlaylist);
      // setYourPlaylist(musicList.activePlayerIndex ===_result.playListId  ? musicList.activePlaylistArray : _result.yourPlaylist);
    }
  };

  const getSuggestedPlayListAudios = async (
    limit,
    offset,
    searchField = ""
  ) => {
    let _result = await getSuggestedPlaylistAudiosAPICall(
      limit,
      offset,
      searchField
    );
    setSuggestedPlaylistLoader(false);
    if (_result.isSuccess) {
      setSuggestedPlaylist(
        musicList.activePlayerIndex === _result.playListId
          ? musicList.activePlaylistArray
          : _result.suggestedPlaylist
      );
    }
  };

  const getPopularAudioList = async (limit, offset, searchField = "") => {
    let _result = await getPopularAudiosAPICall(limit, offset, searchField);
    setPopularAudiosLoader(false);
    if (_result.isSuccess) {
      setPopularAudios(
        musicList.activePlayerIndex === _result.playListId
          ? musicList.activePlaylistArray
          : _result.popularAudiolist
      );
    }
  };

  const getCategoiresList = async (limit, offset, searchField = "") => {
    setIsCategoriesLoading(true);
    let _result = await getAllCategoriesAPICall(limit, offset, searchField);
    setCategoriesLoader(false);
    if (_result.isSuccess) {
      let _categorylist =
        offset === 0
          ? [..._result.categorylist]
          : [...categories, ..._result.categorylist];
      setCategories([..._categorylist]);
      setTotalCategories(
        musicList.activePlayerIndex === _result.playListId
          ? musicList.activePlaylistArray
          : _result.count
      );
    }
  };

  const handleShowPlaylist = (selectedPlaylist, title) => {
    setSelectedPlaylist(selectedPlaylist);
    setAppBarTitle(title);
    setSearchText("");
    setIsShowPlaylist(true);
  };

  const handleYourPlayListAudios = async (playListId, title) => {
    setIsAllAudioVisible(true);
    setSearchText("");
    setAppBarTitle(title);
    setSelectedPlaylist(playListCategoryEnum.yourPlaylist);
    setSelectedPlaylistId(playListId);
  };
  const handleSeeAllSuggestedPlaylist = () => {
    setIsAllAudioVisible(true);
    setSearchText("");
    setAppBarTitle("Suggested playlist");
    setSelectedPlaylist(playListCategoryEnum.suggestedPlayList);
    setSelectedPlaylistId(playListCategoryEnum.suggestedPlayList);
  };

  const handleSingleCategoryAudio = async (categoryId, title) => {
    setIsAllAudioVisible(true);
    setSearchText("");
    setAppBarTitle(title);
    setSelectedPlaylist(playListCategoryEnum.categoryAudios);
    setSelectedPlaylistId(categoryId);
  };

  const handleCloseAllAudio = () => {
    if (isPlaylistAudioVisible) {
      setIsPlaylistAudioVisible(false);
      handleShowPlaylist(playListCategoryEnum.yourPlaylist, "Your playlist");
      setIsAllAudioVisible(false);
      return;
    }
    setIsAllAudioVisible(false);
    setIsShowPlaylist(false);
    setSearchText("");
    getYourPlaylist(5, 0);
    getSuggestedPlayListAudios(5, 0);
    getPopularAudioList(5, 0);
    setCategoryOffset(0);
  };
  const handleNotification = () => {
    navigate("/dashboard/notification");
  };

  const handleAudioFromPlaylist = (
    playlistId,
    playlistTitle,
    playlistIndicator
  ) => {
    setIsPlaylistAudioVisible(true);
    setSelectedPlaylist(playlistIndicator);
    setSelectedPlaylistId(playlistId);
    setAppBarTitle(playlistTitle);
    setIsAllAudioVisible(true);
    setSearchText("");
    setIsShowPlaylist(false);
  };
  const scrollListner = (e) => {
    const scrolled =
      e.target.clientHeight + e.target.scrollTop + 10 > e.target.scrollHeight;
    if (scrolled) {
      !isCategoriesLoading &&
        !isAllAudioVisible &&
        !isShowPlaylist &&
        totalCategories > categories.length &&
        setCategoryOffset((prev) => ++prev);
    }
  };

  const handleSearchInput = (e) => {
    let _text = e.target.value;
    setSearchText(_text);
    if (!isAllAudioVisible && !isShowPlaylist) {
      getYourPlaylist(5, 0, _text);
      getSuggestedPlayListAudios(5, 0, _text);
      getPopularAudioList(5, 0, _text);
      setCategoryOffset(0);
      getCategoiresList(10, 0, _text);
    }
  };

  return (
    <div className={`${!isMobileTab ? Style.outletContainer : ""}`}>
      <div
        className={` d-flex justify-content-between ${Style.appBarContainer}`}
      >
        <div className={`d-flex align-items-center ${Style.appBarContent}`}>
          {(isShowPlaylist || isAllAudioVisible) && (
            <>
              <span onClick={handleCloseAllAudio} className="cursor-pointer">
                <LeftArrow width={35} fill={"white"} />
              </span>
              <h5 className={`m-0 ${Style.title}`}>{appBarTitle}</h5>
            </>
          )}
        </div>
        <div
          className={`d-flex align-items-center justify-content-end ${Style.rightPortion}`}
        >
          {(isAllAudioVisible || isShowPlaylist) && (
            <Input
              placeholder="Title, artist or topic"
              className={`${Style.input}`}
              value={searchText}
              onChange={handleSearchInput}
              startAdornment={
                <InputAdornment
                  position="start"
                  className={`${Style.inputAdorment}`}
                >
                  <SearchIcon height={20} width={20} />
                </InputAdornment>
              }
            />
          )}
          {!isGuest && (
            <NoticationIcon onClick={handleNotification} height={30} />
          )}
        </div>
      </div>
      <div
        onScroll={scrollListner}
        className={`container-fluid ${Style.boostContainer}`}
      >
        {!(isShowPlaylist || isAllAudioVisible) && (
          <>
            <div className={`${Style.contentContainer} mb-4 mx-auto`}>
              <div className={`${Style.mediaPlayerBox} position-relative`}>
                <div className={`${Style.mediaPlayer} position-relative`}>
                  <div className="mt-5">
                    {suggestedPlaylist?.length > 0 && (
                      <WavesurferSingle
                        dashboardHomeMusic={suggestedPlaylist?.[0].music}
                        progressbar={0}
                        cursor={0}
                        boost={false}
                      />
                    )}
                    {/* <PlayButton height='45' /> */}
                  </div>
                </div>
                <Toolbar className={`justify-content-between`}>
                  <div className={`${Style.timer}`}>
                    {/* <span>00:10:00</span> */}
                  </div>
                  <div>
                    <span>Recommended Playlist</span>
                  </div>
                </Toolbar>
              </div>
              <Toolbar className={`justify-content-between`}>
              {averageSleepTime ?
                (<><div>
                    <span>Average Sleep Time</span>
                </div>
                <div>
                    <span>{averageSleepTime}</span>
                </div></>) : null}
              </Toolbar>
            </div>

            {!isGuest && (
              <div className={`${Style.playlist}`}>
                <Toolbar className="justify-content-between">
                  <h5>Your playlist</h5>
                  <span
                    onClick={() =>
                      handleShowPlaylist(
                        playListCategoryEnum.yourPlaylist,
                        "Your playlist"
                      )
                    }
                    className="cursor-pointer"
                  >
                    See All
                    <RightAngle height={24} width={30} />
                  </span>
                </Toolbar>
                {!yourPlaylistLoader &&
                  (yourPlaylist.length ? (
                    <Carousel
                      responsive={responsive}
                      containerClass={Style.playListCarousel}
                      showDots={false}
                      swipeable={true}
                      removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
                    >
                      {yourPlaylist.map((item, i) => {
                        return (
                          <div key={i} className={Style.playListCard}>
                            <AudioPlayerCard
                              musicList={yourPlaylist}
                              PreviousMusicList={PreviousMusicList}
                              inActivePlayerIndex={inActivePlayerIndex}
                              activePlayerIndex={musicList.activePlayerIndex}
                              previousIndex={previousMusicIndex}
                              index={i}
                              myPlayerIndex={1}
                              title={item.title}
                              isLock={item.isLock}
                              image={item.imageUrl}
                              veritcal={false}
                              isPlaylist={true}
                              handlePlaylist={() =>
                                handleYourPlayListAudios(item.id, item.title)
                              }
                            />
                          </div>
                        );
                      })}
                    </Carousel>
                  ) : (
                    <div className={Style.emptyList}>
                      No Audio is Available in the Playlist
                    </div>
                  ))}
                {yourPlaylistLoader && (
                  <div className={Style.spiner}>
                    <Spinner isWhite />
                  </div>
                )}
              </div>
            )}

            <div className={`${Style.playlist} mt-4`}>
              <Toolbar className="justify-content-between">
                <h5>Suggested Playlist</h5>
                <span
                  onClick={handleSeeAllSuggestedPlaylist}
                  className="cursor-pointer"
                >
                  See All
                  <RightAngle height={24} width={30} />
                </span>
              </Toolbar>
              {!suggestedPlaylistLoader &&
                (suggestedPlaylist.length ? (
                  <Carousel
                    responsive={responsive}
                    containerClass={Style.playListCarousel}
                    showDots={false}
                    swipeable={true}
                    removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
                  >
                    {suggestedPlaylist.map((item, i) => {
                      return (
                        <div key={i} className={Style.playListCard}>
                          <AudioPlayerCard
                            musicList={suggestedPlaylist}
                            PreviousMusicList={PreviousMusicList}
                            inActivePlayerIndex={inActivePlayerIndex}
                            activePlayerIndex={musicList.activePlayerIndex}
                            previousIndex={previousMusicIndex}
                            index={i}
                            myPlayerIndex={item.myPlayerIndex}
                            isPlay={item.isPlay}
                            title={item.title}
                            isLock={item.isLock}
                            image={item.image}
                            veritcal={false}
                            isPlaylist={false}
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                ) : (
                  <div className={Style.emptyList}>
                    No Audio is Available in the Playlist
                  </div>
                ))}
              {suggestedPlaylistLoader && (
                <div className={Style.spiner}>
                  <Spinner isWhite />
                </div>
              )}
            </div>

            <div className={`${Style.playlist} mt-4`}>
              <Toolbar className="justify-content-between">
                <h5>Popular Audios</h5>
              </Toolbar>
              {!popularAudiosLoader &&
                (popularAudios.length ? (
                  <Carousel
                    responsive={responsive}
                    containerClass={Style.playListCarousel}
                    showDots={false}
                    swipeable={true}
                    removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
                  >
                    {popularAudios.map((item, i) => {
                      return (
                        <div key={i} className={Style.playListCard}>
                          <AudioPlayerCard
                            musicList={popularAudios}
                            PreviousMusicList={PreviousMusicList}
                            activePlayerIndex={musicList.activePlayerIndex}
                            previousIndex={previousMusicIndex}
                            index={i}
                            myPlayerIndex={item.myPlayerIndex}
                            isPlay={item.isPlay}
                            title={item.title}
                            isLock={item.isLock}
                            image={item.image}
                            veritcal={false}
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                ) : (
                  <div className={Style.emptyList}>
                    No Audio is Available in the Playlist
                  </div>
                ))}
              {popularAudiosLoader && (
                <div className={Style.spiner}>
                  <Spinner isWhite />
                </div>
              )}
            </div>

            <div className="mt-5 mb-5">
              <Toolbar className="justify-content-between">
                <h5>All Categories</h5>
              </Toolbar>
              {!categoriesLoader &&
                (categories.length ? (
                  <div
                    className={`d-flex flex-wrap ${Style.categoriesContainer}`}
                  >
                    {categories.map((item, i) => (
                      <div key={i} className={`${Style.playListCard} mb-3`}>
                        <AudioPlayerCard
                          musicList={categories}
                          PreviousMusicList={PreviousMusicList}
                          activePlayerIndex={musicList.activePlayerIndex}
                          previousIndex={previousMusicIndex}
                          index={i}
                          myPlayerIndex={item.myPlayerIndex}
                          isPlay={item.isPlay}
                          title={item.name}
                          isLock={false}
                          isPlaylist={true}
                          image={item.imageUrl}
                          handlePlaylist={() =>
                            handleSingleCategoryAudio(item.id, item.name)
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={Style.emptyList}>
                    No Audio is Available in the Playlist
                  </div>
                ))}
              {categoriesLoader && (
                <div className={Style.spiner}>
                  <Spinner isWhite />
                </div>
              )}
            </div>
          </>
        )}

        {isShowPlaylist && (
          <AllPlaylist
            playListIndicator={selectedPlaylist}
            handleAudioFromPlaylist={handleAudioFromPlaylist}
            searchText={searchText}
          />
        )}
        {isAllAudioVisible && (
          <AudioList
            playlistId={selectedPlaylistId}
            playListIndicator={selectedPlaylist}
            searchText={searchText}
          />
        )}
      </div>
    </div>
  );
};
export default Boost;
