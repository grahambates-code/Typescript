import React, { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ApplicationState } from "../store";

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const isLoggedin = true;

  const userToken = useSelector(
    (state: ApplicationState) => state.auth.userToken
  );
  const userInfo = useSelector(
    (state: ApplicationState) => state.auth.userInfo
  );

  useMemo(() => {
    if (userToken === null || userInfo === null) {
      window.location.href = "/signin";
    }
  }, [userInfo, userToken]);

  //we only allow routing if terms are agreed
  const userterms_agreed = true;
  const accountterms_agreed = true;
  const isAdmin = true;

  if (
    isLoggedin &&
    userterms_agreed &&
    userToken &&
    ((isAdmin && accountterms_agreed) || !isAdmin)
  ) {
    return <>{children}</>;
  } else if (isLoggedin && userToken && !userterms_agreed) {
    return <Navigate to="/general-terms" />;
  } else if (
    isLoggedin &&
    userToken &&
    userterms_agreed &&
    isAdmin &&
    !accountterms_agreed
  ) {
    return <Navigate to="/account-terms" />;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
