import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signout } from "../store/auth/action";
import DashLogo from "../assets/icons/dash-logo.svg";
import { ReactComponent as Accounts } from "../assets/icons/accounts.svg";
import { ReactComponent as Logout } from "../assets/icons/logout.svg";
import { ReactComponent as Audit } from "../assets/icons/audits.svg";
import { ApplicationState } from "../store";
import ProjectSelect from "./../pages/common/ProjectSelect";

interface ISideMenu {
  selectedProject: string;
  setSelectedProject: (id: string) => void;
  selectedKey: string;
  changeSelectedKey: (event: KeyboardEvent) => void;
}

const SideMenu = ({ setSelectedProject, selectedProject }: ISideMenu) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [route, setRoute] = useState<string>("");

  useEffect(() => {
    setRoute(window.location.pathname.split("/")[1]);
  }, []);

  const handleClick = (link: string) => {
    navigate(`/${link}`);
    setRoute(link);
  };

  const handleSignout = () => {
    dispatch(signout());
    navigate("/welcome");
    window.location.reload();
  };

  const token = useSelector((state: ApplicationState) => state.auth.userToken);

  let issuperadmin = false;

  return (
    <div className="side-menu-container">
      <div className="li-container">
        <div className="dash-logo">
          <img src={DashLogo} alt="dash-logo" />
        </div>

        <ProjectSelect
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />

        {true && (
          <li
            onClick={() => handleClick("dashboard")}
            className={route === "dashboard" ? "selected-menu" : undefined}
          >
            <Accounts />
            <p>Dashboard</p>
          </li>
        )}

        {true && (
          <li
            onClick={() => handleClick("fields")}
            className={route === "fields" ? "selected-menu" : undefined}
          >
            <Accounts />
            <p>Field Management</p>
          </li>
        )}

        {true && (
          <li
            onClick={() => handleClick("audits")}
            className={route === "audits" ? "selected-menu" : undefined}
          >
            <Audit />
            <p>Audit</p>
          </li>
        )}
      </div>

      <li className="logout" onClick={() => handleSignout()}>
        <Logout />

        <p>Sign out</p>
      </li>
    </div>
  );
};

export default SideMenu;
