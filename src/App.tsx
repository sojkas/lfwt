import {useEffect, useState} from "react";
import "./App.css";
import CustomerDistribution from "./components/CustomerDistribution";
import CustomerTypes from "./components/CustomerTypes";
import Navbar from "./components/Navbar";
import Resources from "./components/Resources";
import Simulation from "./components/Simulation";
import {SimulationValues} from "./models/order";
import Settings, {settingsName} from "./models/settings";
import {loadMapApi} from "./utils/GoogleMapsUtils";

function App() {
  const [settings, setSettings] = useState<Settings>();
  const [simulationValues, setSimulationValues] = useState<SimulationValues>(new SimulationValues([], false));
  const [menuItem, setMenuItem] = useState<number>(0);

  const updateSettingsHandler = (updatedSettings: Settings) => {
    console.log("Saving settings -> " + JSON.stringify(updatedSettings.nimbees));
    window.localStorage.setItem(settingsName, JSON.stringify(updatedSettings));
    setSettings(updatedSettings);
  };

  const updateSimulationValuesHandler = (updatedSimulationValues: SimulationValues) => {
    setSimulationValues(updatedSimulationValues);
  };

  const selectedItemHandler = (selectedItem: number) => {
    setMenuItem(selectedItem);
  };

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    console.log("Load map effect");
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", function () {
      setScriptLoaded(true);
    });
  }, []);

  useEffect(() => {
    console.log("Load settings effect");
    if (localStorage.getItem(settingsName) !== null) {
      try {
        const loadedSetting: Settings = JSON.parse(localStorage.getItem(settingsName)!);
        setSettings(loadedSetting);
      } catch (e) {
        window.alert("Nepodarilo se obnovit ulozenou konfiguraci, je nutne zacit znovu.")
        setSettings(new Settings());
      }
    } else {
      setSettings(new Settings());
    }
  }, []);

  return (
      <div className="app">
        <Navbar selectedItem={selectedItemHandler} active={menuItem}
                settings={settings} updatedSettings={updateSettingsHandler} />
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
