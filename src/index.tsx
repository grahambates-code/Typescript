import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import configureStore from "./configureStore";
import { Amplify } from 'aws-amplify';

import './Styles/app/app.scss';

let isLocal = (window.location.hostname === 'localhost');
let process_env = process.env;

Amplify.configure({
  Auth: {
    identityPoolId: process_env.REACT_APP_COGNITO_USERPOOL_IDENTITY,
    region: process_env.REACT_APP_REGION,
    userPoolId: process_env.REACT_APP_COGNITO_USERPOOL,
    userPoolWebClientId: process_env.REACT_APP_COGNITO_USERPOOL_CLIENT,
    identityPoolRegion: process_env.REACT_APP_REGION,
    mandatorySignIn: true,
    XcookieStorage: {
      domain: isLocal ? "localhost" : "dev.distro.energy",
      path: '/',
      expires: 365,
      secure: false
    },
  },
  Storage: {
    AWSS3: {
      identityPoolId: process_env.REACT_APP_COGNITO_USERPOOL_IDENTITY,
      bucket: process_env.REACT_APP_FILE_BUCKET,
      region: process_env.REACT_APP_REGION,
      level: 'private'
    }
  },
});

const history = createBrowserHistory();

const initialState: any = {};
const store = configureStore(history, initialState);

const app = document.getElementById('root')!;
const root = createRoot(app);

//render app to root
root.render(<App store={store} history={history} />);

// ReactDOM.render(
//   <App store={store} history={history} />,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
