import React from 'react';
import PropTypes from "prop-types";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MailIcon from '@material-ui/icons/Mail';
import useStyles from "./SideMenuStyles";
import { Pages } from "../../constants";

const SideMenu = props => {
  const { onSideMenuClick } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button onClick={() => { onSideMenuClick(Pages.MANAGE_ACCOUNTS) }}>
            <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
            <ListItemText primary="Manage Accounts" />
          </ListItem>
          <ListItem button onClick={() => { onSideMenuClick(Pages.SEND_NOTIFICATION) }}>
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary="Send Notification" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

SideMenu.propTypes = {
  onSideMenuClick: PropTypes.func.isRequired
};

export default SideMenu;
