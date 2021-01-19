import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import * as colors from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import appTheme from "../styles/theme";
import { BiPyramid } from "react-icons/bi";
import TextField from "@material-ui/core/TextField";
import { jwt, view, loading } from "../store";
import { useRecoilState } from "recoil";
import axios, { AxiosResponse } from "axios";
import getConfigs from "../config";

const config = getConfigs();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      height: "90vh",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "column",
      color: appTheme.primaryTextInverted,
      textAlign: "center",
    },
    icon: {
      fontSize: "6em",
      fontWeight: "normal",
      marginBottom: ".25em",
    },
    title: {
      fontSize: "3em",
      paddingBottom: ".15em",
    },
    subTitle: {
      fontSize: "1em",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    input: {
      display: "block",
      marginBottom: ".5em",
    },
    inputs: {
      marginBottom: "1.5em",
    },
    button: {
      display: "block",
      // margin: ".5em",
      "&:last-of-type": {
        marginTop: ".5em",
      },
    },
  })
);

export default function LoginView() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    view: "login",
  });
  const [, setLoading] = useRecoilState(loading);
  const [stateJWT, setJWT] = useRecoilState(jwt);
  const [, setView] = useRecoilState(view);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState({ ...state, [id]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    const options = {
      headers: { Authorization: `Bearer ${stateJWT}` },
    };
    const auth = { email: state.email, password: state.password };
    try {
      const resp = await axios.post(`${config.apiUrl}/auth`, auth, options);
      navigateToEvents(resp);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    const { firstName, lastName, email, password } = state;
    const user = { firstName, lastName, email, password };
    try {
      const resp = await axios.post(`${config.apiUrl}/users`, user);
      navigateToEvents(resp);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToEvents = (resp: AxiosResponse) => {
    const token = resp.data.token;
    setJWT(token);
    setView("events");
  };

  return (
    <div className={classes.root}>
      <div>
        <BiPyramid className={classes.icon} />
        <div className={classes.title}>evently</div>
        <div className={classes.subTitle}>Because IRL was so 2019...</div>
      </div>
      <div>
        <form className={classes.form} noValidate autoComplete="off">
          {state.view === "login" && (
            <React.Fragment>
              <div className={classes.inputs}>
                <TextField
                  className={classes.input}
                  id="email"
                  type="email"
                  label="Email"
                  variant="filled"
                  value={state.email}
                  onChange={handleChange}
                />
                <TextField
                  className={classes.input}
                  id="password"
                  type="password"
                  label="Password"
                  variant="filled"
                  value={state.password}
                  onChange={handleChange}
                />
              </div>
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleLogin}
                id="handleLoginBtn"
              >
                Login
              </Button>
              <Button
                className={classes.button}
                onClick={() => {
                  setState({ ...state, view: "register" });
                }}
                id="toRegisterBtn"
              >
                Register
              </Button>
            </React.Fragment>
          )}
          {state.view === "register" && (
            <React.Fragment>
              <div className={classes.inputs}>
                <TextField
                  className={classes.input}
                  id="firstName"
                  label="First Name"
                  variant="filled"
                  value={state.firstName}
                  onChange={handleChange}
                />
                <TextField
                  className={classes.input}
                  id="lastName"
                  label="Last Name"
                  variant="filled"
                  value={state.lastName}
                  onChange={handleChange}
                />
                <TextField
                  className={classes.input}
                  id="email"
                  type="email"
                  label="Email"
                  variant="filled"
                  value={state.email}
                  onChange={handleChange}
                />
                <TextField
                  className={classes.input}
                  id="password"
                  type="password"
                  label="Password"
                  variant="filled"
                  value={state.password}
                  onChange={handleChange}
                />
              </div>
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleRegister}
                id="handleRegisterBtn"
              >
                Register
              </Button>
              <Button
                className={classes.button}
                onClick={() => {
                  setState({ ...state, view: "login" });
                }}
                id="toLoginBtn"
              >
                Back
              </Button>
            </React.Fragment>
          )}
        </form>
      </div>
    </div>
  );
}
