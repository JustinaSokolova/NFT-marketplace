import { React, useMemo } from "react";

import { useDarkMode } from "../hooks/useDarkMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import themeContext from "../components/themeContext";
import getThemePallete from "./theme";

import componentStyleOverrides from "./compStyleOverride";

const ThemeCustomization = ({ children }) => {
  const [mode, colorMode] = useDarkMode();

  const theme = useMemo(() => getThemePallete(mode), [mode]);

  const themeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536,
        },
      },
      direction: "ltr",
      palette: theme.palette,
    }),
    [theme]
  );

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themes);

  return (
    <themeContext.Provider value={colorMode}>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </themeContext.Provider>
  );
};

export default ThemeCustomization;
