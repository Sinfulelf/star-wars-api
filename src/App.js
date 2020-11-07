import React, { PureComponent } from "react";
import { Route, Redirect, Switch } from "react-router";
import { Provider } from "react-redux";

import "./style/index.scss";
import "semantic-ui-css/semantic.min.css";

import store from "./store";

import { RouteData } from "./data";

import { checkCookiesOnExists } from "./helpers";

import Layout from "./components/generaComponents/Layout";

import PageAreNotExist from "./components/InfoPages/PageAreNotExists";

import AuthPage from "./components/AuthorizePage";
import PeopleListPage from "./components/PeoplePage";

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path={RouteData.Login} component={AuthPage} />
          <Layout>
            <Switch>
              <InnerRoute
                exact
                path={[RouteData.Base, RouteData.People, RouteData.Favorites]}
                component={PeopleListPage}
              />
              <InnerRoute component={PageAreNotExist} />
            </Switch>
          </Layout>
        </Switch>
      </Provider>
    );
  }
}

const InnerRoute = ({ exact, path, component }) => {
  return checkCookiesOnExists() ? (
    <Route exact={exact} path={path} component={component} />
  ) : (
    <Redirect to={{ pathname: RouteData.Login }} />
  );
};
