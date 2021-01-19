import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import appTheme from "./styles/theme";
import LoadingView from "./views/loading";
import LoginView from "./views/login";
import EventsView from "./views/events";
import { useRecoilState } from "recoil";
import { view, loading } from "./store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      height: "100vh",
      background: appTheme.primary,
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export default function App() {
  const classes = useStyles();
  const [stateView] = useRecoilState(view);
  const [stateLoading] = useRecoilState(loading);

  return (
    <div className={classes.root}>
      {stateView === "login" && <LoginView />}
      {stateView === "events" && <EventsView />}
      {stateLoading && <LoadingView />}
    </div>
  );
}
