import { AuthActionTypes, AuthState } from "./types";

export const signin = (payload: AuthState) => {
  return {
    type: AuthActionTypes.SIGN_IN,
    payload: payload,
  };
};

export const signout = () => {
  return {
    type: AuthActionTypes.SIGN_OUT,
  };
};

export const reset = () => {
  return {
    type: AuthActionTypes.RESET,
  };
};
