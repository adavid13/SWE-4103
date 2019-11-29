import React from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Typography } from "@material-ui/core";
import { updateUser, setAuthState } from "../../redux/actions/authActions";
import { saveUser } from "../../redux/actions/userActions";
import { bindActionCreators } from "redux";
import { AUTH_STATES } from "../../redux/reducers/authReducer";
import ButtonGroup from "../common/buttonGroup";

class SetContactMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection1: "primaryPhoneNumber",
      selection2: "primaryPhoneNumber"
    };
  }
  handleChange1 = event => {
    this.setState({ selection1: event.target.value });
  };
  handleChange2 = event => {
    this.setState({ selection2: event.target.value });
  };
  handleSave = async () => {
    const { user, saveUser } = this.props;
    const updatedUser = {
      ...user,
      callMethod: this.state.selection1,
      notificationMethod: this.state.selection2,
      newUser: false
    };
    this.props.updateUser(updatedUser);
    await saveUser(updatedUser);
    this.props.setAuthState(AUTH_STATES.AUTHENTICATED);
    this.props.history.push("/home");
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.formContainer}>
        <Typography
          className={classes.header}
          style={{
            fontSize: 40,
            display: "ruby"
          }}
        >
          Volunteer Information
        </Typography>
        <Typography className={classes.helperText} style={{ margin: "auto" }}>
          Preferred method of contact for service calls?
        </Typography>
        <FormControl
          component="fieldset"
          className={classes.radioButtonFormControl}
          style={{ margin: "auto" }}
        >
          <RadioGroup
            aria-label="Method of contact for service calls"
            name="Method of contact for service calls"
            value={this.state.selection1}
            onChange={this.handleChange1}
          >
            <FormControlLabel
              value="primaryPhoneNumber"
              control={<Radio />}
              label="Primary Phone Number"
            />
            <FormControlLabel
              value="secondaryPhoneNumber"
              control={<Radio />}
              label="Secondary Phone Number"
            />
          </RadioGroup>
        </FormControl>
        <Typography className={classes.helperText} style={{ margin: "auto" }}>
          Preferred method of contact for notifications?
        </Typography>
        <FormControl
          component="fieldset"
          className={classes.radioButtonFormControl}
          style={{ margin: "auto" }}
        >
          <RadioGroup
            aria-label="Method of contact for notifications"
            name="Method of contact for notifications"
            value={this.state.selection2}
            onChange={this.handleChange2}
          >
            <FormControlLabel
              value="primaryPhoneNumber"
              control={<Radio />}
              label="Primary Phone Number"
            />
            <FormControlLabel
              value="secondaryPhoneNumber"
              control={<Radio />}
              label="Secondary Phone Number"
            />
            <FormControlLabel value="email" control={<Radio />} label="Email" />
          </RadioGroup>
        </FormControl>
        <ButtonGroup primaryText="Save" onClickPrimary={this.handleSave} />
      </div>
    );
  }
}

SetContactMethod.propTypes = {
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

const LoginWrapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(SetContactMethod);
export default withStyles(styles)(LoginWrapped);
