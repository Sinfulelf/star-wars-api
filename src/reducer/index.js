import { combineReducers } from "redux";

import {
  initialState as userInfoState,
  userInfoReducer,
} from "./userInfoReducer";

import { initialState as peopleState, peopleReducer } from "./peopleReducer";

import {
  initialState as relationshipsState,
  relationshipsReducer,
} from "./relationshipsReducer";

export const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  peopleData: peopleReducer,
  relationships: relationshipsReducer,
});

export const initialState = {
  userInfo: userInfoState,
  peopleData: peopleState,
  relationships: relationshipsState,
};
