export const UserInfoActions = {
  SET_USER_INFO: "SET_USER_INFO",
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
