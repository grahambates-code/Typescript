import React, { useState } from 'react';
import { Layout } from 'antd';

const SideBar = ({ menu }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout.Sider
      width={320}
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      className="sidebar"
      collapsedWidth={100}
      breakpoint="lg"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0
      }}
    >
      {menu}
    </Layout.Sider>
  );
};

export default SideBar;
