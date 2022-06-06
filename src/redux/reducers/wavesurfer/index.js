let init={
  activePlaylistArray:[],
  activePlayerIndex:0
}

export const musicList = (state = init, action) => {
    switch (action.type) {
  
       case 'ADD_MUSICLIST':
        return {
          activePlayerIndex:action.music.activePlayerIndex,
          activePlaylistArray:action.music.musicList
      }
        case 'PLAY_MUSIC':
          let _isPlay = action.music.musicList
          _isPlay[action.music.index].isPlay = true
          return {
            activePlaylistArray:[..._isPlay],
            activePlayerIndex:action.music.activePlayerIndex,
          }
        case 'PAUSE_MUSIC':
          let _isPause = action.music.musicList
          _isPause[action.music.index].isPlay = false 
          return {
            activePlaylistArray:[..._isPause],
            activePlayerIndex:action.music.activePlayerIndex,
          }
      default:
        return state
    }
  }
export const PreviousMusicList = (state = [{}], action) => {
    switch (action.type) {
  
       case 'ADD_PREVIOUS_MUSICLIST':
          return action.music
      default:
        return state
    }
  }
export const inActivePlayerIndex = (state = 0, action) => {
    switch (action.type) {
  
       case 'INACTIVE_PLAYER_INDEX':
          return action.index
      default:
        return state
    }
  }
export const musicIndex = (state = 0, action) => {
    switch (action.type) {
  
       case 'SELECTED_MUSIC_INDEX':
          return action.index
      default:
        return state
    }
  }
export const previousMusicIndex = (state = 0, action) => {
    switch (action.type) {
  
       case 'PREVIOUS_MUSIC_INDEX':
          return action.index
      default:
        return state
    }
  }
export const currentTime = (state = [], action) => {
    switch (action.type) {
  
       case 'ADD_CURRENT_TIME':
          return action.time
      default:
        return state
    }
  }
export const yourPlaylistCount = (state = 0, action) => {
    switch (action.type) {
  
       case 'INC_DEC_YOUR_PLAYLISt':
          return action.count
      default:
        return state
    }
  }
export const audiosCount = (state = false, action) => {
    switch (action.type) {
  
       case 'IS_COUNT_CHANAGE':
          return action.isCount
      default:
        return state
    }
  }