export default function componentStyleOverrides(theme) {
  const colors = theme.palette;
  // console.log(colors.background);

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
          padding: "24px",
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
          "&.Mui-selected": {
            color: colors?.secondary.main,
            backgroundColor:
              theme.palette.mode === "dark"
                ? colors?.background.opacity
                : colors?.secondary.light,
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? colors?.background.opacity
                  : colors?.secondary.light,
            },
            "& .MuiListItemIcon-root": {
              color: colors?.secondary.main,
            },
          },
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
    //     MuiListItemIcon: {
    //       styleOverrides: {
    //         root: {
    //           color: theme.darkTextPrimary,
    //           minWidth: "36px",
    //         },
    //       },
    //     },
    //     MuiListItemText: {
    //       styleOverrides: {
    //         primary: {
    //           color: theme.textDark,
    //         },
    //       },
    //     },
    //     MuiInputBase: {
    //       styleOverrides: {
    //         input: {
    //           color: theme.textDark,
    //           "&::placeholder": {
    //             color: theme.darkTextSecondary,
    //             fontSize: "0.875rem",
    //           },
    //         },
    //       },
    //     },
    //     MuiOutlinedInput: {
    //       styleOverrides: {
    //         root: {
    //           background: bgColor,
    //           borderRadius: `${theme?.customization?.borderRadius}px`,
    //           "& .MuiOutlinedInput-notchedOutline": {
    //             borderColor: theme.colors?.grey400,
    //           },
    //           "&:hover $notchedOutline": {
    //             borderColor: theme.colors?.primaryLight,
    //           },
    //           "&.MuiInputBase-multiline": {
    //             padding: 1,
    //           },
    //         },
    //         input: {
    //           fontWeight: 500,
    //           background: bgColor,
    //           padding: "15.5px 14px",
    //           borderRadius: `${theme?.customization?.borderRadius}px`,
    //           "&.MuiInputBase-inputSizeSmall": {
    //             padding: "10px 14px",
    //             "&.MuiInputBase-inputAdornedStart": {
    //               paddingLeft: 0,
    //             },
    //           },
    //         },
    //         inputAdornedStart: {
    //           paddingLeft: 4,
    //         },
    //         notchedOutline: {
    //           borderRadius: `${theme?.customization?.borderRadius}px`,
    //         },
    //       },
    //     },
    //     MuiSlider: {
    //       styleOverrides: {
    //         root: {
    //           "&.Mui-disabled": {
    //             color: theme.colors?.grey300,
    //           },
    //         },
    //         mark: {
    //           backgroundColor: theme.paper,
    //           width: "4px",
    //         },
    //         valueLabel: {
    //           color: theme?.colors?.primaryLight,
    //         },
    //       },
    //     },
    //     MuiAvatar: {
    //       styleOverrides: {
    //         root: {
    //           color: theme.colors?.primaryDark,
    //           background: theme.colors?.primary200,
    //         },
    //       },
    //     },
    //     MuiChip: {
    //       styleOverrides: {
    //         root: {
    //           "&.MuiChip-deletable .MuiChip-deleteIcon": {
    //             color: "inherit",
    //           },
    //         },
    //       },
    //     },
    //     MuiTooltip: {
    //       styleOverrides: {
    //         tooltip: {
    //           color: theme.paper,
    //           background: theme.colors?.grey700,
    //         },
    //       },
    //     },
  };
}
