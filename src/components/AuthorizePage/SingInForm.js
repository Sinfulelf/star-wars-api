import React from "react";
import { Link } from "react-router-dom";
import PT from "prop-types";

import { Form, Button, Message, Divider } from "semantic-ui-react";

const SingInForm = ({ visible, setVisible }) => (
  <Form className="firebase-singin-form" widths="equal">
    <Form.Input
      icon="user"
      iconPosition="left"
      label="Username"
      placeholder="Username"
    />
    <Form.Input
      icon="lock"
      iconPosition="left"
      label="Password"
      type="password"
    />

    <Button
      content="Login via firebase"
      primary
      style={{ marginTop: "1.5em", marginBottom: "2.5em" }}
    />
    <Message>
      First time here?&nbsp;
      <Link to="#" style={{ maginLeft: ".3em" }} onClick={setVisible}>
        Sing Up now!
      </Link>
    </Message>
  </Form>
);

SingInForm.propTypes = {};

export default SingInForm;
