import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import LoginForm from "./login";
import AccountDetails from "./setAccountDetails";
import SetPassword from "./setPassword";
import SetContactMethod from "./setContactMethod";
import styles from "./styles";
import { AUTH_STATES } from "../../redux/reducers/authReducer";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, authState } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.photoSide}>
          <img
            className={classes.logo}
            src={require("../../assets/logo.png")}
          />
          <img className={classes.hub} src={require("../../assets/hub.png")} />
        </div>
        <div className={classes.formSide}>
          {authState == AUTH_STATES.LOGIN && (
            <LoginForm history={this.props.history} />
          )}
          {authState == AUTH_STATES.SET_PASSWORD && (
            <SetPassword history={this.props.history} />
          )}
          {authState == AUTH_STATES.SET_DETAILS && (
            <AccountDetails history={this.props.history} />
          )}
          {authState == AUTH_STATES.SET_CONTACT_METHOD && (
            <SetContactMethod history={this.props.history} />
          )}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  authState: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    authState: state.auth.authState
  };
}
const LoginWrapped = connect(
  mapStateToProps,
  null
)(Login);

export default withStyles(styles)(LoginWrapped);
