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

import Map from "../Pages/Map";
import Dashboard from "../Pages/Dashboard";

export default class Routing extends React.Component {
  render() {
    return (
      <Router>
        <DefaultLayout>
          <Switch>
            <Route exact path="/" component={Map} />
            {/* <Route exact path="/" render={() => { return (<Redirect to="/map" />) }} /> */}
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </DefaultLayout>
      </Router>
    );
  }
}
