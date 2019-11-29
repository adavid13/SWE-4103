import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from "./HeaderButtonStyles";

function HeaderButtonRaw(props) {
  const { classes, onClick, text } = props;
  return (
    <Button
      onClick={onClick}
      color="inherit"
      className={classes.button}
    >
      {text}
    </Button>
  );
}

HeaderButtonRaw.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string
};

const HeaderButton = withStyles(styles)(HeaderButtonRaw);

export default HeaderButton;

            