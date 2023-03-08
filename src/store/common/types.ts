export interface UserInfo {}

export enum CommonActionTypes {
  CONTINUE_MODAL = "@@common/SIGN_IN",
  ERROR = "@@common/ERROR",
}

export type ErrorType = {
  message: string,
  openContinueModal: boolean,
  openNotification: boolean
}

export interface CommonState {
  error: ErrorType
}
