import React from "react";

const SettingsContext = React.createContext({
  language: "en",
  onChangeLanguage: (lang: string) => null,
});

export default SettingsContext;
