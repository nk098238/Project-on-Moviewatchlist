import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  actionButton: {
    backgroundColor: "#48abec",
    color: "#ffffff",
    borderRadius: "0.5rem",
    "&:hover": {
      backgroundColor: "#1c81c4",
      color: "#ffffff",
    },
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: "#cfeffc",
  },
  dialogTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

export { useStyles, MenuProps };
