import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Avatar } from "@material-ui/core";
import { ArrowRightAlt } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <ArrowRightAlt style={{ marginRight: 5 }} />
          <Typography variant="h6" className={classes.title}>
            Movie
          </Typography>
          <Avatar
            alt="Profile Image"
            src="https://res.cloudinary.com/nikhilpersonal/image/upload/v1629017280/IMG_20190409_204305_285_xu3tmv.jpg"
            className={classes.avatar}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
