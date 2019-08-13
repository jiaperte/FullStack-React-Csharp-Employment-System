import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { blue, red } from "@material-ui/core/colors";
import { loadCSS } from "fg-loadcss/src/loadCSS";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon
} from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] },
    secondary: { main: red[500] }
  },
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  icon: {
    //marginTop: theme.spacing.unit * 10,
    marginRight: theme.spacing.unit * 2,
    //color: theme.palette.common.white,
    fontSize: 30
    //"&:hover": { color: blue[800] }
  }
});

const AlertDialog = props => {
  const { isOpen, handleClose, classes } = props;

  loadCSS(
    "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
    document.querySelector("#insertion-point-jss")
  );

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Dialog open={isOpen} onClose={handleClose}>
          <DialogTitle>
            <Icon
              className={classNames(classes.icon, "fas fa-exclamation-circle")}
              color="secondary"
            />
            Error!
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Communication Error Occurred: The internet or remote server may
              get disconnected.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </MuiThemeProvider>
  );
};

AlertDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AlertDialog);
