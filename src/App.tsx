import React from "react";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { ApplicationState } from "./store";
import { Store } from "redux";
import { History } from "history";
import Routes from "./routes/Router";
import { _ApolloProvider } from "./features/providers/ApolloProvider";
import i18n from "./features/services/i18n.service";

import 'antd/dist/reset.css';

interface MainProps {
  store: Store<ApplicationState>;
  history: History;
}

const App: React.FC<MainProps> = ({ store }) => {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <_ApolloProvider>
            <Routes />
          </_ApolloProvider>
        </Provider>
      </I18nextProvider>
    </BrowserRouter>
  );
};

export default App;
