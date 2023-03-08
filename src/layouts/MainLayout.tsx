import React, { useState, useEffect } from "react";
import { Layout, Modal, notification } from "antd";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";

import { continueModal, handleError } from "../store/common/action";
import { signin } from "../store/auth/action";
import Sidebar from "../components/Sidebar";
import SideMenu from "../components/SideMenu";
import { ApplicationState } from "../store";

const { Content } = Layout;

const MainLayout = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useDispatch();

  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedKey, setSelectedKey] = useState("0");
  const gqlError = useSelector((state: ApplicationState) => state.common.error);

  const changeSelectedKey = (event: KeyboardEvent) => {
    const key = event.key;
    setSelectedKey(key);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const openNotificationWithIcon = (message: string) => {
    notification["error"]({
      message: "Error",
      description: message,
    });
  };

  useEffect(() => {
    if (!gqlError.openContinueModal && gqlError.openNotification) {
      openNotificationWithIcon(gqlError.message);
    }
  }, [gqlError, openNotificationWithIcon]);

  const keepLogin = async () => {
    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      const currentSession = authenticatedUser.signInUserSession;

      dispatch(
        signin({
          userToken: currentSession.getIdToken().getJwtToken(),
          userInfo: authenticatedUser,
          isLoggedin: true,
        })
      );

      //window.location.reload();
      authenticatedUser.refreshSession(
        currentSession.refreshToken,
        (err: any, session: any) => {
          if (err) handleError(err);
        }
      );
    } catch (e) {}

    dispatch(continueModal(false));
  };

  const Menu = (
    <SideMenu
      selectedProject={selectedProject}
      setSelectedProject={setSelectedProject}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );

  const childrenWithProject = React.cloneElement(children, {
    selectedProject: selectedProject,
  });

  return (
    <div className="App">
      <Modal
        className="continue-modal"
        maskClosable={false}
        closable={false}
        footer={null}
        title={null}
        open={gqlError.openContinueModal}
      >
        <p className="header">Token has expired</p>
        <p className="content">Click OK to login again.</p>
        <div className="buttons-container">
          <button className="main-orange-button" onClick={keepLogin}>
            OK
          </button>
        </div>
      </Modal>
      <Layout>
        <Sidebar menu={Menu} />
        <Layout>
          {selectedProject && (
            <Content className="content">{childrenWithProject}</Content>
          )}
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
