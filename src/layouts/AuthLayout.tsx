import React from "react";
import { Typography } from "antd";
import LeftBottomBorder from "../assets/images/left-bottom-border.png";
import RightTopBorder from "../assets/images/right-top-border.png";
import moment from "moment";

const { Text } = Typography;

const AuthLayout = (props: React.AllHTMLAttributes<HTMLElement>) => {
  const { children } = props;

  const thisYear = moment().format("yyyy");

  return (
    <div className="page page-signin">
      <img src={RightTopBorder} alt="right-top-border" className="rt-border" />
      <img
        src={LeftBottomBorder}
        alt="left-bottom-border"
        className="lb-border"
      />
      <Text className="copyright">&copy; Copyright {thisYear}</Text>
      {children}
    </div>
  );
};

export default AuthLayout;
