import { combineReducers } from 'redux'
import {loginUserInfo, isProfileUpdate} from './Login/index'
import {unSeenNotificationCount} from './notification/index'
import {
    musicList,
    musicIndex,
    inActivePlayerIndex,
    PreviousMusicList,
    previousMusicIndex,
    currentTime,
    yourPlaylistCount,
    audiosCount
} from './wavesurfer/index'

const rootReducer = combineReducers({
    loginUserInfo,
    musicList,
    musicIndex,
    inActivePlayerIndex,
    PreviousMusicList,
    previousMusicIndex,
    currentTime,
    yourPlaylistCount,
    audiosCount,
    isProfileUpdate,
    unSeenNotificationCount
})
export default rootReducer;