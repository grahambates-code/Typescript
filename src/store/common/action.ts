import { CommonActionTypes, CommonState, ErrorType } from "./types";

export const continueModal = (payload: boolean) => {
  return {
    type: CommonActionTypes.CONTINUE_MODAL,
    payload: payload,
  };
};

export const handleError = (payload: any) => {
  return {
    type: CommonActionTypes.ERROR,
    payload: payload,
  };
};
