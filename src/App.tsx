import React, { useState, useEffect } from "react";
import "./App.css";
import CustomerDistribution from "./components/CustomerDistribution";
import CustomerTypes from "./components/CustomerTypes";
import Navbar from "./components/Navbar";
import Resources from "./components/Resources";
import Simulation from "./components/Simulation";
import { SimulationValues } from "./models/order";
import Settings from "./models/settings";
import { loadMapApi } from "./utils/GoogleMapsUtils";

function App() {
  const [settings, setSettings] = useState<Settings>();
  const [simulationValues, setSimulationValues] = useState<SimulationValues>(new SimulationValues([], false));
  const [menuItem, setMenuItem] = useState<number>(0);

  const updateSettingsHandler = (updatedSettings: Settings) => {
    setSettings(updatedSettings);
  };

  const updateSimulationValuesHandler = (
    updatedSimulationValues: SimulationValues
  ) => {
    setSimulationValues(updatedSimulationValues);
  };

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

  useEffect(() => {
    if (localStorage.getItem("data") !== null) {
      const loadedSetting: Settings = JSON.parse(localStorage.getItem("data")!);
      setSettings(loadedSetting);
    } else {
      setSettings(new Settings());
    }
    /* if (localStorage.getItem("orders") !== null) {
      const loadedOrders = JSON.parse(localStorage.getItem("orders")!);
      setSimulationValues(loadedOrders);
    } else {
      setSimulationValues(new SimulationValues([], false));
    } */
  }, []);

  useEffect(() => {
    window.localStorage.setItem("data", JSON.stringify(settings));
  }, [settings]);

  /* useEffect(()=>{
    window.localStorage.setItem("orders", JSON.stringify(simulationValues));
  },[simulationValues]); */

  return (
    <div className="app">
      <Navbar selectedItem={selectedItemHandler} active={menuItem} settings={settings} updatedSettings={updateSettingsHandler}/>
      <div className="section">
        {settings && menuItem === 0 && (
          <Resources
            settings={settings}
            updatedSettings={updateSettingsHandler}
            gmscriptLoaded={scriptLoaded}
          />
        )}
        {settings && menuItem === 1 && (
          <CustomerTypes
            settings={settings}
            updatedSettings={updateSettingsHandler}
          />
        )}
        {settings && menuItem === 2 && (
          <CustomerDistribution
            settings={settings}
            updatedSettings={updateSettingsHandler}
            gmscriptLoaded={scriptLoaded}
          />
        )}
        {settings && simulationValues && menuItem === 3 && (
          <Simulation
            settings={settings}
            simulationValues={simulationValues}
            updatedSimulationValues={updateSimulationValuesHandler}
          />
        )}
      </div>
    </div>
  );
}

export default App;
