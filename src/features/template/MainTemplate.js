import React, { useContext } from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
// import Sidebar from '../../layout/Sidebar';
// import NavBar from '../../layout/Navbar';
// import TopicMenu from '../../layout/Menu';
// import { UserAuthenticationContext } from 'components/providers/UserAuthenticationProvider';
import { UserAuthenticationContext } from '../providers/UserAuthenticationProvider';
// import PublicContainer from 'components/containers/Public';

function App({ children }) {
  const { isLoggedIn } = useContext(UserAuthenticationContext);
  const { pathname } = useLocation();

  const className = `blur-bg ${pathname === '/welcome' && 'map-bg'} `;

  if (!isLoggedIn) {
    return (
      <div className={className}>
        <div>{children}</div>
      </div>
    );
  }

  //   const Menu = <TopicMenu />;
  return (
    <div className="App">
      <div className={className}>
        {/* <NavBar menu={Menu} /> */}
        <Layout>
          {/* <Sidebar menu={Menu} /> */}
          <Layout.Content className="content" style={{ marginLeft: 250, padding: 25 }}>
            {children}
          </Layout.Content>
        </Layout>
      </div>
    </div>
  );
}

export default App;
