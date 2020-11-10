export const UserInfoActions = {
  SET_USER_INFO: "SET_USER_INFO",
};

/**
 * Actions and events about user information.
 * @memberof Actions
 * @namespace Actions.userInfoActions
 */

const setUserInfoDispatch = (userName, offlineMode, userInfo) => ({
  type: UserInfoActions.SET_USER_INFO,
  payload: { userName, offlineMode, userInfo },
});

/**
 * Set user Auth info;
 * @param {string} userName the name of user
 * @param {boolean} offlineMode update data with localstorage, instead firebase
 * @param {Object} userInfo firebase user info
 * 
 * @memberof Actions.userInfoActions
 */
export function setUserInfo(userName, offlineMode, userInfo) {
  return (dispatch) => {
    dispatch(setUserInfoDispatch(userName, offlineMode, userInfo));
  };
}
