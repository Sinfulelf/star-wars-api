import { handleActions } from "redux-actions";
import { UserInfoStore } from "../models/storeModels";
import { UserInfoActions } from "../actions";

const { SET_USER_NAME } = UserInfoActions;

export const initialState = new UserInfoStore();

export const userInfoReducer = handleActions(
  {
    [SET_USER_NAME]: (userInfo, { payload }) => {
      const { userName } = payload;
      return {
        ...userInfo,
        timeStamp: Date.now(),
        userName: userName,
      };
    },
  },
  initialState
);
