import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Divider,
  Grid,
  Segment,
  Header,
  Icon,
  Popup,
} from "semantic-ui-react";

import { DeathStarIcon } from "../helpersComponents/Icons";

import { RouteData } from "../../data";

import { setUserCookies } from "../../helpers";

import { setUserInfo as setUserInfoAction } from "../../actions/userInfoActions";

import SingInForm from "./SingInForm";
import RegisterForm from "./RegisterForm";

const AuthPage = ({ history, data, actions }) => {
  useEffect(() => {
    // on component mount only
    setUserCookies({}, 0);
  }, []);

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const { authOffline } = actions;

  return (
    <div id="login-screen">
      <Segment>
        <Header as="h2" icon className="login-header full-width">
          <DeathStarIcon width={45} height={45} />
          <div>Star Wars API</div>
          <Header.Subheader>
            Test task to check react skill of mine.
          </Header.Subheader>
        </Header>
        <Segment className="login-form" placeholder>
          <Grid columns={2} relaxed="very" stackable divided>
            <Grid.Column className={`firebase-auth-forms-column ${
              showRegisterForm ? "register" : "login"
            }`}>
              <SingInForm
                visible={!showRegisterForm}
                setVisible={() => {
                  setShowRegisterForm(true);
                }}
              />
              <Divider className="firebase-auth-form-divider"/>
              <RegisterForm
                visible={showRegisterForm}
                setVisible={() => {
                  setShowRegisterForm(false);
                }}
              />
            </Grid.Column>
            <Grid.Column verticalAlign="middle" className="offline-section">
              <Popup
                content="All your changes will be stored in your browser."
                trigger={
                  <Button
                    basic
                    color="purple"
                    size="big"
                    className="offline-btn"
                    onClick={authOffline}
                    as={Link}
                    to={RouteData.Base}
                  >
                    <Icon.Group>
                      <Icon name="wifi" />
                      <Icon corner name="x" color="red" />
                    </Icon.Group>
                    &nbsp; Enter offline
                  </Button>
                }
              />
            </Grid.Column>
          </Grid>
          <Divider className="vertical-devider" vertical>
            Or
          </Divider>
        </Segment>
      </Segment>
      <div id="developer-signature">
        developed by
        <a target="_blank" rel="noreferrer" href="https://github.com/Sinfulelf">
          &nbsp;Anton Nastolnyi
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    data: {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      authOffline: () => {
        const userName = "Anonymous";
        setUserCookies(JSON.stringify({ userName, offlineMode: true }));
        dispatch(setUserInfoAction(userName, true));
      },
    },
  };
};

const AuthPageComponent = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: true,
  areOwnPropsEqual: () => true,
})(AuthPage);

export default withRouter((props) => <AuthPageComponent {...props} />);
