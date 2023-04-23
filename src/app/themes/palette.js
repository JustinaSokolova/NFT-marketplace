import colors from "../assets/scss/_themes-vars.module.scss";

export default function themePalette() {
  return {
    primary: {
      light: colors?.primaryLight,
      main: colors?.primaryMain,
      dark: colors?.primaryDark,
      200: colors?.primary200,
      800: colors?.primary800,
    },
    secondary: {
      light: colors?.secondaryLight,
      main: colors?.secondaryMain,
      dark: colors?.secondaryDark,
      200: colors?.secondary200,
      800: colors?.secondary800,
    },

    error: {
      light: colors?.errorLight,
      main: colors?.errorMain,
      dark: colors?.errorDark,
    },
    orange: {
      light: colors?.orangeLight,
      main: colors?.orangeMain,
      dark: colors?.orangeDark,
    },
    warning: {
      light: colors?.warningLight,
      main: colors?.warningMain,
      dark: colors?.warningDark,
    },
    success: {
      light: colors?.successLight,
      200: colors?.success200,
      main: colors?.successMain,
      dark: colors?.successDark,
    },
    grey: {
      50: colors?.grey50,
      100: colors?.grey100,
      500: colors?.darkTextSecondary,
      600: colors?.heading,
      700: colors?.darkTextPrimary,
      900: colors?.textDark,
      light: colors?.greyLight,
    },

    text: {
      primary: colors?.grey700,
      secondary: colors?.grey500,
      dark: colors?.grey900,
      hint: colors?.grey100,
    },
    background: {
      paper: colors?.paper,
      default: colors?.backgroundDefault,
    },
    darkBackground: {
      paper: colors?.darkPaper, //
      default: colors?.darkBackground,
      800: colors?.darkLevel1,
      900: colors?.darkLevel2,
      opacity: colors?.darkSecondaryOpacity,
    },
    darkSecondary: {
      light: colors?.darkSecondaryLight,
      main: colors?.darkSecondaryMain,
      dark: colors?.darkSecondaryDark,
      200: colors?.darkSecondary200,
      800: colors?.darkSecondary800,
    },
    darkText: {
      primary: colors?.darkTextTitle,
      secondary: colors?.darkTextPrimary,
      dark: colors?.darkTextSecondary,
      hint: colors?.darkTextPrimary,
    },
  };
}
