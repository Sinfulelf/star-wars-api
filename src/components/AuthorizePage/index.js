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
  createUserWithFirebase,
  signInWithFormFirebase,
  signInWithGoogleFirebase,
  signOutFirebase,
} from "../../helpers";

import {
  clearUserInfo as clearUserInfoAction,
  setUserInfo as setUserInfoAction,
  getAuthorizedOnlineUser as getAuthorizedOnlineUserAction,
} from "../../actions/userInfoActions";

import SingInForm from "./SingInForm";
import RegisterForm from "./RegisterForm";

function getCapitalizedEmailStart(email) {
  const emailStart = (email.split("@") || [])[0] || "None";
  return emailStart.charAt(0).toUpperCase() + emailStart.slice(1);
}

const AuthPage = ({ history, data, actions }) => {
  useEffect(() => {
    // on component mount only
    actions.clearUserInfo();
    deleteAllCookies();
    signOutFirebase();
  }, [actions]);

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [singInErrorState, setSingInErrorState] = useState(false);
  const [registrationErrorState, setRegistrationErrorState] = useState(false);

  const removeSingInErrorState = () => setSingInErrorState(false);
  const removeRegistrationErrorState = () => setRegistrationErrorState(false);

  const { authOffline, authOnline } = actions;

  const getPath = () => history.location.pathname;
  const logout = () => {
    if (getPath() !== RouteData.Login) history.push(RouteData.Login);
  };

  async function createNewUser(email, password) {
    try {
      setFormLoading(true);

      const user = await createUserWithFirebase(email, password);
      user.user.cutomDisplayName = getCapitalizedEmailStart(email);

      if (user) {
        authOnline(user, logout);
        history.push(RouteData.Base);
      } else {
        setRegistrationErrorState(true);
      }
    } catch (ex) {
      setFormLoading(false);
    }
  }
  async function loginWithForm(email, password) {
    try {
      setFormLoading(true);

      const user = await signInWithFormFirebase(email, password);
      user.user.cutomDisplayName = getCapitalizedEmailStart(email);

      setFormLoading(false);
      if (user) {
        authOnline(user, logout);
        history.push(RouteData.Base);
      } else {
        setSingInErrorState(true);
      }
    } catch (ex) {
      setFormLoading(false);
    }
  }
  async function loginViaGoogleForm() {
    try {
      setFormLoading(true);
      const user = await signInWithGoogleFirebase();
      setFormLoading(false);
      if (user) {
        authOnline(user, logout);
        history.push(RouteData.Base);
      }
    } catch (ex) {
      setFormLoading(false);
    }
  }

  return (
    <div id="login-screen">
      <Segment>
        {formLoading && (
          <Dimmer active inverted className="p-absolute">
            <Loader inverted size="huge">
              Loading...
            </Loader>
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
                error={singInErrorState}
                removeErrorState={removeSingInErrorState}
              />
              {/* <Divider className="firebase-auth-form-divider" /> */}
              <RegisterForm
                visible={showRegisterForm}
                setVisible={() => {
                  setShowRegisterForm(false);
                }}
                create={createNewUser}
                error={registrationErrorState}
                removeErrorState={removeRegistrationErrorState}
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
      clearUserInfo: () => {
        dispatch(clearUserInfoAction());
      },
      authOffline: () => {
        const userName = "Anonymous";
        setUserCookies(JSON.stringify({ userName, offlineMode: true }));
        dispatch(setUserInfoAction(userName, true));
      },
      authOnline: (user, logout) => {
        const userName = user.user.displayName || user.user.cutomDisplayName;
        setUserCookies(JSON.stringify({ userName, offlineMode: false }));
        dispatch(setUserInfoAction(userName, false));
        dispatch(getAuthorizedOnlineUserAction(logout));
      },
    },
  };
};

const AuthPageComponent = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: true,
  areOwnPropsEqual: () => true,
})(AuthPage);

export default withRouter((props) => <AuthPageComponent {...props} />);
