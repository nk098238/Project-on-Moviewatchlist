import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  textLabel: {
    color: "#000000",
    marginBottom: "5px",
    fontWeight: 500
  },
  required: {
    color: "red",
  },
}));

const FormInputLabel = (props) => {
  const classes = useStyles();

  return (
    <InputLabel>
      <h3 className={classes.textLabel}>
        {props.title}
        {props.required && <span className={classes.required}>*</span>}
      </h3>
    </InputLabel>
  );
};

export default FormInputLabel;
