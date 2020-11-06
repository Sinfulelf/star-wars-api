import React, { PureComponent, Fragment } from "react";

import { Divider } from "semantic-ui-react";

import NavigationBar from "./NavigationBar";

export default class LayoutComponent extends PureComponent {
  render() {
    return (
      <div className="layout-container">
        <NavigationBar className="layout-container__navigation-bar" />
        <Divider fitted />
        <div className="layout-container__content"> {this.props.children}</div>
      </div>
    );
  }
}
