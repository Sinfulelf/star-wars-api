import PT from "prop-types";

export class UserInfoStore {
  timeStamp = 0;

  userName = "";
  offlineMode = true;
  user = null;
}

export const UserInfoStorePropTypes = {
  timeStamp: PT.number,
  userName: PT.string,
  offlineMode: PT.bool,
  userId: PT.object,
};
