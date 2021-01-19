import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import appTheme from "../styles/theme";
import { colors } from "@material-ui/core";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      height: "100vh",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "column",
      color: appTheme.primaryTextInverted,
      textAlign: "center",
      opacity: "0.5",
      background: colors.grey[900],
      position: "absolute",
      width: "100%",
    },
    icon: {
      fontSize: "6em",
      fontWeight: "normal",
      marginBottom: ".25em",
    },
  })
);

export default function LoadingView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Loader
          type="Oval"
          color="#FFFFFF"
          height={80}
          width={80}
          className={classes.icon}
        />
      </div>
    </div>
  );
}
