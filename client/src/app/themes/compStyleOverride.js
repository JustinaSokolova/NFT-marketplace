export default function componentStyleOverrides(theme) {
  const colors = theme.palette;

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        rounded: {
          borderRadius: "12px",
        },
      },
    },

    MuiCardHeader: {
      styleOverrides: {
        root: {
          // color: theme.colors?.textDark,
          // padding: "24px",
        },
        title: {
          fontSize: "1.125rem",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "16px",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "16px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          // color: colors.darkTextPrimary,
          borderRadius: "8px",
          // "&.Mui-selected": {
          //   color: colors?.secondary.main,
          //   backgroundColor:
          //     theme.palette.mode === "dark"
          //       ? colors?.background.opacity
          //       : colors?.secondary.light,
          //   "&:hover": {
          //     backgroundColor:
          //       theme.palette.mode === "dark"
          //         ? colors?.background.opacity
          //         : colors?.secondary.light,
          //   },
          //   "& .MuiListItemIcon-root": {
          //     color: colors?.secondary.main,
          //   },
          // },
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? colors?.background.opacity
                : colors?.secondary.light,
            color: colors?.secondary.main,
            "& .MuiListItemIcon-root": {
              color: colors?.secondary.main,
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          width: "34px",
          height: "34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          margin: "8px",
          fontSize: "1.2rem",
          borderRadius: "8px",
          backgroundColor:
            theme.palette.mode === "dark"
              ? colors?.background.opacity
              : colors?.secondary.light,
          color: colors?.secondary.main,
          "&:hover": {
            backgroundColor: colors?.secondary.main,
            color: colors?.grey[50],
          },
        },
      },
    },
  };
}
