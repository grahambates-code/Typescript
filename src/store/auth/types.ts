export interface UserInfo {}

export enum AuthActionTypes {
  SIGN_IN = "@@auth/SIGN_IN",
  SIGN_OUT = "@@auth/SIGN_OUT",
  RESET = "@@auth/RESET",
}

export interface AuthState {
  userToken: string | null;
  userInfo: any;
  isLoggedin: boolean;
}
