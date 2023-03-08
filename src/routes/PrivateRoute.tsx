import React, { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import { gql } from "@apollo/client";

import { ApplicationState } from "../store";

const GET_USER = gql`
  query ($account_id: uuid, $user_id: uuid) {
    table_user(where: { user_id: { _eq: $user_id } }) {
      user_id
      terms_agreed
    }
  }
`;

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useDispatch();

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
    return <MainLayout>{children}</MainLayout>;
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
