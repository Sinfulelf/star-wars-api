import { observeFirebaseUser } from "../helpers";

export const UserInfoActions = {
  SET_USER_INFO: "SET_USER_INFO",
  GET_AUTHORIZED_ONLINE_USER_DATA: "GET_AUTHORIZED_ONLINE_USER_DATA",
};

/**
 * Actions and events about user information.
 * @memberof Actions
 * @namespace Actions.userInfoActions
 */

const setUserInfoDispatch = (userName, offlineMode) => ({
  type: UserInfoActions.SET_USER_INFO,
  payload: { userName, offlineMode },
});

/**
 * Set user Auth info;
 * @param {string} userName the name of user
 * @param {boolean} offlineMode update data with localstorage, instead firebase
 *
 * @memberof Actions.userInfoActions
 */
export function setUserInfo(userName, offlineMode) {
  return (dispatch) => {
    dispatch(setUserInfoDispatch(userName, offlineMode));
  };
}

const getAuthorizedOnlineUserDispatch = (user) => ({
  type: UserInfoActions.GET_AUTHORIZED_ONLINE_USER_DATA,
  payload: { user },
});

export function getAuthorizedOnlineUser(reloginCallBack) {
  return (dispatch, getState) => {
    observeFirebaseUser(
      (user) => {
        if (!getState().userInfo.user) {
          dispatch(getAuthorizedOnlineUserDispatch(user));
        }
      },
      () => reloginCallBack()
    );
  };
}
