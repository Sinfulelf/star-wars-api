import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { getUserInfoFromCookie, getFirebaseUserInfo } from "../../helpers";

import { setUserInfo as setUserInfoAction } from "../../actions/userInfoActions";

import { Divider } from "semantic-ui-react";

import NavigationBar from "./NavigationBar";

export class Layout extends PureComponent {
  componentDidMount() {
    const { data, actions } = this.props;
    if (!data.userInfo.userName) {
      setTimeout(() => {
        actions.getUserInfoDataFromStorages();
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
      getUserInfoDataFromStorages: () => {
        const { userName, offlineMode } = getUserInfoFromCookie();
        let user = offlineMode ? null : getFirebaseUserInfo();

        dispatch(
          setUserInfoAction(
            userName,
            offlineMode && !!user,
            !!user ? user : null
          )
        );
      },
    },
  };
};

const LayoutComponent = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default LayoutComponent;
