import React, { useState, useEffect } from "react";
import "./App.css";
import CustomerDistribution from "./components/CustomerDistribution";
import CustomerTypes from "./components/CustomerTypes";
import Navbar from "./components/Navbar";
import Resources from "./components/Resources";
import Simulation from "./components/Simulation";
import Settings from "./models/settings";
import { loadMapApi } from "./utils/GoogleMapsUtils";

function App() {
  const [settings, setSettings] = useState<Settings>(new Settings());
  const [menuItem, setMenuItem] = useState<number>(0);

  const updateSettingsHandler = (updatedSettings : Settings) => {
    setSettings(updatedSettings);
  }

  const selectedItemHandler = (selectedItem: number) => {
    setMenuItem(selectedItem);
  };

  const [scriptLoaded, setScriptLoaded] = useState(false);
  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", function () {
      setScriptLoaded(true);
    });
  }, []);

  return (
    <div className="app">
      <Navbar selectedItem={selectedItemHandler} active={menuItem} />
      <div className="section">
        {menuItem === 0 && <Resources settings={settings}  updatedSettings={updateSettingsHandler} gmscriptLoaded={scriptLoaded}/>}
        {menuItem === 1 && <CustomerTypes settings={settings} updatedSettings={updateSettingsHandler}/>}
        {menuItem === 2 && <CustomerDistribution settings={settings} updatedSettings={updateSettingsHandler} gmscriptLoaded={scriptLoaded}/>}
        {menuItem === 3 && <Simulation settings={settings}/>}
      </div>
    </div>
  );
}

export default App;
