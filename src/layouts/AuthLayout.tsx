import React from "react";
import { Outlet } from "react-router-dom";
import { Text } from "@mantine/core";
import moment from "moment";

const AuthLayout = () => {
  const thisYear = moment().format("yyyy");

  return (
    <div className="page page-signin">
      <img
        src="images/left-bottom-border.png"
        alt="left-bottom-border"
        className="lb-border"
      />
      <Text className="copyright">&copy; Copyright {thisYear}</Text>

      <Outlet />
    </div>
  );
};

export default AuthLayout;
