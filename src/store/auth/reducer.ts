import { Reducer } from "redux";

import { AuthActionTypes, AuthState } from "./types";

export const initialState: AuthState = {
  userToken: sessionStorage.getItem("userToken"),
  // userInfo: JSON.parse(sessionStorage.getItem("userInfo") || "") || {},
  userInfo: {},
  isLoggedin: !!sessionStorage.getItem("isLoggedin"),
};

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {

    case AuthActionTypes.SIGN_IN:
      const { userToken, userInfo } = action.payload;
      sessionStorage.setItem("userToken", userToken);
      userInfo !== undefined &&
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      sessionStorage.setItem("isLoggedin", 'true');

      return {
        ...state,
        userToken: userToken,
        userInfo: userInfo !== undefined ? userInfo : state.userInfo,
        isLoggedin: true,
      };

    case AuthActionTypes.SIGN_OUT:
      sessionStorage.clear();
      localStorage.clear();
      sessionStorage.setItem("isLoggedin", 'false');

      return {
        ...state,
        isLoggedin: false,
      };

    default:
      return state;
  }
};

export { reducer as authReducer };
