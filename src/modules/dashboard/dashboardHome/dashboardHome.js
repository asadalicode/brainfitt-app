import { Toolbar, Box, Container } from "@mui/material";
import Style from "./dashboardHome.module.scss";
import { useState, useEffect } from "react";
import { ReactComponent as ClockIcon } from "../../../assets/images/dashboardModule/home/clock.svg";
import { ReactComponent as FrequencyIcon } from "../../../assets/images/dashboardModule/home/frequency.svg";
import { ReactComponent as GrowthGraphIcon } from "../../../assets/images/dashboardModule/home/growthGraph.svg";
import { LineChart } from "../../../shared/components/charts/lineChart/lineChart";
import { BarChart } from "../../../shared/components/charts/barChart/barChart";
import ContainerHeader from "./containerHeader/containerHeader";
import { ReactComponent as NoticationIcon } from "../../../assets/images/sidebar/notification.svg";
import myMusic from "../../../assets/images/audioPlayer/testAudio.mp3";
import WavesurferSingle from "../../../shared/components/player/wavesurferSingle";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import DashboardHomePopup from '../dashboardHomePopup/dashboardHomePopup';
import { getHappinessScoreAPICall, getMyActivityAPICall, getSummaryStatsAPICall } from '../dashboardService/dashboard';
import { updateFirebaseUserStatus } from "../../chat/services/chat";
import SadIcon from '../../../assets/images/dashboardModule/home/sad.svg';
import HappyIcon from '../../../assets/images/dashboardModule/home/happy.svg';
import { getSuggestedPlaylistAudiosAPICall } from '../dashboardService/boost';
import { getUserPlanStatus } from "../../auth/authService/authService";
let sadEmoji = new Image(35, 35);
sadEmoji.src = SadIcon;

let happyEmoji = new Image(35, 35);
happyEmoji.src = HappyIcon;
const DashboardHome = () => {
    const [isMobileTab, setIsMobileTab] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [myActivity, setMyActivity] = useState([]);
    const [summaryStats, setSummaryStats] = useState([]);
    const [happinessLabel, setHappinessLabel]=useState([])
    const [happinessGraphData, setHappinessGraphData]=useState([])
    const [emojisIcon, setEmojisIcon]=useState([])
    const [emojisIndex, setEmojisIndex]=useState([])
    const [suggestedPlaylist, setSuggestedPlaylist] = useState([]);
    const [averageSleepTime, setAverageSleepTime] = useState(0);
    const isMusicActive = useSelector(state => state.musicList).activePlayerIndex;
    const navigate = useNavigate();

  useEffect(() => {
    updateFirebaseUserStatus(true);
  }, []);

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

      useEffect(async () => {
        let _result = await getSuggestedPlaylistAudiosAPICall(1, 0);
        if(_result.isSuccess){
            setSuggestedPlaylist(_result.suggestedPlaylist )
        }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize());
  }, []);

    const handleResize = () => {
        setIsMobileTab(window.innerWidth <= 850);
    }
    const handleNotication = () => {
        navigate("/dashboard/notification");
    }
    const onClickPopup = () => {
        setIsOpen(true)
    }
    const onSetHappinessScore = (happinessScore) => {
            let _labels = []
            let _data = []
            happinessScore && happinessScore.map((data) => {
                // _labels.push(data.date)
                _labels.push('')
                _data.push(data.score)
            })
            // setHappinessLabel(_labels)
            // setHappinessGraphData(_data)
    
            let _max = Math.max(..._data);
            let _min = Math.min(..._data);
            let _maxIndex = _data.indexOf(_max);
            let _minIndex = _data.indexOf(_min);
            _maxIndex+=1
            _minIndex+=1
            let minMaxIndex = [_minIndex, _maxIndex]
            let _emojisArray = new Array(_data.length+1).fill(null);
            if(_min<0 && _max<0){
              _emojisArray[_maxIndex]= happyEmoji
              _emojisArray[_minIndex]= sadEmoji
            }else{
              _emojisArray[_minIndex]= sadEmoji
              _emojisArray[_maxIndex]= happyEmoji
            }
            setEmojisIndex(minMaxIndex)
            setEmojisIcon(_emojisArray)
            _labels.length && _labels.unshift('')
            _data.length && _data.unshift(0)
            setHappinessLabel(_labels)
            setHappinessGraphData(_data)
        }


    const handleChangeFilter = async  (filter, mode) => {
        if(filter){
            let _score;
            switch (mode) {
                case 'summary':
                    _score = await getSummaryStatsAPICall(filter)
                    if(_score.success){
                        setSummaryStats (_score?.data)
                    }
                    break;
                case 'happiness':
                    _score = await getHappinessScoreAPICall(filter)
                    if(_score.success){
                        onSetHappinessScore(_score?.data)
                    }
                    break;
                case 'activity':
                    _score = await getMyActivityAPICall(filter)
                    if(_score.success){
                        setMyActivity (_score?.data)
                    }
                    break;
                    default:
                      break;
                  }
                }
              };
    return (
        <div className={`${!isMobileTab ? Style.outletContainer : ''}`}>
            {
                isMobileTab &&
                <div className={`d-flex justify-content-end ${Style.appBarContainer}`}>
                    <div className={`d-flex  ${Style.appBar}`}>
                        <h2 className='mt-3'>Home</h2>
                        <div onClick={handleNotication}>
                            <NoticationIcon />
                        </div>
                    </div>
                </div>
            }
            <DashboardHomePopup
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            />
            <div className={`container-fluid ${isMusicActive ? Style.mainContainerPadding : ''}
                  ${Style.mainContainer} ${isMobileTab ? Style.mainContainerHeight : ''} `}>
                <div className='row pl-4'>
                    <div className='col-lg-7 col-md-12 col-sm-12 '>
                        <div className={`${Style.contentContainer} mb-4`}>
                            <div className={`${Style.mediaPlayerBox} position-relative`}>
                                <div className={`${Style.mediaPlayer} position-relative`}>
                                    <div className='mt-5'>
                                    {suggestedPlaylist?.length > 0 && (
                                        <WavesurferSingle
                                            dashboardHomeMusic={suggestedPlaylist?.[0]?.music }
                                            progressbar={0}
                                            cursor={0}
                                            isHome={true}
                                        />
                                    )}
                                        {/* <PlayButton height='45' /> */}
                                    </div>
                                </div>
                                <Toolbar className={`justify-content-between`}>
                                    <div className={`${Style.timer}`}>
                                        {/* <span>{currentTime}</span> */}
                                    </div>
                                    <div>
                                        <span onClick={onClickPopup}>Recommended Playlist</span>
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
                                </div></>): null}
                            </Toolbar>
                        </div>


            <div
              className={`${Style.contentContainer} ${Style.statisticData} d-flex flex-column justify-content-between mb-3 p-3`}
            >
              <ContainerHeader
                title={"Summary Stats"}
                mode={"summary"}
                handleChangeFilter={handleChangeFilter}
              />
              <Container>
                <Box
                  className={`d-flex justify-content-between text-center mb-2`}
                >
                  <Box sx={{ width: "31%" }}>
                    <Box
                      className={`${Style.summaryBox} p-3 d-flex align-items-center  flex-column`}
                    >
                      <FrequencyIcon className={`${Style.icon}`} />
                      <span className="mt-2 mb-2">Frequency</span>
                      <h5>{summaryStats.frequency}</h5>
                    </Box>
                  </Box>
                  <Box sx={{ width: "31%" }}>
                    <Box
                      className={`${Style.summaryBox} ${Style.growthGraph} p-3 d-flex align-items-center flex-column`}
                    >
                      <GrowthGraphIcon className={`${Style.icon}`} />
                      <span className="mt-2 mb-2">Reqularity</span>
                      <h5>{summaryStats.regularity} %</h5>
                    </Box>
                  </Box>
                  <Box sx={{ width: "31%" }}>
                    <Box
                      className={`${Style.summaryBox} p-3 d-flex align-items-center flex-column`}
                    >
                      <ClockIcon className={`${Style.icon}`} />
                      <span className="mt-2 mb-2">Total Time</span>
                      <h5>{summaryStats.total_duration}</h5>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12 ">
            <div className={`${Style.contentContainer} pb-3`}>
              <div className={Style.containerheader}>
                <ContainerHeader
                  title={"Happiness Score"}
                  mode={"happiness"}
                  handleChangeFilter={handleChangeFilter}
                />
              </div>


                            <Container className='mt-3 pb-1'>
                                <LineChart 
                                happinessLabel={happinessLabel}
                                happinessGraphData={happinessGraphData}
                                emojisIcon={emojisIcon}
                                emojisIndex={emojisIndex}
                                />
                            </Container>
                        </div>


            <div className={`${Style.contentContainer} pb-4 mt-4`}>
              <div className={Style.containerheader}>
                <ContainerHeader
                  title={"My Activity"}
                  mode={"activity"}
                  handleChangeFilter={handleChangeFilter}
                />
              </div>
              <Container className="mt-1 pb-1">
                <BarChart myActivity={myActivity} />
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardHome;
