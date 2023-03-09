import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Text, Title } from "@mantine/core";
import moment from "moment";

import "../../Styles/scss/pages.scss";

const WelcomePage = () => {
  const navigate = useNavigate();

  const toSignin = () => {
    navigate("/signin");
  };

  return (
    <div className="page page-welcome">
      <img
        src="images/left-bottom-border.png"
        alt="right-top-border"
        className="rt-border"
      />
      <img
        src="images/right-top-border.png"
        alt="left-bottom-border"
        className="lb-border"
      />

      <Text className="copyright">
        &copy; Copyright {moment().format("yyyy")}
      </Text>

      <div className="logo-container">
        <Title className="welcome-title" order={1}>
          Omega Crop
        </Title>
        <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
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
