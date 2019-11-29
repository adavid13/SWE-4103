import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  loadUsers,
  saveUser,
  deleteUser
} from "../../redux/actions/userActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import SideMenu from "./SideMenu";
import { Pages } from "../../constants";
import Spinner from "../common/spinner/Spinner";
import StandardDialog from "../common/dialog";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    padding: "0 1.5em"
  },
  toolbar: theme.mixins.toolbar
}));

function AdministrationPage({ deleteUser, loadUsers, saveUser, users }) {
  const [activePage, setActivePage] = useState(Pages.MANAGE_ACCOUNTS);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);

  const classes = useStyles();
  const columns = [
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Primary Phone", field: "primaryPhoneNumber" },
    { title: "Secondary Phone", field: "secondaryPhoneNumber" },
    { title: "Email", field: "email" }
  ];

  const loadAsync = async () => {
    try {
      setLoadingUsers(true);
      await loadUsers();
    } catch (e) {
      console.log("error");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    console.log("Loading Users");
    loadAsync();
  }, []);

  const handleSideMenuClick = page => {
    setActivePage(page);
  };

  const tranformData = () => {
    return users.map(user => {
      const {
        id,
        firstName,
        lastName,
        primaryPhoneNumber,
        secondaryPhoneNumber,
        email
      } = user;
      return {
        id,
        firstName,
        lastName,
        primaryPhoneNumber,
        secondaryPhoneNumber,
        email
      };
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleReset = () => {
    try {
      const updatedUser = {
        ...selectedUser,
        password: "password",
        newUser: true
      };
      saveUser(updatedUser).then(() => {
        toast.success("Password Reset successfully.");
      });
      handleClose();
    } catch (error) {
      console.log("fail", error);
    }
  };

  const getConfirmationResetDialog = () => {
    return (
      <StandardDialog
        dialogTitle="Reset Confirmation"
        buttonGroup={{
          primaryText: "CONFIRM",
          onClickPrimary: handleReset,
          secondaryText: "CANCEL",
          onClickSecondary: handleClose
        }}
        open={openDialog}
      >
        {selectedUser && (
          <Typography gutterBottom>
            {"Are you sure you want to reset the password of " +
              selectedUser.firstName +
              " " +
              selectedUser.lastName +
              "?"}
          </Typography>
        )}
      </StandardDialog>
    );
  };

  const getActivePage = () => {
    switch (activePage) {
      case Pages.SEND_NOTIFICATION:
        return <div> SEND_NOTIFICATION </div>;
      case Pages.MANAGE_ACCOUNTS:
      default:
        return (
          <MaterialTable
            title="Manage Accounts"
            columns={columns}
            data={tranformData()}
            options={{ pageSize: 10 }}
            editable={{
              onRowAdd: async newData => {
                try {
                  const newUser = {
                    ...newData,
                    admin: false
                  };
                  await saveUser(newUser).then(() => {
                    toast.success("Account created successfully.");
                  });
                } catch (error) {
                  console.log("fail", error);
                }
              },
              onRowUpdate: async newData => {
                try {
                  const updatedUser = {
                    ...users.find(user => user.id === newData.id),
                    ...newData
                  };
                  saveUser(updatedUser).then(() => {
                    toast.success("Account updated successfully.");
                  });
                } catch (error) {
                  console.log("fail", error);
                }
              },
              onRowDelete: async user => {
                try {
                  deleteUser(user).then(() => {
                    toast.success("Account deleted successfully.");
                  });
                } catch (error) {
                  console.log("fail", error);
                }
              }
            }}
            actions={[
              {
                icon: "lock_open",
                tooltip: "Reset Password",
                onClick: (event, rowData) => {
                  console.log(event, rowData);
                  setSelectedUser(rowData);
                  setOpenDialog(true);
                }
              }
            ]}
          />
        );
    }
  };

  return (
    <div className={classes.root}>
      <SideMenu onSideMenuClick={handleSideMenuClick} />
      <main className={classes.content}>
        {loadingUsers ? <Spinner /> : getActivePage()}
        {getConfirmationResetDialog()}
      </main>
    </div>
  );
}

AdministrationPage.propTypes = {
  users: PropTypes.array.isRequired,
  loadUsers: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUsers: bindActionCreators(loadUsers, dispatch),
    deleteUser: bindActionCreators(deleteUser, dispatch),
    saveUser: bindActionCreators(saveUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdministrationPage);
