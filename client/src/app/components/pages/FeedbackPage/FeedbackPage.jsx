import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import * as Yup from "yup";
import { Formik } from "formik";

import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";

import BoxContainer from "../../common/BoxContainer";
import Loader from "../../ui/Loader";
import feedbackService from "../../../services/feedback.service";
import { getUserEmail } from "../../../store/user";

const FeedbackPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userEmail = useSelector(getUserEmail());

  const initialValues = {
    email: userEmail ? userEmail : "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  return (
    <Box sx={{ maxWidth: "800px", minWidth: "600px" }}>
      <BoxContainer>
        <Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (
              values,
              { setStatus, setSubmitting, resetForm }
            ) => {
              const { email, subject, message } = values;
              try {
                setLoading(true);
                const status = await feedbackService.post(
                  email,
                  subject,
                  message
                );
                if (status === 200) {
                  toast.success("Your message has been sent successfully!");
                  setStatus({ success: true });
                }
              } catch (error) {
                setError(error);
                setStatus({ success: false });
              } finally {
                setLoading(false);
                setSubmitting(false);
                resetForm({ values: "" });
                setError("");
              }
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
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ mr: 2 }}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                        margin="normal"
                      >
                        <InputLabel htmlFor="outlined-adornment-email">
                          Email
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-email"
                          type="email"
                          value={values.email}
                          name="email"
                          onChange={handleChange}
                          label="Email"
                          inputProps={{}}
                        />
                        {touched.email && errors.email && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email"
                            sx={{ position: "absolute", top: "100%" }}
                          >
                            {errors.email}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.subject && errors.subject)}
                        margin="normal"
                      >
                        <InputLabel htmlFor="outlined-adornment-subject">
                          Subject
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-subject"
                          type="text"
                          value={values.subject}
                          name="subject"
                          onChange={handleChange}
                          label="Subject"
                          inputProps={{}}
                        />
                        {touched.subject && errors.subject && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-subject"
                            sx={{ position: "absolute", top: "100%" }}
                          >
                            {errors.subject}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.message && errors.message)}
                      margin="normal"
                    >
                      <InputLabel htmlFor="outlined-adornment-message">
                        Message
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-message"
                        type="textarea"
                        value={values.message}
                        name="message"
                        onChange={handleChange}
                        label="Message"
                        inputProps={{}}
                        multiline
                        rows={6}
                      />
                      {touched.message && errors.message && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-message"
                          sx={{ position: "absolute", top: "100%" }}
                        >
                          {errors.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Box>
                {error && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{error}</FormHelperText>
                  </Box>
                )}
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                >
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
                    Submit
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </BoxContainer>
    </Box>
  );
  // : (
  //   <Box sx={{ maxWidth: "800px", minWidth: "600px" }}>
  //     <SkeletonNftListRow />
  //   </Box>
  // );
};

export default FeedbackPage;
