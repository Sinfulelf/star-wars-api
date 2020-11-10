import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { RouteData } from "../../data";

import { getUserInfoFromCookie } from "../../helpers";

import {
  setUserInfo as setUserInfoAction,
  getAuthorizedOnlineUser as getAuthorizedOnlineUserAction,
} from "../../actions/userInfoActions";

import { Divider } from "semantic-ui-react";

import NavigationBar from "./NavigationBar";

export class Layout extends PureComponent {
  componentDidMount() {
    const { history, data, actions } = this.props;
    if (!data.userInfo.userName) {
      setTimeout(() => {
        const getPath = () => history.location.pathname;
        actions.getUserInfoDataFromStorages(() => {
          if (getPath() !== RouteData.Login) history.push(RouteData.Login);
        });
      }, 1);
    }
  }

  render() {
    return (
      <div className="layout-container">
        <NavigationBar className="layout-container__navigation-bar" />
        <Divider fitted />
        <div className="layout-container__content"> {this.props.children}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { userInfo } = state;
  return {
    data: {
      userInfo,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getUserInfoDataFromStorages: (logout) => {
        const { userName, offlineMode } = getUserInfoFromCookie();
        dispatch(setUserInfoAction(userName, offlineMode));
        if (!offlineMode) {
          dispatch(getAuthorizedOnlineUserAction(logout));
        }
      },
    },
  };
};

const LayoutComponent = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Layout)
);

export default LayoutComponent;
