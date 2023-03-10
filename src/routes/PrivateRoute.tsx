import React, { FunctionComponent, useMemo } from "react";
import { useSelector } from "react-redux";

import { ApplicationState } from "../store";

// @ts-ignore
const  PrivateRoute: FunctionComponent = (props : any) => {
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

  if (
    isLoggedin
  ) {
    return <>{props.children}</>;
  }
};

export default PrivateRoute;
