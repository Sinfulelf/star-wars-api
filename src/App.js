import React, { PureComponent } from "react";
import { Route, Redirect, Switch } from "react-router";
import { Provider } from "react-redux";

import "./style/index.scss";
import "semantic-ui-css/semantic.min.css";

import store from "./store";

import { RouteData } from "./data";

import { checkCookiesOnExists } from "./helpers";

import AuthPage from "./components/AuthorizePage";
import PeopleListPage from "./components/PeopleListPage";

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path={RouteData.Login} component={AuthPage} />
          <InnerRoute
            component={
              <Route
                exact
                path={[RouteData.Base, RouteData.People]}
                component={PeopleListPage}
              />
            }
          />
        </Switch>
      </Provider>
    );
  }
}

const InnerRoute = ({ component }) =>
  checkCookiesOnExists() ? (
    component
  ) : (
    <Redirect to={{ pathname: RouteData.Login }} />
  );
