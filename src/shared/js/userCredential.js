export const getUserInfo = () => {
  const tokenString = sessionStorage.getItem("brainFit");
  const userForm = JSON.parse(tokenString);
  return userForm;
};
export const setUserInfo = (userForm) => {
  localStorage.setItem(`userForm`, JSON.stringify(userForm));
  sessionStorage.setItem(
    "brainFit",
    JSON.stringify({ ...getUserInfo(), userForm })
  );
};

export const setUserData = (data) => {
  setItemInLocalStorage("userData", JSON.stringify(data));
};

export const getUserData = () => {
  return JSON.parse(getItemInLocalStorage("userData"));
};

export const setUserToken = (token) => {
  setItemInLocalStorage("token", token);
};

export const getUserToken = () => {
  return getItemInLocalStorage("token");
};

export const setItemInLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getItemInLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const setTransectionIdInLocalStorage = (transactionId) => {
  localStorage.setItem("usti", transactionId);
};
export const getTransectionId = () => {
  return localStorage.getItem("usti");
};
export const deleteTransectionIdFromLocalStorage = () => {
  localStorage.removeItem("usti");
};

export const setAvailabilityIdInLocalStorage = (availabilityId) => {
  localStorage.setItem("availability_id", availabilityId);
};
export const getAvailabilityId = () => {
  return JSON.parse(localStorage.getItem("availability_id"));
};
export const deleteAvailabilityIdFromLocalStorage = () => {
  localStorage.removeItem("availability_id");
};
export const setMeetingDetail = (detail) => {
  localStorage.setItem("meetingDetail", JSON.stringify(detail));
};
export const getMeetingDetail = () => {
  return JSON.parse(localStorage.getItem("meetingDetail"));
};
export const deleteMeetingDetail = () => {
  localStorage.removeItem("meetingDetail");
};
export const setScheduleDetail = (detail) => {
  localStorage.setItem("dateTime", JSON.stringify(detail));
};
export const getScheduleDetail = () => {
  return JSON.parse(localStorage.getItem("dateTime"));
};
export const deleteScheduleDetail = () => {
  localStorage.removeItem("dateTime");
};
export const setEntryId = (id) => {
  localStorage.setItem("entryId", JSON.stringify(id));
};
export const getEntryId = () => {
  return JSON.parse(localStorage.getItem("entryId"));
};
export const deleteEntryId = () => {
  localStorage.removeItem("entryId");
};