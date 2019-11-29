import React from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import ButtonGroup from  "../buttonGroup";

const StandardDialog = props => {
  const { children, dialogTitle, classes, open, buttonGroup } = props;
  const { primaryText, secondaryText, onClickPrimary, onClickSecondary } = buttonGroup;
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
    >
      <DialogTitle id="confirmation-disalog-title">
        {dialogTitle}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions className={classes.buttonContainer}>
        <ButtonGroup
          primaryText={primaryText}
          onClickPrimary={onClickPrimary}
          secondaryText={secondaryText}
          onClickSecondary={onClickSecondary}
        />
      </DialogActions>
    </Dialog>
  );

}
StandardDialog.propTypes = {
  children: PropTypes.array,
  classes: PropTypes.object.isRequired,
  dialogTitle: PropTypes.string,
  open: PropTypes.bool,
  buttonGroup: PropTypes.shape({
    primaryText: PropTypes.string,
    onClickPrimary: PropTypes.func,
    secondaryText: PropTypes.string,
    onClickSecondary: PropTypes.func,
  })
};

export default withStyles(styles)(StandardDialog);