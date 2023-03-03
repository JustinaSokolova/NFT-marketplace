import { React, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/nav/Layout";
import Mint from "./layouts/Mint";
import Dashboard from "./layouts/Dashboard";
import Ships from "./layouts/Ships";
import Captains from "./layouts/Captains";
import Islands from "./layouts/Islands";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import themeContext from "./components/themeContext";
import getDesignTokens from "./components/Theme.js";
import { useDarkMode } from "./hooks/useDarkMode";

function App() {
  const [mode, colorMode, componentMounted] = useDarkMode();

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  if (!componentMounted) {
    return <div />;
  }

  return (
    <>
      <themeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="mint" element={<Mint />} />
              <Route path="ships" element={<Ships />} />
              <Route path="captains" element={<Captains />} />
              <Route path="islands" element={<Islands />} />
              {/* <Redirect to="/" /> */}
            </Route>
          </Routes>
        </ThemeProvider>
      </themeContext.Provider>
    </>
  );
}

export default App;
