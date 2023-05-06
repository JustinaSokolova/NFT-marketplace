import React from "react";

const themeContext = React.createContext({
  toggleColorMode: () => {
    // This is intentional
  },
});

export default themeContext;
