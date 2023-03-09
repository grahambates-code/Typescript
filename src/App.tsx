import React from "react";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { ApplicationState } from "./store";
import { Store } from "redux";
import { History } from "history";
import Routes from "./routes/Router";
import { ApolloProviderWrap } from "./features/providers/ApolloProvider";
import i18n from "./features/services/i18n.service";
import { MantineProvider } from "@mantine/core";

interface MainProps {
  store: Store<ApplicationState>;
  history: History;
}

const App: React.FC<MainProps> = ({ store }) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <ApolloProviderWrap>
              <Routes />
            </ApolloProviderWrap>
          </Provider>
        </I18nextProvider>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;
