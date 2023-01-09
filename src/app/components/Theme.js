const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "dark"
      ? {
          primary: {
            light: "#C29FFF",
            main: "#b388ff",
            dark: "#7D5FB2",
            contrastText: "#000000de",
          },
          secondary: {
            light: "#4AEDC4",
            main: "#1de9b6",
            dark: "#14A37F",
            contrastText: "#000000de",
          },
          background: {
            default: "#303030",
            paper: "#424242",
          },
          text: {
            primary: "#fff",
            secondary: "#ffffffb3",
            disabled: "#ffffff80",
            hint: "#ffffff80",
          },
          divider: "#ffffff1f",
        }
      : {
          primary: {
            light: "#9a67ea",
            main: "#673ab7",
            dark: "#320b86",
            contrastText: "#fff",
          },
          secondary: {
            light: "#ffd95b",
            main: "#ffa726",
            dark: "#c77800",
            contrastText: "#000",
          },
          background: {
            default: "#fafafa",
            paper: "#fff",
          },
          text: {
            primary: "#000000de",
            secondary: "#0000008a",
            disabled: "#00000061",
            hint: "#00000061",
          },
        }),
  },
});

export default getDesignTokens;
