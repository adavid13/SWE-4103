import React from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import Button from "@material-ui/core/Button";

const ButtonGroup = props => {
  const { classes, primaryText, secondaryText, onClickPrimary, onClickSecondary } = props;

  return (
    <div className={classes.buttonContainer}>
      {primaryText && <Button
        color="secondary"
        variant="contained"
        className={classes.primary}
        onClick={onClickPrimary}
      >
        {primaryText}
      </Button>}
      {secondaryText && <Button
        color="secondary"
        variant="outlined"
        className={classes.secondary}
        onClick={onClickSecondary}
      >
        {secondaryText}
      </Button>}
    </div>
  );
}

ButtonGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  primaryText: PropTypes.string,
  onClickPrimary: PropTypes.func,
  secondaryText: PropTypes.string,
  onClickSecondary: PropTypes.func,
};

export default withStyles(styles)(ButtonGroup);