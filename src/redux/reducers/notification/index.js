export const unSeenNotificationCount = (state = 0, action) => {
    switch (action.type) {
  
       case 'ADD_UNSEEN_NOTIFICATION_COUNT':
          return action.count
      default:
        return state
    }
  }