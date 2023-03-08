import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "antd";

import LeftBottomBorder from "../../assets/images/left-bottom-border.png";
import RightTopBorder from "../../assets/images/right-top-border.png";
import moment from "moment";

import "../../Styles/scss/pages.scss";

const { Title, Text } = Typography;

const WelcomePage = () => {
  const navigate = useNavigate();

  const toSignin = () => {
    navigate("/signin");
  };

  return (
    <div className="page page-welcome">
      <img src={RightTopBorder} alt="right-top-border" className="rt-border" />
      <img
        src={LeftBottomBorder}
        alt="left-bottom-border"
        className="lb-border"
      />

      <Text className="copyright">&copy; Copyright {moment().format("yyyy")}</Text>

      <div className="logo-container">
        <div></div>
        <Title className="welcome-title" level={1}>
          Omega Crop
        </Title>
        <Button
          ghost
          className="signin-button button-orange-outline"
          size="large"
          onClick={toSignin}
        >
          Sign In
        </Button>
      </div>

      <div className="card-container">
        <div className="welcome-card">
          <p>
            32 fields <span>over</span> 10 sq km
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
