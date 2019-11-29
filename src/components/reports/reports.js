import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner/Spinner";
import ReportDisplay from "./reportDisplay";
import { loadShifts } from "../../redux/actions/shiftActions";
import { bindActionCreators } from "redux";
import { filterCurrentUserShifts } from "../calendar/GoogleCalendarSync";
import moment from "moment";
import { toast } from "react-toastify";
import {
  EXPECTED_SHIFTS_PER_WEEK,
  EXPECTED_SHIFTS_PER_MONTH,
  IDEAL_SHIFTS_PERCENTAGE_ASSIGNED_MONTH,
  IDEAL_SHIFTS_PERCENTAGE_ASSIGNED_WEEK
} from "../../constants";
const Reports = ({ shifts, user, loading, loadShifts }) => {
  const [loadingShifts, setLoadingShifts] = useState(true);
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
    loadShiftsAsync();
  }, []);

  const formatNextShiftDate = shift => {
    return moment(shift).format("MMM Do");
  };
  const formatNextShiftTime = shift => {
    return moment(shift).format("h:mm a");
  };

  const shiftsAssigned = filterCurrentUserShifts(shifts, user);
  const future = shiftsAssigned.filter(shift => moment(shift.start) > moment());
  const nextShift = future ? future[0] : null;
  let nextShiftDate = "N/A";
  let nextShiftTime = "";
  if (nextShift) {
    nextShiftDate = formatNextShiftDate(nextShift);
    nextShiftTime = formatNextShiftTime(nextShift);
  }
  const thisWeek = shiftsAssigned.filter(
    shift => moment(shift.start).isSame(new Date(), "week") //true if dates are in the same week
  ).length;
  const thisMonth = shiftsAssigned.filter(
    shift => moment(shift.start).isSame(new Date(), "month") //true if dates are in the same week
  ).length;

  const thisWeekUnassigned = shifts.filter(
    shift =>
      moment(shift.start).isSame(new Date(), "week") &&
      shift.userSignedUpForShift == null //true if dates are in the same week and unassigned
  ).length;
  const thisMonthUnassigned = shifts.filter(
    shift =>
      moment(shift.start).isSame(new Date(), "month") &&
      shift.userSignedUpForShift == null //true if dates are in the same month and unassigned
  ).length;

  const thisWeekTotal = shifts.filter(shift =>
    moment(shift.start).isSame(new Date(), "week")
  ).length;
  const thisMonthTotal = shifts.filter(shift =>
    moment(shift.start).isSame(new Date(), "month")
  ).length;

  const percentageUnassignedWeek = parseInt(
    (thisWeekUnassigned / thisWeekTotal) * 100
  );
  const percentageUnassignedMonth = parseInt(
    (thisMonthUnassigned / thisMonthTotal) * 100
  );
  return (
    <>
      {loading || loadingShifts ? (
        <Spinner />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 50,
            marginLeft: 50
          }}
        >
          {user.admin ? (
            <>
              <ReportDisplay
                value={nextShiftDate}
                time={nextShiftTime}
                label={"Next Shift"}
                status={"date"}
              />
              <ReportDisplay
                value={percentageUnassignedWeek.toString() + "%"}
                label={"Percentage unassigned this week"}
                status={
                  IDEAL_SHIFTS_PERCENTAGE_ASSIGNED_WEEK > thisWeek
                    ? "risk"
                    : "good"
                }
              />
              <ReportDisplay
                value={percentageUnassignedMonth.toString() + "%"}
                label={"Percentage unassigned this month"}
                status={
                  IDEAL_SHIFTS_PERCENTAGE_ASSIGNED_MONTH > thisMonth
                    ? "risk"
                    : "good"
                }
              />
            </>
          ) : (
            <>
              <ReportDisplay
                value={nextShiftDate}
                time={nextShiftTime}
                label={"Next Shift"}
                status={"date"}
              />
              <ReportDisplay
                value={thisWeek.toString()}
                label={"Number of shifts this week"}
                status={EXPECTED_SHIFTS_PER_WEEK > thisWeek ? "risk" : "good"}
              />
              <ReportDisplay
                value={thisMonth.toString()}
                label={"Number of shifts this month"}
                status={EXPECTED_SHIFTS_PER_MONTH > thisMonth ? "risk" : "good"}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

Reports.propTypes = {
  user: PropTypes.object.isRequired,
  shifts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadShifts: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    loading: state.apiCallsInProgress > 0,
    shifts: state.shifts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadShifts: bindActionCreators(loadShifts, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
