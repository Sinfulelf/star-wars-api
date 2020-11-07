import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { RouteData } from "../../data";

import { Button, Icon, Transition } from "semantic-ui-react";

import { ParagraphMock } from "../helpersComponents/Mocks";

const NavigationBar = ({ className, data, actions }) => {
  /**Play lil animation only single time */
  const [showHelloLabel, setShowHelloLabel] = useState(false);
  useEffect(() => {
    setShowHelloLabel(true);
  }, []);

  const userName = data.userInfo.userName;
  return (
    <div className={className}>
      <div>
        <Transition
          visible={showHelloLabel}
          animation="slide up"
          duration={800}
        >
          <h3 style={{ marginBottom: ".2em" }}>
            May the force be with you,
            <span className="ui teal" style={{ fontSize: "1.35rem" }}>
              &nbsp;
              {userName ? userName : <ParagraphMock height={16} width={100} />}
            </span>
            !
          </h3>
        </Transition>
      </div>
      <div>
        {/* <Button animated="vertical">
          <Button.Content visible>Setting</Button.Content>
          <Button.Content hidden>
            <Icon name="settings" size="large" />
          </Button.Content>
        </Button> */}
        <Button
          animated="vertical"
          as={Link}
          to={RouteData.Login}
          style={{ marginLeft: "1.35em" }}
        >
          <Button.Content visible>LogOut</Button.Content>
          <Button.Content hidden>
            <Icon name="log out" size="large" flipped="horizontally" />
          </Button.Content>
        </Button>
      </div>
    </div>
  );
};

NavigationBar.propTypes = {
  className: PropTypes.string.isRequired,
};

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
    actions: {},
  };
};

const NavigationBarConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);

const NavigationBarComponent = (props) => <NavigationBarConnected {...props} />;

export default NavigationBarComponent;
