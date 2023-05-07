import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Button,
  Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import * as Yup from "yup";
import { Formik } from "formik";

import Loader from "../../ui/Loader";
import {
  clearErrorMessage,
  getAuthError,
  getUserEmail,
  updateUserPassword,
} from "../../../store/user";

const initialValues = {
  currentPassword: "",
  newPassword: "",
  submit: null,
};

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Password is required"),
  newPassword: Yup.string().required("Password is required"),
});
const ChangePassword = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const messageError = useSelector(getAuthError());
  const userEmail = useSelector(getUserEmail());

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, [dispatch]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      {userEmail ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box sx={{ typography: "body1", mb: "24px", mr: "24px" }}>
            You are logged in as:{" "}
          </Box>
          <Box sx={{ typography: "body1", mb: "24px" }}>{userEmail} </Box>
        </Box>
      ) : (
        <Typography variant="caption" color="error">
          You need to log in by email
        </Typography>
      )}

      <Box sx={{ typography: "h5", mb: "24px" }}>Change password:</Box>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
            setLoading(true);
            dispatch(clearErrorMessage());
            dispatch(updateUserPassword(values))
              .then(() => {
                toast.success("Password changed successfully!");
                setStatus({ success: true });
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
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <FormControl
                    sx={{ m: 1, width: "25ch" }}
                    variant="outlined"
                    error={Boolean(touched.email && errors.password)}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Current password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={values.currentPassword}
                      name="currentPassword"
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
                      label="Current password"
                      inputProps={{}}
                    />
                    {touched.email && errors.password && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-password"
                      >
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl
                    sx={{ m: 1, width: "25ch" }}
                    variant="outlined"
                    error={Boolean(touched.email && errors.password)}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      New password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={values.newPassword}
                      name="newPassword"
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
                      label="New password"
                      inputProps={{}}
                    />
                    {touched.email && errors.password && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-password"
                      >
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
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
                  size="medium"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{
                    width: "160px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    m: 1,
                  }}
                >
                  {loading && <Loader />}
                  Save
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ChangePassword;
