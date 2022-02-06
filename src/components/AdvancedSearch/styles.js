import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    boxShadow:
      "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)",
  },
  heading: {
    borderBottom: "1px solid lightblue",
    marginBottom: "1rem",
    fontWeight: "500",
  },
  actionButton: {
    backgroundColor: "#48abec",
    color: "#ffffff",
    borderRadius: "0.5rem",
    "&:hover": {
      backgroundColor: "#1c81c4",
      color: "#ffffff",
    },
  },
  icon: {
    fontSize: "15px",
    marginRight: "5px",
  },
  formContainer: {
    padding: theme.spacing(1, 8),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1),
    },
  },
}));
