import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/nav/Layout";
import Mint from "./layouts/Mint";
import Dashboard from "./layouts/Dashboard";
import Ships from "./layouts/Ships";
import Captains from "./layouts/Captains";
import Islands from "./layouts/Islands";

import { useDarkMode } from "./hooks/useDarkMode";
import ThemeCustomization from "./themes";

function App() {
  const [componentMounted] = useDarkMode();

  if (!componentMounted) {
    return <div />;
  }

  return (
    <>
      <ThemeCustomization>
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
      </ThemeCustomization>
    </>
  );
}

export default App;
