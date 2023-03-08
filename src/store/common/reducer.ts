import { Reducer } from "redux";

import { CommonActionTypes, CommonState } from "./types";

export const initialState: CommonState = {
  error: {
    message: "",
    openContinueModal: false,
    openNotification: false,
  },
};

const reducer: Reducer<CommonState> = (state = initialState, action) => {
  switch (action.type) {
    case CommonActionTypes.CONTINUE_MODAL:
      return {
        ...state,
        error: {
          message: "",
          openContinueModal: action.payload,
          openNotification: false,
        },
      };

    case CommonActionTypes.ERROR:
      if (action.payload.toString().includes("JWTExpired")) {
        return {
          ...state,
          error: {
            message: action.payload.toString(),
            openContinueModal: true,
            openNotification: state.error.openNotification,
          },
        };
      } else {
        return {
          ...state,
          error: {
            message: action.payload.toString().split("Error: ")[1],
            openContinueModal: false,
            openNotification: true,
          },
        };
      }

    default:
      return state;
  }
};

export { reducer as commonReducer };
