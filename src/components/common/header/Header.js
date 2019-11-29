import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/styles";
import { logout } from "../../../redux/actions/authActions";
import HeaderButton from "./HeaderButton";
import styles from "./HeaderStyles";

const Header = props => {
  const { classes, history, location, logout, user } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Box className={classes.buttonGroup}>
            <HeaderButton
              onClick={() => history.push("/home")}
              isSelected={location.pathname === "/home"}
              text="Schedule"
            />
            <HeaderButton
              onClick={() => history.push("/reports")}
              isSelected={location.pathname === "/reports"}
              text="Reports"
            />
            {!!user.admin && (
              <HeaderButton
                onClick={() => history.push("/admin")}
                isSelected={location.pathname === "/admin"}
                text="Administration"
              />
            )}
          </Box>
          <Button
            onClick={handleMenu}
            color="inherit"
            className={classes.button}
          >
            <Typography variant="h6" className={classes.username}>
              {user.firstName}
            </Typography>
            <AccountCircle className={classes.avatar} />
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                history.push("/profile");
                handleClose();
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                history.push("/");
                handleClose();
                logout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    authState: state.auth.authState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch)
  };
}

const HeaderWrapped = connect(mapStateToProps, mapDispatchToProps)(Header);

export default withRouter(withStyles(styles)(HeaderWrapped));
