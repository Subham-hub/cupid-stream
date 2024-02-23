import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CssBaseline, Paper, Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";

import { login } from "../../shared/store/authSlice";
import { setData } from "../../shared/store/userDataSlice";
import {
  BackgroundImage,
  AuthIcon,
  Copyright,
  Fields,
  FormControls,
} from "../components";
import { notify, types } from "../../shared/utils/notification";
import {
  switchToDark,
  switchToLight,
  switchToPink,
} from "../../shared/store/themeSlice";
import { nanoid } from "nanoid";

const Auth = ({ sendRequest, inValidAccess }) => {
  const { type } = useParams();
  const [authType, setAuthType] = useState(type);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (pathname === "/auth/login") setAuthType("login");
    else if (pathname === "/auth/signup") setAuthType("signup");
  }, [pathname]);

  const onSubmit = async (data) => {
    if (authType === "login") delete data.username;
    try {
      const response = await sendRequest(authType, "POST", data);
      const { success, user, token } = response;
      if (success) {
        const authID = nanoid();
        const existingTheme = localStorage.getItem("theme");
        if (existingTheme) {
          user.uiTheme = existingTheme;
          if (existingTheme === "dark") dispatch(switchToDark());
          else if (existingTheme === "light") dispatch(switchToLight());
          else if (existingTheme === "pink") dispatch(switchToPink());
        }
        const remember = data.rememberMe;
        dispatch(setData({ token, ...user, remember }));
        dispatch(login(authID));
        const queryParams = new URLSearchParams({ authID, authType });
        navigate(`/?${queryParams.toString()}`);
      }
    } catch (e) {
      throw new Error(e.message);
    }
  };

  useEffect(() => {
    if (inValidAccess) {
      const message =
        "Either you are not logged in or that page does't exists, please login";
      notify(types.WARN, message);
    }
  }, [inValidAccess]);

  return (
    <>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", overflow: "hidden" }}
      >
        <CssBaseline />
        <BackgroundImage />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square
          style={{ backgroundColor: "#ffe7e3" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <AuthIcon authType={authType} />
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Fields authType={authType} register={register} errors={errors} />
              <FormControls authType={authType} setAuthType={setAuthType} />
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Auth;
