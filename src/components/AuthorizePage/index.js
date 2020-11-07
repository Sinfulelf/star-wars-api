import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Header,
  Icon,
  Message,
  Popup,
} from "semantic-ui-react";

import { DeathStarIcon } from "../helpersComponents/Icons";

import { RouteData } from "../../data";

import { setUserCookies } from "../../helpers";

import { setUserInfo as setUserInfoAction } from "../../actions/userInfoActions";

const AuthPage = ({ history, data, actions }) => {
  useEffect(() => {
    // on component mount only
    setUserCookies({}, 0);
  }, []);

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
            <Grid.Column>
              <Form className="firebase-login-form" widths="equal">
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="Username"
                  placeholder="Username"
                  disabled
                />
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  label="Password"
                  type="password"
                  disabled
                />

                <Button
                  content="Login via firebase"
                  primary
                  style={{ marginTop: "1.5em", marginBottom: "2.5em" }}
                  disabled
                />
                <Message className="disabled">
                  First time here?&nbsp;
                  <Link to="#" style={{ maginLeft: ".3em" }}>
                    Sing Up now!
                  </Link>
                </Message>
              </Form>
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
