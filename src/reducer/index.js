import { combineReducers } from "redux";

import {
  initialState as userInfoState,
  userInfoReducer,
} from "./userInfoReducer";

import { initialState as peopleState, peopleReducer } from "./peopleReducer";

export const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  peopleData: peopleReducer,
});

export const initialState = {
  userInfo: userInfoState,
  peopleData: peopleState,
};
