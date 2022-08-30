import {useEffect, useState, useCallback} from "react";
import "./App.css";
import CustomerDistribution from "./components/CustomerDistribution";
import CustomerTypes from "./components/CustomerTypes";
import Navbar from "./components/Navbar";
import Resources from "./components/Resources";
import Simulation from "./components/Simulation";
import {SimulationValues} from "./models/order";
import Settings, {settingsName, CarModel} from "./models/settings";
import {loadMapApi} from "./utils/GoogleMapsUtils";
import {Alert, Snackbar} from "@mui/material";

function App() {
  const [settings, setSettings] = useState<Settings>();
  const [simulationValues, setSimulationValues] = useState<SimulationValues>(new SimulationValues([], false));
  const [menuItem, setMenuItem] = useState<number>(0);
  const [carsModels, setCarsModels] = useState<CarModel[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null | undefined>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSaved(false);
  };

  /* const snapApiUrl: string = `https://roads.googleapis.com/v1/snapToRoads?path=50.0000,14.000&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

  const fetchsnappos = useCallback(async function () {
    try{
    const response = await fetch(snapApiUrl);
    const data = await response.json();
    console.log(data);
    }
    catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  },[]);

  useEffect(()=>{
    fetchsnappos();
  },[fetchsnappos]); */

  const carsModelsApiUrl: string =
    "https://nimble.api.algoritma.cz/api/CodeList/CarsModelsBasicList";

  const fetchCarsModels = useCallback(async function () {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(carsModelsApiUrl);

      if (!response.ok) {
        //const errorStatus = response.status;
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedData = [];

      for (const car in data) {
        loadedData.push(
          new CarModel(
            data[car].pkCarsModels,
            data[car].model,
            data[car].manufacturer,
            data[car].batteryCapacityUseable
          )
        );
      }
      setCarsModels(loadedData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    setIsLoading(false);
    setIsSaved(true);
  }, []);

  useEffect(() => {
    fetchCarsModels();
  }, [fetchCarsModels]);

  const updateSettingsHandler = (updatedSettings: Settings) => {
    /* console.log("Saving settings -> " + JSON.stringify(updatedSettings.customers)); */
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
        {!isLoading && (
            <Snackbar
              open={isSaved}
              autoHideDuration={3000}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              onClose={handleClose}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Car models ware loaded.
              </Alert>
            </Snackbar>
          )}
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
                  carsModels={carsModels}
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
