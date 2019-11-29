import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";
import "./Calendar.scss";
import styles from "./CalendarStyles";
import { withStyles } from "@material-ui/styles";
import StandardDialog from "../common/dialog";
import Spinner from "../common/spinner/Spinner";
import {
  loadShifts,
  saveShift,
  cancelShift
} from "../../redux/actions/shiftActions";
import { Typography } from "@material-ui/core";
import { ShiftOperations } from "../../constants";
import { setGoogleAuthenticated } from "../../redux/actions/authActions";
import {
  sendNewEvents,
  CLIENT_ID,
  API_KEY,
  DISCOVERY_DOCS,
  SCOPES
} from "./GoogleCalendarSync";

const Calendar = ({
  shifts,
  user,
  loading,
  loadShifts,
  saveShift,
  cancelShift,
  setGoogleAuthenticated,
  googleAuthenticated,
  classes
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [loadingShifts, setLoadingShifts] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [shiftsInternal, setShiftsInternal] = useState(shifts);
  const [modifiedShifts, setModifiedShifts] = useState([]);

  const loadShiftsAsync = async () => {
    try {
      setLoadingShifts(true);
      await loadShifts();
    } catch (e) {
      toast.error("Error loading shifts");
    } finally {
      setLoadingShifts(false);
    }
  };

  useEffect(() => {
    //eslint-disable-next-line no-undef
    gapi.load("client:auth2", initClient);
    loadShiftsAsync();
  }, []);

  function updateSigninStatus(isSignedIn) {
    setGoogleAuthenticated(isSignedIn);
  }

  //init google api client
  function initClient() {
    //eslint-disable-next-line no-undef
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      })
      .then(
        function() {
          // Listen for sign-in state changes.
          //eslint-disable-next-line no-undef
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          //eslint-disable-next-line no-undef
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function(error) {
          console.log("error", error);
        }
      );
  }

  const handleSync = () => {
    if (!googleAuthenticated) {
      //eslint-disable-next-line no-undef
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          sendNewEvents(shifts, user);
        });
    } else {
      sendNewEvents(shifts, user);
    }
  };
  const handleSave = async () => {
    const updateShift = shifts.find(
      shift => shift.id === parseInt(selectedShift.id)
    );
    try {
      saveShift(updateShift, ShiftOperations.ASSIGN_TO_SHIFT).then(() => {
        toast.success("Shift selected successfully.");
      });
    } catch (error) {
      console.log("fail", error);
    }
    setOpenDialog(false);
  };

  const handleCancel = async () => {
    const updateShift = shifts.find(
      shift => shift.id === parseInt(selectedShift.id)
    );
    try {
      cancelShift(updateShift, ShiftOperations.REMOVE_FROM_SHIFT).then(() => {
        toast.error("Shift cancelled successfully."); // Using toast.error to show the toast in red
      });
    } catch (error) {
      console.log("fail", error);
    }
    setOpenCancelDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setOpenCancelDialog(false);
    setSelectedShift(null);
  };

  const handleDragAndDrop = element => {
    const shiftToUpdate = shifts.find(
      shift => shift.id === parseInt(element.event.id)
    );
    const updatedShift = {
      ...shiftToUpdate,
      start: element.event.start,
      end: element.event.end
    };
    const updatedShifts = shiftsInternal.map(shift => {
      if (shift.id === updatedShift.id) {
        return updatedShift;
      }
      return shift;
    });
    if (modifiedShifts.filter(id => id === updatedShifts.id).length === 0) {
      setModifiedShifts([...modifiedShifts, updatedShift.id]);
    }
    setShiftsInternal(updatedShifts);
  };

  const handleManageShift = () => {
    if (user.admin) {
      setEditMode(!editMode);
      setShiftsInternal(shifts);
      setModifiedShifts([]);
    }
  };

  const handleManageShiftCancel = () => {
    setEditMode(!editMode);
    setShiftsInternal(shifts);
    setModifiedShifts([]);
  };

  const handleManageShiftSave = () => {
    setEditMode(!editMode);
    const shiftsToUpdate = shiftsInternal.filter(shift => {
      return modifiedShifts.find(modifiedShift => modifiedShift === shift.id);
    });
    try {
      shiftsToUpdate.map(shift =>
        saveShift(shift, ShiftOperations.UPDATE_DATETIME)
      );
    } catch (error) {
      console.log("fail", error);
    }
  };

  const handleEventClick = element => {
    if (element.event.title === "Unavailable") {
      return;
    }
    if (element.event.title != "Available" && user.isAdmin == 1) {
      setOpenCancelDialog(true);
      setSelectedShift(element.event);
      return;
    }
    if (element.event.title === user.firstName + " " + user.lastName) {
      setOpenCancelDialog(true);
      setSelectedShift(element.event);
    } else if (element.event.title === "Available") {
      setOpenDialog(true);
      setSelectedShift(element.event);
    } else if (user.admin) {
      setOpenCancelDialog(true);
      setSelectedShift(element.event);
    }
  };

  const getCancellationDialog = () => {
    return (
      <StandardDialog
        dialogTitle="Shift Cancellation"
        buttonGroup={{
          primaryText: "CONFIRM",
          onClickPrimary: handleCancel,
          secondaryText: "CLOSE",
          onClickSecondary: handleClose
        }}
        open={openCancelDialog}
      >
        {selectedShift && (
          <Typography gutterBottom>
            {`Do you want to cancel your shift on ${moment(
              selectedShift.start
            ).format("MMMM Do YYYY")}
          from ${moment(selectedShift.start).format("h:mm a")} to ${moment(
              selectedShift.end
            ).format("h:mm a")}?`}
          </Typography>
        )}
      </StandardDialog>
    );
  };

  const getConfirmationDialog = () => {
    return (
      <StandardDialog
        dialogTitle="Shift Confirmation"
        buttonGroup={{
          primaryText: "CONFIRM",
          onClickPrimary: handleSave,
          secondaryText: "CANCEL",
          onClickSecondary: handleClose
        }}
        open={openDialog}
      >
        {selectedShift && (
          <Typography gutterBottom>
            {`You have selected a shift on ${moment(selectedShift.start).format(
              "MMMM Do YYYY"
            )}
          from ${moment(selectedShift.start).format("h:mm a")} to ${moment(
              selectedShift.end
            ).format("h:mm a")}`}
          </Typography>
        )}
        <Typography>Do you want to confirm this shift?</Typography>
      </StandardDialog>
    );
  };

  return (
    <div className="demo-app">
      {loadingShifts ? (
        <Spinner />
      ) : (
        <>
          <div
            className="demo-app-calendar"
            style={{ border: editMode ? "5px solid red" : "none" }}
          >
            {loading ? (
              <Spinner />
            ) : (
              <div styles={{ display: "flex", flexDirection: "col" }}>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingBottom: 5
                  }}
                >
                  <Button
                    className={classes.button}
                    onClick={() => handleSync(null)}
                  >
                    <img
                      style={{ height: 22, paddingRight: 5 }}
                      src={require("../../assets/google.png")}
                    ></img>
                    sync
                  </Button>
                </div>
                <div style={{ flex: 10 }}>
                  <FullCalendar
                    defaultView="timeGridWeek"
                    customButtons={{
                      manageShifts: {
                        text: "Manage Shifts",
                        click: handleManageShift
                      },
                      cancel: {
                        text: "Save Changes",
                        click: handleManageShiftSave
                      },
                      save: {
                        text: "Cancel",
                        click: handleManageShiftCancel
                      }
                    }}
                    header={{
                      left: "prev,next",
                      center: "title",
                      right: user.admin
                        ? editMode
                          ? "dayGridMonth,timeGridWeek,listWeek, save, cancel"
                          : "dayGridMonth,timeGridWeek,listWeek, manageShifts"
                        : "dayGridMonth,timeGridWeek,listWeek"
                    }}
                    eventClick={!editMode && handleEventClick}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    weekends
                    events={editMode ? shiftsInternal : shifts}
                    editable={user.admin && editMode}
                    eventDrop={handleDragAndDrop}
                    eventResize={handleDragAndDrop}
                  />
                </div>
              </div>
            )}
          </div>
          {getConfirmationDialog()}
          {getCancellationDialog()}
        </>
      )}
    </div>
  );
};

Calendar.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  shifts: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  loadShifts: PropTypes.func.isRequired,
  saveShift: PropTypes.func.isRequired,
  cancelShift: PropTypes.func.isRequired,
  setGoogleAuthenticated: PropTypes.func.isRequired,
  googleAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    authState: state.auth.authState,
    shifts: state.shifts,
    loading: state.apiCallsInProgress > 0,
    googleAuthenticated: state.auth.googleAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setGoogleAuthenticated: bindActionCreators(
      setGoogleAuthenticated,
      dispatch
    ),
    loadShifts: bindActionCreators(loadShifts, dispatch),
    saveShift: bindActionCreators(saveShift, dispatch),
    cancelShift: bindActionCreators(cancelShift, dispatch)
  };
}

const CalendarWrapped = connect(mapStateToProps, mapDispatchToProps)(Calendar);

export default withStyles(styles)(CalendarWrapped);
