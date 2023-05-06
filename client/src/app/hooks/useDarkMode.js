import { useEffect, useState, useMemo } from "react";
import localStorageService from "../services/localStorage.service";

export const useDarkMode = () => {
  const [mode, setMode] = useState("dark");
  const [componentMounted, setComponentMounted] = useState(false);

  const setTheme = (theme) => {
    localStorageService.setThemeToken(theme);
    setMode(theme);
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        if (mode === "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      },
    }),
    [mode]
  );

  useEffect(() => {
    const localTheme = localStorageService.getThemeToken();
    // window.matchMedia &&
    // window.matchMedia("(prefers-color-scheme: dark)").matches &&
    !localTheme ? setTheme("dark") : setMode(localTheme);
    setComponentMounted(true);
  }, []);

  return [mode, colorMode, componentMounted];
};
