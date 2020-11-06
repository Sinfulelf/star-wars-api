

export const UserInfoActions = {
  SET_USER_NAME: "SET_USER_NAME"
};

const setUserNameDispatch = (userName) => ({
  type: UserInfoActions.SET_USER_NAME,
  payload: { userName },
});

export function setUserName(userName) {
  return (dispatch) => {
    dispatch(setUserNameDispatch(userName));
  }
}