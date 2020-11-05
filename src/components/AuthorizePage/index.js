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
} from "semantic-ui-react";

import { DeathStarIcon } from "../helpersComponents/Icons";

import { RouteData } from "../../data";

import { setUserCookies } from "../../helpers";

const AuthPage = ({ history, data, actions }) => {
  useEffect(() => {
    // on component mount only
    setUserCookies("", 1);

  }, []);

  return (
    <div id="login-screen">
      <Segment>
        <Header as="h2" icon className="login-header full-width">
          <DeathStarIcon width={40} height={40} />
          <div>Star Wars API</div>
          <Header.Subheader>
            Test task to check on my react skill.
          </Header.Subheader>
        </Header>
        <Segment className="login-form" placeholder>
          <Grid columns={2} relaxed="very" stackable divided>
            <Grid.Column>
              <Form className="firebase-login-form" widths='equal'>
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
                  style={{ marginTop: "2.5em" }}
                  disabled
                />
              </Form>
            </Grid.Column>
            <Grid.Column verticalAlign="middle" className="offline-section">
              <Button
                basic
                color="teal"
                size="big"
                className="offline-btn"
                onClick={(e) => {
                  setUserCookies("guest");
                }}
                as={Link}
                to={RouteData.Base}
              >
                <Icon.Group>
                  <Icon name="wifi" />
                  <Icon corner name="x" />
                </Icon.Group>
                &nbsp; Work offline
              </Button>
            </Grid.Column>
          </Grid>
          <Divider className="horizontal-devider" vertical>
            Or
          </Divider>
        </Segment>
      </Segment>
      <div id="developer-signature">
        developed by{" "}
        <a target="_blank" rel="noreferrer" href="https://github.com/Sinfulelf">
          Anton Nastolnyi
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
    actions: {},
  };
};

const AuthPageComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPage);

export default withRouter((props) => <AuthPageComponent {...props} />);
