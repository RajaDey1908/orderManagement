import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "../Pages/style.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import DefaultLayout from "../Layout/DefaultLayout";

import Dashboard from "../Pages/Dashboard";

export default class Routing extends React.Component {
  render() {
    return (
      <Router>
        <DefaultLayout>
          <Switch>
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </DefaultLayout>
      </Router>
    );
  }
}
