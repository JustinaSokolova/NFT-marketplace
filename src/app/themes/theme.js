import themePalette from "./palette";

const getThemePallete = (mode) => {
  const colors = themePalette();

  return {
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              light: colors?.primary.light,
              main: colors?.primary.main,
              dark: colors?.primary.dark,
            },
            secondary: {
              light: colors?.secondary.light,
              main: colors?.secondary.main,
              dark: colors?.secondary.dark,
            },
            background: {
              paper: colors?.background.paper,
              default: colors?.background.default,
            },
            text: {
              primary: colors?.text.primary,
              secondary: colors?.text.secondary,
              dark: colors?.text.dark,
              hint: colors?.text.hint,
            },
            warning: {
              light: colors?.warning.light,
              main: colors?.warning.main,
              dark: colors?.warning.dark,
            },
            success: {
              light: colors?.success.light,
              200: colors?.success[200],
              main: colors?.success.main,
              dark: colors?.success.dark,
            },
            error: {
              light: colors?.error.light,
              main: colors?.error.main,
              dark: colors?.error.dark,
            },
            grey: {
              50: colors?.grey[50],
              100: colors?.grey[100],
              500: colors?.grey[500],
              600: colors?.grey[600],
              700: colors?.grey[700],
              900: colors?.grey[900],
            },
            // divider: colors?.grey[500],
          }
        : {
            primary: {
              light: colors?.primary.light,
              main: colors?.primary.main,
              dark: colors?.primary.dark,
            },
            secondary: {
              light: colors?.darkSecondary.light,
              main: colors?.darkSecondary.main,
              dark: colors?.darkSecondary.dark,
            },
            background: {
              paper: colors?.darkBackground.paper,
              default: colors?.darkBackground.default,
              800: colors?.darkBackground[800],
              900: colors?.darkBackground[900],
              opacity: colors?.darkBackground.opacity,
            },
            text: {
              primary: colors?.darkText.primary,
              secondary: colors?.darkText.secondary,
              dark: colors?.darkText.dark,
              hint: colors?.darkText.hint,
            },
            warning: {
              light: colors?.warning.light,
              main: colors?.warning.main,
              dark: colors?.warning.dark,
            },
            success: {
              light: colors?.success.light,
              200: colors?.success[200],
              main: colors?.success.main,
              dark: colors?.success.dark,
            },
            error: {
              light: colors?.error.light,
              main: colors?.error.main,
              dark: colors?.error.dark,
            },
            grey: {
              50: colors?.grey[50],
              100: colors?.grey[100],
              500: colors?.grey[500],
              600: colors?.grey[600],
              700: colors?.grey[700],
              900: colors?.grey[900],
            },
            // divider: colors?.darkText.primary,
          }),
    },
  };
};

export default getThemePallete;
