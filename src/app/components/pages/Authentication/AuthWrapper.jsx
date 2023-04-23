import { styled } from "@mui/material/styles";

const AuthWrapper = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  ...(theme.palette.mode === "dark"
    ? { backgroundColor: theme.palette.paper }
    : { backgroundColor: theme.palette.primary.light }),
}));

export default AuthWrapper;
