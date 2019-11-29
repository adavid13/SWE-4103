import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./common/header/Header";
import HomePage from "./home/HomePage";
import Reports from "./reports/reports";
import AdministrationPage from "./administration/AdministrationPage";
import Profile from "./profile/ProfilePage";
import PageNotFound from "./PageNotFound";
import Login from "./login";
import { COLORS } from "./common/styles/styles";
import SecureRoute from "../components/common/secureRoute/secureRoot";

function App({ location }) {
  return (
    <div
      style={
        location.pathname == "/"
          ? {
              backgroundColor: COLORS.LIGHT_BLUE,
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }
          : {
              height: "100vh"
            }
      }
    >
      {location.pathname != "/" && <Header />}
      <div
        style={
          location.pathname == "/"
            ? {
                padding: "0 3.125em",
                display: "inline-block"
              }
            : {
                marginTop: "6em",
                padding: "0"
              }
        }
      >
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={HomePage} />
          <Route path="/reports" component={Reports} />
          <SecureRoute path="/admin" component={AdministrationPage} />
          <Route path="/profile" component={Profile} />
          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
}

App.propTypes = {
  location: PropTypes.object.isRequired
};
export default withRouter(App);
