import React from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { updateUser, setAuthState } from "../../redux/actions/authActions";
import { saveUser } from "../../redux/actions/userActions";
import { bindActionCreators } from "redux";
import { AUTH_STATES } from "../../redux/reducers/authReducer";
import ButtonGroup from "../common/buttonGroup";

class SetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        password: "",
        confirm_password: ""
      }
    };
  }
  handleSave = async () => {
    const { user, saveUser } = this.props;
    const { password } = this.state.values;
    this.props.setAuthState(AUTH_STATES.SET_DETAILS);
    const updatedUser = { ...user, password };
    this.props.updateUser(updatedUser);
    await saveUser(updatedUser);
  };
  handleChange = prop => event => {
    const values = this.state.values;
    this.setState({ values: { ...values, [prop]: event.target.value } });
  };
  render() {
    const { classes } = this.props;
    const { password, confirm_password } = this.state.values;
    return (
      <div className={classes.formContainer}>
        <Typography
          className={classes.header}
          style={{
            fontSize: 40,
            display: "ruby"
          }}
        >
          Change Password
        </Typography>
        <Typography
          className={classes.helperText}
          style={{
            margin: "auto"
          }}
        >
          Please choose a new password.
        </Typography>
        <TextField
          id="outlined-password"
          className={classes.textField}
          variant="outlined"
          type={"password"}
          label="New Password"
          value={password}
          onChange={this.handleChange("password")}
        />
        <TextField
          id="outlined-cpassword"
          className={classes.textField}
          variant="outlined"
          type={"password"}
          label="Confirm Password"
          value={confirm_password}
          onChange={this.handleChange("confirm_password")}
        />
        <ButtonGroup primaryText="Save" onClickPrimary={this.handleSave} />
      </div>
    );
  }
}

SetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  saveUser: PropTypes.func.isRequired,
  setAuthState: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: bindActionCreators(updateUser, dispatch),
    setAuthState: bindActionCreators(setAuthState, dispatch),
    saveUser: bindActionCreators(saveUser, dispatch)
  };
}

const SetPasswordWrapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(SetPassword);
export default withStyles(styles)(SetPasswordWrapped);
