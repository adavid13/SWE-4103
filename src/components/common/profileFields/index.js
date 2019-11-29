import React from "react";
import { withStyles } from "@material-ui/styles";
import InputMask from "react-input-mask";
import PropTypes from "prop-types";
import styles from "./styles";
import TextField from "@material-ui/core/TextField";

const ProfileFields = props => {
  const { classes, user, onFieldChange, hideEmailField, errors } = props;
  const { firstName, lastName, primaryPhoneNumber, secondaryPhoneNumber, email } = user;
  const { firstNameError, firstNameErrorText, lastNameError, lastNameErrorText,
    primaryPhoneError, primaryPhoneErrorText, secondaryPhoneError, secondaryPhoneErrorText,
    emailError, emailErrorText } = errors;

  return (
    <div className={classes.formContainer}>
      <TextField
        id="outlined-fname"
        className={classes.textField}
        variant="outlined"
        type="text"
        label="First Name"
        error={firstNameError}
        helperText={firstNameError ? firstNameErrorText : ""}
        value={firstName}
        onChange={onFieldChange("firstName")}
      />
      <TextField
        id="outlined-lname"
        className={classes.textField}
        variant="outlined"
        type="text"
        label="Last Name"
        error={lastNameError}
        helperText={lastNameError ? lastNameErrorText : ""}
        value={lastName}
        onChange={onFieldChange("lastName")}
      />
      <InputMask
        mask="+1(999)999-9999"
        value={primaryPhoneNumber}
        onChange={onFieldChange("primaryPhoneNumber")}
        className={classes.textField}
      >
        <TextField
          id="outlined-password"
          className={classes.textField}
          variant="outlined"
          type="text"
          label="Primary Phone"
          error={primaryPhoneError}
          helperText={primaryPhoneError ? primaryPhoneErrorText : ""}
        />
      </InputMask>
      <InputMask
        mask="+1(999)999-9999"
        value={secondaryPhoneNumber}
        onChange={onFieldChange("secondaryPhoneNumber")}
        className={classes.textField}
      >
        <TextField
          id="outlined-confpassword"
          className={classes.textField}
          variant="outlined"
          type="text"
          label="Secondary Phone"
          error={secondaryPhoneError}
          helperText={secondaryPhoneError ? secondaryPhoneErrorText : ""}
        />
      </InputMask>
      {!hideEmailField && <TextField
        id="outlined-confpassword"
        className={classes.textField}
        variant="outlined"
        type="text"
        label="Email"
        value={email}
        error={emailError}
        helperText={emailError ? emailErrorText : ""}
        onChange={onFieldChange("email")}
      />}
    </div>
  );
}

ProfileFields.propTypes = {
  classes: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  hideEmailField: PropTypes.bool,
  errors: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileFields);
