import React, { useState } from "react";

import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Button,
  // Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import * as Yup from "yup";
import { Formik } from "formik";
import Loader from "../../ui/Loader";
import { useEffect } from "react";

const initialValues = {
  password: "",
  submit: null,
};

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
});
const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checkingPassword, setCheckingPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCheckingPassword(checkingPassword); // ??????
  }, [checkingPassword]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Box sx={{ typography: "h5", mb: "24px" }}>Change password:</Box>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setStatus, setSubmitting }) => {
            if (values.password === checkingPassword) {
              setLoading(true);
              // dispatch(logIn(values))
              //   .then(() => {
              //     setStatus({ success: true });
              //   })
              //   .catch(() => {
              //     setStatus({ success: false });
              //   })
              //   .finally(() => {
              //     setLoading(false);
              //     setSubmitting(false);
              //   });
            }
          }}
        >
          {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
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
                    error={Boolean(errors.password)}
                    // sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      New password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
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
                      label="New password"
                      inputProps={{}}
                    />
                    {errors.password && (
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
                    error={Boolean(errors.password)}
                    // sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Repeat the password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={checkingPassword}
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
                      label="Repeat the password"
                      inputProps={{}}
                    />
                    {errors.password && (
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
