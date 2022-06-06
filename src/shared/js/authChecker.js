import { async } from "@firebase/util";
import { getItemInLocalStorage, getUserToken } from "./userCredential";

export const authChecker = () => {
  let isAuthenticated = false;

  if (getUserToken()) {
    isAuthenticated = true;
  }

  return isAuthenticated;
};
export const getUserIsGuest =  () => {
  let _isGuest = false;
  _isGuest =  getItemInLocalStorage("isGuest") === "true" ? true : false;
  return _isGuest;
};
