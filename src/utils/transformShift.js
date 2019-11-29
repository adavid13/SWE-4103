import moment from "moment";
export const transformToServer = shift => {
  return {
    id: shift.id,
    startTime:moment(shift.start).toISOString(),
    endTime: moment(shift.end).toISOString(),
    userSignedUpForShift: shift.userSignedUpForShift
  };
};

export const transformToApplication = (shifts, user) => {
  return shifts.map(shift => {
    let title = "Available";
    let backgroundColor = "#A0DB8E";
    if (shift.userSignedUpForShift) {
      title = `${shift.userSignedUpForShift.firstName} ${shift.userSignedUpForShift.lastName}`
      if (user.admin) {
        backgroundColor = user.id === shift.userSignedUpForShift.id ? "#81B1DE" : "#FFE66D";
      } else {
        if (user.id === shift.userSignedUpForShift.id) {
          backgroundColor = "#81B1DE";
        } else {
          backgroundColor = "#BCBFC2";
        }
      }
    }
    return {
      id: shift.id,
      start: shift.startTime,
      end: shift.endTime,
      userSignedUpForShift: shift.userSignedUpForShift,
      title,
      backgroundColor
    };
  });
};