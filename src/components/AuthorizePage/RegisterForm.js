import React from "react";
import PT from "prop-types";

import { Form, Button, Icon } from "semantic-ui-react";

const RegisterForm = ({ visible, setVisible, create, error, removeErrorState }) => (
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
      error={error}
      onChange={removeErrorState}
    />
    <Form.Input
      disabled
      icon="user"
      iconPosition="left"
      label="Username"
      id="create-username"
      placeholder="Username"
      error={error}
    />
    <Form.Input
      icon="lock"
      iconPosition="left"
      label="Password"
      type="password"
      id="create-password"
      placeholder="Enter password"
      error={error}
      onChange={removeErrorState}
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
  error: PT.bool.isRequired,
  removeErrorState: PT.func.isRequired,
};

export default RegisterForm;
