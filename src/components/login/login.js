import React from "react";
import { withStyles } from "@material-ui/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
import PropTypes from "prop-types";
import styles from "./styles";
import { bindActionCreators } from "redux";
import { login, setAuthState } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { AUTH_STATES } from "../../redux/reducers/authReducer";
import ButtonGroup from "../common/buttonGroup";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        email: "",
        password: ""
      },
      errors: {}
    };
  }

  validatateFields = () => {
    const { email, password } = this.state.values;
    if (email === "") {
      this.setState({
        errors: {
          ...this.state.errors,
          emailError: true,
          emailErrorText: "This field is required."
        }
      });
      return true;
    }
    if (password === "") {
      this.setState({
        errors: {
          ...this.state.errors,
          passwordError: true,
          passwordErrorText: "This field is required."
        }
      });
      return true;
    }
    return false;
  };

  clearValidations = () => {
    this.setState({ errors: {} });
  };

  handleLogin = async () => {
    const { email, password } = this.state.values;
    const containErrors = this.validatateFields();
    if (containErrors) return;

    try {
      await this.props.login(email, password);
    }
    catch(err) {
      this.setState({
        errors: {
          emailError: true,
          passwordError: true,
          passwordErrorText: "Login failed. Invalid email or password."
        }
      });
      return;
    }
    if (this.props.user) {
      if (!this.props.user.newUser) {
        //TODO: Modify IF logic to be if its a first time user
        //not first time
        this.props.setAuthState(AUTH_STATES.AUTHENTICATED);
        this.props.history.push("/home");
      } else {
        //first time
        this.props.setAuthState(AUTH_STATES.SET_PASSWORD);
      }
    }
  };
  handleChange = prop => event => {
    const values = this.state.values;
    this.clearValidations();
    this.setState({ values: { ...values, [prop]: event.target.value } });
  };
  render() {
    const { classes } = this.props;
    const { values, errors } = this.state;
    const { email, password } = values;
    const {
      emailError,
      emailErrorText,
      passwordError,
      passwordErrorText
    } = errors;

    return (
      <div className={classes.formContainer}>
        <Typography className={classes.header}>Welcome</Typography>
        <Typography
          className={classes.helperText}
          style={{
            margin: "auto",
            maxWidth: "300px"
          }}
        >
          In order to login enter your email and password below:
        </Typography>
        <TextField
          id="outlined-adornment-email"
          className={classes.textField}
          variant="outlined"
          type={"text"}
          label="Email"
          value={email}
          error={emailError}
          helperText={emailError ? emailErrorText : ""}
          onChange={this.handleChange("email")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon color="disabled" className={classes.icon}>
                  <AccountCircle />
                </Icon>
              </InputAdornment>
            )
          }}
        />
        <TextField
          id="outlined-adornment-password"
          className={classes.textField}
          variant="outlined"
          type={"password"}
          label="Password"
          value={password}
          error={passwordError}
          helperText={passwordError ? passwordErrorText : ""}
          onChange={this.handleChange("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon color="disabled" className={classes.icon}>
                  <Lock />
                </Icon>
              </InputAdornment>
            )
          }}
        />
        <ButtonGroup primaryText="Login" onClickPrimary={this.handleLogin} />
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  setAuthState: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
  authState: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    authState: state.auth.authState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
    setAuthState: bindActionCreators(setAuthState, dispatch)
  };
}
const LoginWrapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
export default withStyles(styles)(LoginWrapped);
