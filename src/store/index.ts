import { combineReducers } from "redux";
import { History } from "history";

import { AuthState } from "./auth/types";
import { authReducer } from "./auth/reducer";

import { CommonState } from "./common/types";
import { commonReducer } from "./common/reducer";

export interface ApplicationState {
  auth: AuthState;
  common: CommonState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    auth: authReducer,
    common: commonReducer,
  });
