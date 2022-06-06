export const loginUserInfo = (state = '', action) => {
    switch (action.type) {
  
       case 'USER_INFO':
          return action.userInfo
      default:
        return state
    }
  }
export const isProfileUpdate = (state = '', action) => {
    switch (action.type) {
       case 'IS_PROFILE_UPDATE':
          return action.isCount
      default:
        return state
    }
  }