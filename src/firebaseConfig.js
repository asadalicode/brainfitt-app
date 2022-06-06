import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTGX4taSiJq27nCIN4c8daAVXWGAp3uAY",
  authDomain: "blissiree-933c6.firebaseapp.com",
  databaseURL: 'https://blissiree-933c6-default-rtdb.firebaseio.com',
  projectId: "blissiree-933c6",
  storageBucket: "blissiree-933c6.appspot.com",
  messagingSenderId: "109555982090",
  appId: "1:109555982090:web:ca25593ce63a269b34a4f3",
  measurementId: "G-86N41YJWRK",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
