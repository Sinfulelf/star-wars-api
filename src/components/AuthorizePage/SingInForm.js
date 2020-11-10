import React from "react";
import { Link } from "react-router-dom";
import PT from "prop-types";

import { Form, Button, Message } from "semantic-ui-react";

const SingInForm = ({ setVisible, loginWithForm, loginViaGoogleForm }) => (
    <Form className="firebase-singin-form" widths="equal">
      <Form.Input
        icon="at"
        iconPosition="left"
        label="Email"
        key="login-email"
        id="login-email"
        placeholder="Email"
      />
      <Form.Input
        icon="lock"
        iconPosition="left"
        label="Password"
        type="password"
        key="login-password"
        id="login-password"
        placeholder="Password"
      />

      <Button
        content="Login via firebase"
        primary
        style={{ marginTop: "2em", marginBottom: "1.5em" }}
        onClick={async ({ target }) => {
          const emailEl = document.querySelector("#login-email");
          const passwordEl = document.querySelector("#login-password");
          await loginWithForm((emailEl || {}).value, (passwordEl || {}).value);
        }}
      />
      <Message style={{ margin: "0 .7em" }}>
        First time here?&nbsp;
        <Link to="#" style={{ maginLeft: ".3em" }} onClick={setVisible}>
          Sing Up!
        </Link>
        &nbsp;or&nbsp;
        <Button
          icon="google"
          size="small"
          type="google-btn"
          onClick={loginViaGoogleForm}
          style={{
            display: "inline-block",
            background: "#4286f5",
            color: "white",
          }}
        />
      </Message>
    </Form>
  );


SingInForm.propTypes = {
  setVisible: PT.func.isRequired,
  loginWithForm: PT.func.isRequired,
  loginViaGoogleForm: PT.func.isRequired,
};

export default SingInForm;
