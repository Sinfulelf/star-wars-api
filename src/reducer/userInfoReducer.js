import { handleActions } from "redux-actions";
import { UserInfoStore } from "../models/storeModels";
import { UserInfoActions } from "../actions";

const { SET_USER_INFO } = UserInfoActions;

export const initialState = new UserInfoStore();

export const userInfoReducer = handleActions(
  {
    [SET_USER_INFO]: (userInfo, { payload }) => {
      const { userName, offlineMode } = payload;
      return {
        ...userInfo,
        timeStamp: Date.now(),
        userName,
        offlineMode
      };
    },
  },
  initialState
);
