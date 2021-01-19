import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import * as colors from "@material-ui/core/colors";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { BiPyramid } from "react-icons/bi";
import AccountCircle from "@material-ui/icons/AccountCircle";
import appTheme from "../styles/theme";
import { events } from "../store";
import { useRecoilState } from "recoil";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      height: "100vh",
      justifyContent: "normal",
      alignItems: "center",
      flexDirection: "column",
      color: appTheme.primaryText,
      background: "#ffffff",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      background: colors.blueGrey[500],
    },
    noContent: {
      textAlign: "center",
    },
    content: {
      width: "100%",
      textAlign: "left",
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
  })
);

export default function EventsView() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [stateEvents] = useRecoilState(events);
  // const [stateLoading, setLoading] = useRecoilState(loading);

  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    setAuth(false);
    console.log("logout");
  };

  useEffect(() => {}, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="icon"
          >
            <BiPyramid />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Evently
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleLogout}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        {!stateEvents.length && (
          <div className={classes.noContent}>
            <h1>No Events</h1>
            <p>Go ahead and add some 😎</p>
          </div>
        )}
        {stateEvents.length > 0 && <h1>Adam</h1>}
      </div>
    </div>
  );
}
