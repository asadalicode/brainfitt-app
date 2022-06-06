export const addMusicList = music => ({
    type: 'ADD_MUSICLIST',
    music
  })
export const addPreviousMusicList = music => ({
    type: 'ADD_PREVIOUS_MUSICLIST',
    music
  })
export const selectedMusicIndex = index => ({
    type: 'SELECTED_MUSIC_INDEX',
    index
  })
export const addPreviousMusicIndex = index => ({
    type: 'PREVIOUS_MUSIC_INDEX',
    index
  })
export const addInactivePlayerIndex = index => ({
    type: 'INACTIVE_PLAYER_INDEX',
    index
  })
  export const addCurrentTime = time => ({
    type: 'ADD_CURRENT_TIME',
    time
  })
  export const playMusic = music => ({
      type: 'PLAY_MUSIC',
      music
    })
  export const pauseMusic = music => ({
      type: 'PAUSE_MUSIC',
      music
    })
  export const addYourPlaylistCount = count => ({
      type: 'INC_DEC_YOUR_PLAYLISt',
      count
    })
  export const addAudiosCount = isCount => ({
      type: 'IS_COUNT_CHANAGE',
      isCount
    })