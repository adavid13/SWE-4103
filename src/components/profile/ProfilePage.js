import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styles from "./ProfilePageStyles";
import ProfileFields from "../common/profileFields";
import ButtonGroup from "../common/buttonGroup";
import { updateUser } from "../../redux/actions/authActions";
import { saveUser } from "../../redux/actions/userActions";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const ProfilePage = props => {
  const { classes, saveUser, user } = props;
  const [state, setState] = useState({
    values: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      primaryPhoneNumber: user.primaryPhoneNumber || "",
      secondaryPhoneNumber: user.secondaryPhoneNumber || "",
      email: user.email || "",
      selection1: user.callMethod,
      selection2: user.notificationMethod
    }
  });

  const [errors, setError] = useState({});
  const {
    firstName,
    lastName,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    email,
    selection1,
    selection2
  } = state.values;

  const validatateFields = () => {
    if (firstName === "") {
      setError({
        ...errors,
        firstNameError: true,
        firstNameErrorText: "This field is required."
      });
      return true;
    }
    if (lastName === "") {
      setError({
        ...errors,
        lastNameError: true,
        lastNameErrorText: "This field is required."
      });
      return true;
    }
    if (primaryPhoneNumber === "") {
      setError({
        ...errors,
        primaryPhoneError: true,
        primaryPhoneErrorText: "This field is required."
      });
      return true;
    }
    if (email === "") {
      setError({
        ...errors,
        emailError: true,
        emailErrorText: "This field is required."
      });
      return true;
    }
    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setError({
        ...errors,
        emailError: true,
        emailErrorText: "Email format is incorrect."
      });
      return true;
    }
    if (!firstName.match(/^([a-zA-Z]+([.'-]{0,1})([\s]{0,1}))*$/i)) {
      setError({
        ...errors,
        firstNameError: true,
        firstNameErrorText: "First name is invalid."
      });
      return true;
    }
    if (!lastName.match(/^([a-zA-Z]+([.'-]{0,1})([\s]{0,1}))*$/i)) {
      setError({
        ...errors,
        lastNameError: true,
        lastNameErrorText: "Last name is invalid."
      });
      return true;
    }
    return false;
  };

  const clearValidations = () => {
    setError({});
  };

  const handleSave = () => {
    const containErrors = validatateFields();
    if (containErrors) return;

    const updatedUser = {
      ...user,
      firstName,
      lastName,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      email,
      callMethod: selection1,
      notificationMethod: selection2
    };
    props.updateUser(updatedUser);
    saveUser(updatedUser).then(() => {
      toast.success("Profile saved.");
    });
  };

  const handleChange = prop => event => {
    const { values } = state;
    setState({ values: { ...values, [prop]: event.target.value } });
    clearValidations();
  };

  const handleRadioChange1 = event => {
    const { values } = state;
    setState({ values: { ...values, ["selection1"]: event.target.value } });
  };

  const handleRadioChange2 = event => {
    const { values } = state;
    setState({ values: { ...values, ["selection2"]: event.target.value } });
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <div className={classes.pictureContainer}>
        <AccountCircle className={classes.avatar} />
        <Typography component="div" className={classes.title}>
          {`${user.firstName} ${user.lastName}`}
        </Typography>
      </div>
      <ProfileFields
        user={state.values}
        onFieldChange={handleChange}
        errors={errors}
      />
      <div className={classes.pictureContainer2}>
        <Typography className={classes.helperText} style={{ margin: "auto" }}>
          Preferred method of contact for the calling service?
        </Typography>
        <FormControl
          component="fieldset"
          className={classes.radioButtonFormControl}
          style={{ margin: "auto" }}
        >
          <RadioGroup
            aria-label="Service calls"
            name="Method of contact"
            value={state.values.selection1}
            onChange={handleRadioChange1}
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
      </div>
      <div className={classes.pictureContainer3}>
        <Typography className={classes.helperText} style={{ margin: "auto" }}>
          Preferred method of contact for notifications?
        </Typography>
        <FormControl
          component="fieldset"
          className={classes.radioButtonFormControl}
          style={{ margin: "auto" }}
        >
          <RadioGroup
            aria-label="notifications"
            name="Method of contact"
            value={state.values.selection2}
            onChange={handleRadioChange2}
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
      </div>
      <ButtonGroup primaryText="SAVE" onClickPrimary={handleSave} />
    </Container>
  );
};

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  saveUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    authState: state.auth.authState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: bindActionCreators(updateUser, dispatch),
    saveUser: bindActionCreators(saveUser, dispatch)
  };
}

const ProfilePageWrapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);

export default withStyles(styles)(ProfilePageWrapped);
