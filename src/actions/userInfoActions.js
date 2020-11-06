export const UserInfoActions = {
  SET_USER_INFO: "SET_USER_INFO",
};

const setUserInfoDispatch = (userName, offlineMode) => ({
  type: UserInfoActions.SET_USER_INFO,
  payload: { userName, offlineMode },
});

export function setUserInfo(userName, offlineMode) {
  return (dispatch) => {
    dispatch(setUserInfoDispatch(userName, offlineMode));
  };
}
