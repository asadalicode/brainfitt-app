import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authChecker, getUserIsGuest } from "../../../../shared/js/authChecker";
import { UserStatus } from "../../../../shared/js/enums";
import { getUserActiveStatus } from "../../../../shared/js/getUserActiveStatus";
import { userStatusBasedRoute } from "./userStatusBasedRoute";

const RequireAuth = ({ protectedPath, children }) => {

  const location = useLocation();
  const isAuthenticated = authChecker();
  let url = `/?redirectUrl=${location?.pathname}`;
  let isUserAllowedRoutes = false;
  let _isGuest =  getUserIsGuest();
  if(_isGuest){
    url = "/";
  }
  else{

    if (isAuthenticated) {
      const _activeStatus = getUserActiveStatus();
      if (_activeStatus === UserStatus.active) {
        isUserAllowedRoutes = userStatusBasedRoute[_activeStatus]?.some(
          (eachVal) => eachVal === location?.pathname
        );
        isUserAllowedRoutes = !isUserAllowedRoutes;
      } else {
        isUserAllowedRoutes = userStatusBasedRoute[_activeStatus]?.some(
          (eachVal) => eachVal === location?.pathname
        );
      }
    }
  
    if (!isUserAllowedRoutes && isAuthenticated) {
      url = "/";
    }
  }
  
  return (
    <div>
      {protectedPath ? (
        <>
          {isAuthenticated && isUserAllowedRoutes ? (
            children
          ) : (
            <Navigate replace to={url} />
          )}
        </>
      ) : (
        children
      )}
    </div>
  );
};

export default RequireAuth;
