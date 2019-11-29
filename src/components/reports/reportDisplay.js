import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import styles from "./reportDisplayStyles";
import { COLORS } from "../common/styles/styles";

const ReportDisplay = ({ value, label, classes, status, time }) => {
  let color = COLORS.GREY;
  let date = false;
  if (status && status == "good") {
    color = "green";
  } else if (status && status == "risk") {
    color = "red";
  } else if (status && status == "date") {
    date = true;
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <div style={{ flex: 1 }}>
          <Typography
            variant={date ? "h3" : "h1"}
            component="h3"
            style={{ color, textAlign: "center", paddingTop: 25 }}
          >
            {value}
          </Typography>
        </div>
        {date && (
          <div style={{ flex: 1 }}>
            <Typography
              variant={"h6"}
              component="h3"
              style={{ color, textAlign: "center", paddingTop: 25 }}
            >
              {time}
            </Typography>
          </div>
        )}
        <div style={{ flex: 1, flexDirection: "column", position: "relative" }}>
          <Typography component="h5" className={classes.label}>
            {label}
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

ReportDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  time: PropTypes.string,
  label: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default withStyles(styles)(ReportDisplay);
