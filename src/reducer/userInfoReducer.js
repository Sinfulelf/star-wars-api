import { handleActions } from "redux-actions";
import { UserInfoStore } from "../models/storeModels";
import { UserInfoActions } from "../actions";

const {
  CLEAR_USER_INFO,
  SET_USER_INFO,
  GET_AUTHORIZED_ONLINE_USER_DATA,
} = UserInfoActions;

export const initialState = new UserInfoStore();

export const userInfoReducer = handleActions(
  {
    [CLEAR_USER_INFO]: () => new UserInfoStore(),
    [SET_USER_INFO]: (userData, { payload }) => {
      const { userName, offlineMode } = payload;
      return {
        ...userData,
        timeStamp: Date.now(),
        userName,
        offlineMode,
      };
    },
    [GET_AUTHORIZED_ONLINE_USER_DATA]: (userData, { payload }) => {
      const { user } = payload;
      return {
        ...userData,
        timeStamp: Date.now(),
        user,
      };
    },
  },
  initialState
);
