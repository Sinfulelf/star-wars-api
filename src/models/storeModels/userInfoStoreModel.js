import PT from 'prop-types';

export class UserInfoStore {
  timeStamp = 0;

  userName = "";
  offlineMode = true;
}

export const UserInfoStorePropTypes = {
  userName: PT.string,
  offlineMode: PT.bool
}
