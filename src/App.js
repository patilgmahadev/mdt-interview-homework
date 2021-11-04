import React, { Fragment, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "babel-polyfill";

import { Login as LoginComponent } from "./modules/Login";
import { Dashboard as DashboardComponent } from "./modules/Dashboard";
import { BalTransfer as BalTransferComponent } from "./modules/BalTransfer";

import { isAuthenticated } from "./common/Utility";
import Footer from "./common/components/Footer";
import Header from "./common/components/Header";

function App() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={LoginComponent} />
              <Route exact path="/login" component={LoginComponent} />
              <Route
                exact
                path="/dashboard"
                render={(props) =>
                  isAuthenticated() ? (
                    <DashboardComponent {...props} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/transfer"
                render={(props) =>
                  isAuthenticated() ? (
                    <BalTransferComponent {...props} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route exact path="*">
                <Redirect to="/login" />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
