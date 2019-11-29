import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
class SecureRoute extends React.Component {
  render() {
    const { component, path, user } = this.props;
    return (
      <>
        {user.admin ? (
          <Route path={path} component={component} />
        ) : (
          <Redirect to={"/home"} />
        )}
      </>
    );
  }
}

SecureRoute.propTypes = {
  user: PropTypes.object,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    authState: state.auth.authState
  };
}

export default connect(
  mapStateToProps,
  null
)(SecureRoute);
