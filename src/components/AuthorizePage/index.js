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
  Dimmer,
  Loader,
} from "semantic-ui-react";

import { DeathStarIcon } from "../helpersComponents/Icons";

import { RouteData } from "../../data";

import {
  setUserCookies,
  deleteAllCookies,
  setFirebaseAuthInfo,
  createUserWithFirebase,
  signInWithFormFirebase,
  signInWithGoogleFirebase,
  signOutFirebase,
} from "../../helpers";

import { setUserInfo as setUserInfoAction } from "../../actions/userInfoActions";

import SingInForm from "./SingInForm";
import RegisterForm from "./RegisterForm";

const AuthPage = ({ history, data, actions }) => {
  useEffect(() => {
    // on component mount only
    deleteAllCookies();
    signOutFirebase();
  }, []);

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  //const [singinEr, setFormLoading] = useState(false);

  const { authOffline, authOnline } = actions;
  async function createNewUser(email, password) {
    setFormLoading(true);
    const user = await createUserWithFirebase(email, password);
    if (user) {
      authOnline(user);
      history.push(RouteData.Base);
    } else {
      setFormLoading(false);
    }
  }
  async function loginWithForm(email, password) {
    setFormLoading(true);
    const user = await signInWithFormFirebase(email, password);
    if (user) {
      authOnline(user);
      history.push(RouteData.Base);
    } else {
      setFormLoading(false);
    }
  }
  async function loginViaGoogleForm() {
    setFormLoading(true);
    const user = await signInWithGoogleFirebase();
    if (user) {
      authOnline(user);
      history.push(RouteData.Base);
    } else {
      setFormLoading(false);
    }
  }

  return (
    <div id="login-screen">
      <Segment>
      {formLoading && (
          <Dimmer active inverted className="p-absolute">
            <Loader inverted size="huge">Loading...</Loader>
          </Dimmer>
        )}
        <Header as="h2" icon className="login-header full-width">
          <DeathStarIcon width={45} height={45} />
          <div>Star Wars API</div>
          <Header.Subheader>
            Test task to check react skill of mine.
          </Header.Subheader>
        </Header>
        <Segment className="login-form" placeholder>
          <Grid columns={2} relaxed="very" stackable divided>
            <Grid.Column
              className={`firebase-auth-forms-column ${
                showRegisterForm ? "register" : "login"
              }`}
            >
              <SingInForm
                visible={!showRegisterForm}
                setVisible={() => {
                  setShowRegisterForm(true);
                }}
                loginWithForm={loginWithForm}
                loginViaGoogleForm={loginViaGoogleForm}
              />
              <Divider className="firebase-auth-form-divider" />
              <RegisterForm
                visible={showRegisterForm}
                setVisible={() => {
                  setShowRegisterForm(false);
                }}
                create={createNewUser}
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
        dispatch(setUserInfoAction(userName, true, null));
      },
      authOnline: (user) => {
        const userName = user.additionalUserInfo.profile.name;
        setUserCookies(JSON.stringify({ userName, offlineMode: false }));
        setFirebaseAuthInfo(user);
        dispatch(setUserInfoAction(userName, true, user));
      },
    },
  };
};

const AuthPageComponent = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: true,
  areOwnPropsEqual: () => true,
})(AuthPage);

export default withRouter((props) => <AuthPageComponent {...props} />);
