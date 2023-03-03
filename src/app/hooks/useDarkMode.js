import { useEffect, useState, useMemo } from "react";

export const useDarkMode = () => {
  const [mode, setMode] = useState("light");
  const [componentMounted, setComponentMounted] = useState(false);

  const setTheme = (theme) => {
    window.localStorage.setItem("theme", theme);
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
    const localTheme = window.localStorage.getItem("theme");
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    !localTheme
      ? setTheme("dark")
      : localTheme
      ? setMode(localTheme)
      : setTheme("light");
    setComponentMounted(true);
  }, []);

  return [mode, colorMode, componentMounted];
};
