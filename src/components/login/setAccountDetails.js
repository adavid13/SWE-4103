import React from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { setAuthState, updateUser } from "../../redux/actions/authActions";
import { bindActionCreators } from "redux";
import { AUTH_STATES } from "../../redux/reducers/authReducer";
import ButtonGroup from "../common/buttonGroup";
import ProfileFields from "../common/profileFields";

class AccountDetails extends React.Component {
  constructor(props) {
    super(props);
    const { firstName, lastName, primaryPhoneNumber, secondaryPhoneNumber } = props.user;

    this.state = {
      values: {
        firstName: firstName || "",
        lastName: lastName || "",
        primaryPhoneNumber: primaryPhoneNumber || "",
        secondaryPhoneNumber: secondaryPhoneNumber || ""
      },
      errors: {}
    };
  }

 validatateFields = () => {
   const { firstName, lastName, primaryPhoneNumber } = this.state.values;
    if (firstName === "") {
      this.setState({
        errors:{
        ...this.state.errors,
        firstNameError: true,
        firstNameErrorText: "This field is required."
      }
    });
      return true;
    }
    if(lastName === ""){
      this.setState({
        errors: {
          ...this.state.errors,
          lastNameError: true,
          lastNameErrorText: "This field is required."
        }
      });
      return true;
    }
    if(primaryPhoneNumber === ""){
      this.setState({
        errors: {
          ...this.state.errors,
          primaryPhoneError: true,
          primaryPhoneErrorText: "This field is required."
        }
      });
      return true;
    }
    if(!firstName.match(/^([a-zA-Z]+([.'-]{0,1})([\s]{0,1}))*$/i)){
      this.setState({
        errors: {
          ...this.state.errors,
          firstNameError: true,
          firstNameErrorText: "First name is invalid."
        }
      });
      return true;
    }
    if(!lastName.match(/^([a-zA-Z]+([.'-]{0,1})([\s]{0,1}))*$/i)){
      this.setState({
        errors: {
          ...this.state.errors,
          lastNameError: true,
          lastNameErrorText: "Last name is invalid."
        }
      });
      return true;
    }
    return false;
  }

  clearValidations = () => {
    this.setState({ errors: {} });
  }

  handleSave = () => {
    const { firstName, lastName, primaryPhoneNumber, secondaryPhoneNumber } = this.state.values;
    const { user } = this.props;
    const containErrors = this.validatateFields();
    if (containErrors) return;

    this.props.setAuthState(AUTH_STATES.SET_CONTACT_METHOD);
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      primaryPhoneNumber,
      secondaryPhoneNumber
    };

    this.props.updateUser(updatedUser);
  }
  handleChange = prop => event => {
    const values = this.state.values;
    this.clearValidations();
    this.setState({ values: { ...values, [prop]: event.target.value } });
  }

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
          Provide your information in the fields below
        </Typography>
        <ProfileFields
          user={this.state.values}
          onFieldChange={this.handleChange}
          errors={this.state.errors}
          hideEmailField
        />
        <ButtonGroup primaryText="NEXT" onClickPrimary={this.handleSave} />
      </div>
    );
  }
}

AccountDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  setAuthState: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  errors: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthState: bindActionCreators(setAuthState, dispatch),
    updateUser: bindActionCreators(updateUser, dispatch)
  };
}

const LoginWrapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDetails);
export default withStyles(styles)(LoginWrapped);
