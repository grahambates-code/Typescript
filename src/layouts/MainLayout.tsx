import React from "react";
import { Outlet } from "react-router-dom";
import { Text } from "@mantine/core";

const MainLayout = () => {
  return (
    <div className="App">
      <Text>This is main layout.</Text>

      <Outlet />
    </div>
  );
};

export default MainLayout;
