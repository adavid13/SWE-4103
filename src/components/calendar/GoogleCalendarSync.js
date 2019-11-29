import moment from "moment";
import { toast } from "react-toastify";
// Client ID and API key from the Developer Console
export const CLIENT_ID =
  "749065637150-lkhfattj3f7dd3ges6ct0e1t5i7kpbrb.apps.googleusercontent.com";
export const API_KEY = "AIzaSyDRGZsxch5557KQkujGBEZUsEFU0qmLOKE";
// Array of API discovery doc URLs for APIs used by the quickstart
export const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
];
// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
export const SCOPES =
  "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events";

export const sendNewEvents = (shifts, currentUser) => {
  getEvents(null, shifts, currentUser);
};

const sendEvent = event => {
  //eslint-disable-next-line no-undef
  var request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event
  });

  request.execute();
};

const getEvents = async (page_token, shifts, user) => {
  const currentTimeISO =
    moment()
      .toISOString()
      .slice(0, -5) + "-03:00";
  const maxTimeISO =
    moment()
      .add(6, "months")
      .toISOString()
      .slice(0, -5) + "-03:00";
  //eslint-disable-next-line no-undef
  var request = gapi.client.calendar.events.list({
    calendarId: "primary",
    pageToken: page_token,
    maxResults: 2500,
    timeMin: currentTimeISO,
    timeMax: maxTimeISO
  });
  request.execute(resp => {
    syncNewEvents(resp.items, shifts, user);
    syncDeletedEvents(resp.items, shifts, user);
    if (resp.nextPageToken) {
      getEvents(resp.nextPageToken, shifts, user);
    }
  });
};

const addToGoogleCalendar = event => {
  var eventToSend = {
    summary: "FSACC Volunteer Shift",
    description: "On call for Fredericton Sexual Assault Crisis Centre",
    start: {
      dateTime: event.start
    },
    end: {
      dateTime: event.end
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 }
      ]
    }
  };
  sendEvent(eventToSend);
};

const deleteFromGoogleCalendar = event => {
  //eslint-disable-next-line no-undef
  var request = gapi.client.calendar.events.delete({
    calendarId: "primary",
    eventId: event.id
  });

  request.execute();
};

const syncNewEvents = (events, shifts, user) => {
  try {
    //All events already on calendar
    const alreadySynced = filterFSACCEvents(events);
    //All events between now and 6 months assigned to user
    const allAssignedShifts = filterCurrentUserShifts(shifts, user);

    const eventsToAdd = getNewEvents(alreadySynced, allAssignedShifts);
    eventsToAdd.forEach(event => addToGoogleCalendar(event));
  } catch (e) {
    toast.error("Error Updating Google Calendar");
  }
  toast.success("Successfully Updated Google Calendar");
};

const syncDeletedEvents = (events, shifts, user) => {
  //All events already on calendar
  const alreadySynced = filterFSACCEvents(events);
  //All events between now and 6 months assigned to user
  const allAssignedShifts = filterCurrentUserShifts(shifts, user);

  const eventsToDelete = getDeletedEvents(alreadySynced, allAssignedShifts);
  eventsToDelete.forEach(event => deleteFromGoogleCalendar(event));
};

//All shifts on the users calendar with the name FSACC Volunteer Shift
const filterFSACCEvents = events => {
  return events.filter(event => event.summary == "FSACC Volunteer Shift");
};

//All shifts between now and 6 months out assigned to this user
export const filterCurrentUserShifts = (shifts, user) => {
  return shifts
    .filter(shift => shift.userSignedUpForShift)
    .filter(shift => shift.userSignedUpForShift.id == user.id)
    .filter(
      shift =>
        moment(shift.start) > moment() &&
        moment(shift.end) < moment().add(6, "months")
    );
};

const getNewEvents = (googleEvents, appEvents) => {
  let eventsToAdd = [];
  let skip;
  appEvents.forEach(appEvent => {
    skip = false;
    googleEvents.forEach(googleEvent => {
      if (
        moment(googleEvent.end.dateTime).toISOString() == appEvent.end &&
        moment(googleEvent.start.dateTime).toISOString() == appEvent.start
      ) {
        //times match--dont add
        skip = true;
      }
    });
    if (!skip) {
      eventsToAdd.push(appEvent);
    }
  });
  return eventsToAdd;
};

const getDeletedEvents = (googleEvents, appEvents) => {
  let eventsToDelete = [];
  let skip;
  googleEvents.forEach(googleEvent => {
    skip = false;
    appEvents.forEach(appEvent => {
      if (
        moment(googleEvent.end.dateTime).toISOString() == appEvent.end &&
        moment(googleEvent.start.dateTime).toISOString() == appEvent.start
      ) {
        //times match--dont delete
        skip = true;
      }
    });
    if (!skip) {
      eventsToDelete.push(googleEvent);
    }
  });
  return eventsToDelete;
};
