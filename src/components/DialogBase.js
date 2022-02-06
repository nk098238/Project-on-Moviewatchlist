import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Dialog, Typography, IconButton } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  rootStyle: {
    borderRadius: 25,
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" style={{ fontWeight: 500, fontSize: "1.5rem" }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogBase = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      classes={{
        paper: props.classes.rootStyle,
      }}
      maxWidth={props.maxWidth}
    >
      <DialogTitle onClose={props.handleClose}>{props.title}</DialogTitle>
      {props.children}
    </Dialog>
  );
};

export default withStyles(styles)(DialogBase);
