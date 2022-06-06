import { immediateToast } from 'izitoast-react'
import 'izitoast-react/dist/iziToast.css';

export const notification = (type, message) => {
    switch (type) {
        case 'info':
            immediateToast('info', 
            {
                position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                message
            })
          break;
        case 'success':
            immediateToast('success', 
            {
                position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                message
            })
          break;
        case 'warning':
            immediateToast('warning', 
            {
                position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                message
            })
          break;
        case 'error':
            immediateToast('error', 
            {
                position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                message
            })
          break;
      }
}