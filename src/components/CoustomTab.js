import React from 'react';
import { Tabs } from 'antd';
// import './CustomTab.css';
import { useNavigate, useParams } from 'react-router-dom';

const { TabPane } = Tabs;

const CustomTab = ({ elements }) => {
  const history = useNavigate();
  let { source } = useParams();

  return (
    <>
      <Tabs
        activeKey={source}
        onChange={(key) => {
          history(`/${key}`);
        }}
        tabBarGutter={70}
        tabBarStyle={{ backgroundColor: 'white' }}
        size="large"
        className="Tabs">
        {elements.map((e, index) => (
          <TabPane tab={e.tabTitle} className="TabsBody" key={e.path}>
            {e.tabBody}
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};

export default CustomTab;