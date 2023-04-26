import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "./components/nav/Layout";
import Mint from "./layouts/Mint";
import Dashboard from "./layouts/Dashboard";
import Ships from "./layouts/Ships";
import Captains from "./layouts/Captains";
import Islands from "./layouts/Islands";
import UserPage from "./components/pages/UserPage/UserPage";
import UserEditPage from "./components/pages/UserEditPage/UserEditPage";

import { useDarkMode } from "./hooks/useDarkMode";
import ThemeCustomization from "./themes";
import { CoinRateProvider } from "./hooks/useCoinRate";
// import AppLoader from "./hoc/AppLoader";
import Register from "./components/pages/Authentication/auth/Register";
import Login from "./components/pages/Authentication/auth/Login";

function App() {
  const [componentMounted] = useDarkMode();

  if (!componentMounted) {
    return <div />;
  }

  return (
    <>
      {/* <AppLoader> */}
      <ThemeCustomization>
        <CoinRateProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="mint" element={<Mint />} />
              <Route path="ships" element={<Ships />} />
              <Route path="captains" element={<Captains />} />
              <Route path="islands" element={<Islands />} />
              <Route path="user" element={<UserPage />} />
              <Route path="settings" element={<UserEditPage />} />
            </Route>
            <Route path="auth">
              <Route index element={<Navigate to="/auth/register" />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<Navigate to="/auth/register" />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CoinRateProvider>
        <ToastContainer />
      </ThemeCustomization>
      {/* </AppLoader> */}
    </>
  );
}

export default App;
