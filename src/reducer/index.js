import { combineReducers } from "redux";

import {
  initialState as userInfoState,
  userInfoReducer,
} from "./userInfoReducer";

export const rootReducer = combineReducers({
  userInfo: userInfoReducer,
});

export const initialState = {
  userInfo: userInfoState,
};
