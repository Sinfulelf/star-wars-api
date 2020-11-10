import React from "react";
import { Link } from "react-router-dom";
import PT from "prop-types";

import { Form, Button, Icon, Divider } from "semantic-ui-react";

const RegisterForm = ({ visible, setVisible }) => (
  <Form className="firebase-register-form" widths="equal">
    <Icon
      name={visible ? "angle up" : "minus"}
      className="back-to-signin"
      size="large"
      title="Back to SignIn"
      onClick={setVisible}
    />
    <Form.Input
      icon="user"
      iconPosition="left"
      label="Username"
      placeholder="Enter username"
    />
    <Form.Input
      icon="lock"
      iconPosition="left"
      label="Password"
      type="Enter password"
    />

    <Button
      content="Register"
      primary
      style={{ marginTop: "1.5em", marginBottom: "1em" }}
    />
    <Divider horizontal>Or</Divider>
    <Button color="linkedin" style={{ marginTop: ".5em"}}>
      <Icon name="google" /> Google
    </Button>
  </Form>
);

RegisterForm.propTypes = {};

export default RegisterForm;
