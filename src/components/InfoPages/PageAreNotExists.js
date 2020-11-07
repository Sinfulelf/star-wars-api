import React from "react";
import { Link } from "react-router-dom";
import {
  Segment,
  Button,
  Header,
  Divider,
  Grid,
  Icon,
} from "semantic-ui-react";

import { RouteData } from "../../data";

const PageAreNotExist = () => (
  <Segment
    style={{
      maxWidth: 680,
      height: 200,
      margin: "3em auto 0",
      padding: "3em",
    }}
  >
    <Header className="not-exist-label" size="huge">
      Sorry, that page does not exist.
    </Header>
    <Divider />
    <Grid centered columns={3}>
      <Grid.Column>
        <Button
          color="blue"
          as={Link}
          to={RouteData.Base}
          style={{ marginTop: ".85em", width: 125 }}
        >
          <Icon name="log out" size="large" flipped="horizontally" />
          Back to main
        </Button>
      </Grid.Column>
    </Grid>
  </Segment>
);

export default PageAreNotExist;
