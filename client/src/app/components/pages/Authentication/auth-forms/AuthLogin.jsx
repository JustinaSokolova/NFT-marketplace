import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

import * as Yup from "yup";
import { Formik } from "formik";

import MetaMaskIcon from "../../../../assets/icons/icons8-metamask.png";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  clearErrorMessage,
  getAuthError,
  logIn,
  logInMetamask,
} from "../../../../store/user";
import { AddressSignatureMetamask } from "../../../../services/web3.service";
import Loader from "../../../ui/Loader";

const initialValues = {
  email: "",
  password: "",
  submit: null,
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string().required("Password is required"),
});

const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const messageError = useSelector(getAuthError());
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, [dispatch]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMetamask = async () => {
    setLoading(true);
    const data = await AddressSignatureMetamask();
    const redirect = location.state ? location.state.referrer.pathname : "/";
    dispatch(logInMetamask(data))
      .then(() => {
        navigate(redirect, { replace: true });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Button
            disableElevation
            fullWidth
            onClick={handleMetamask}
            size="large"
            variant="outlined"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              color: theme.palette.text.primary,
              borderColor: theme.palette.grey.light,
              ...(theme.palette.mode === "dark"
                ? { backgroundColor: theme.palette.background[800] }
                : { backgroundColor: theme.palette.primary.light }),
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={MetaMaskIcon} alt="MetaMask" width={22} height={22} />
            </Box>
            Connect wallet
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

            <Button
              variant="outlined"
              sx={{
                cursor: "unset",
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: theme.palette.grey.light,
                color: theme.palette.text.primary,
                fontWeight: 500,
                borderRadius: "8px",
              }}
              disableRipple
              disabled
            >
              OR
            </Button>

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign in with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
          setLoading(true);
          const redirect = location.state
            ? location.state.referrer.pathname
            : "/";
          dispatch(logIn(values))
            .then(() => {
              setStatus({ success: true });
              navigate(redirect, { replace: true });
            })
            .catch(() => {
              setStatus({ success: false });
            })
            .finally(() => {
              setLoading(false);
              setSubmitting(false);
              resetForm({ values: "" });
            });
        }}
      >
        {({
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              // sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email">
                Email Address
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type="email"
                value={values.email}
                name="email"
                onChange={handleChange}
                label="Email Address"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
            <Box sx={{ mt: 3, mb: 1 }}>
              <FormControl
                fullWidth
                error={Boolean(touched.password && errors.password)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-password-login">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-login"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  inputProps={{}}
                />
                {touched.password && errors.password && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-password-login"
                  >
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            {messageError && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{messageError}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loading && <Loader />}
                Sign in
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
