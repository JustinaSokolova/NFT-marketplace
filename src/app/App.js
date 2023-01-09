import { React, useState, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/nav/Layout";
import Mint from "./pages/Home/Mint";
import Dashboard from "./pages/Home/Dashboard";
import Ships from "./pages/Home/Ships";
import Captains from "./pages/Home/Captains";
import Islands from "./pages/Home/Islands";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import themeContext from "./components/themeContext";
import getDesignTokens from "./components/Theme.js";

function App() {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      // The light mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

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
