import React from "react";
import PT from "prop-types";

import { Form, Button, Icon } from "semantic-ui-react";

const RegisterForm = ({ visible, setVisible, create }) => (
  <Form
    className="firebase-register-form"
    widths="equal"
    onSubmit={async ({ target }) => {
      const emailEl = target.querySelector("#create-email");
      const passwordEl = target.querySelector("#create-password");
      await create((emailEl || {}).value, (passwordEl || {}).value);
    }}
  >
    <Icon
      name={visible ? "angle up" : "minus"}
      className="back-to-signin"
      size="large"
      title="Back to SignIn"
      onClick={setVisible}
    />
    <Form.Input
      icon="at"
      iconPosition="left"
      label="Email"
      id="create-email"
      placeholder="Enter email"
    />
    <Form.Input
      disabled
      icon="user"
      iconPosition="left"
      label="Username"
      id="create-username"
      placeholder="Username"
    />
    <Form.Input
      icon="lock"
      iconPosition="left"
      label="Password"
      type="Enter password"
      id="create-password"
      placeholder="Password"
    />

    <Button
      content="Register"
      primary
      style={{ marginTop: "1.5em", marginBottom: "1em" }}
    />
  </Form>
);

RegisterForm.propTypes = {
  visible: PT.bool.isRequired,
  setVisible: PT.func.isRequired,
  create: PT.func.isRequired,
};

export default RegisterForm;
