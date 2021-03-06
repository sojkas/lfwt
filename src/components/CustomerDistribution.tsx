import { Button, Fab, Grid, TextField, Alert, Snackbar } from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Gmap from "./Gmap";
import DistributionUnit from "./DistributionUnit";
import Settings, {
  DistributionArea,
  DistributionItem,
  MapMarker,
} from "../models/settings";
import SingleSlider from "./SingleSlider";

let draggable: boolean = false;
let savedAreaName: string = "";

const CustomerDistribution: React.FC<{
  settings: Settings;
  gmscriptLoaded: boolean;
  updatedSettings: (updatedSettingsValues: Settings) => void;
}> = (props) => {
  const [allDistributionAreas, setAllDistributionAreas] = useState<
    DistributionArea[]
  >(props.settings.distributionAreas);
  const [selectedArea, setSelectedArea] = useState<DistributionArea>();
  const [distributionMarkers, setDistributionMarkers] = useState<MapMarker[]>(
    []
  );
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

  const initDistributionMarkers = () => {
    const mkrs = [];
    if (selectedArea) {
      mkrs.push(selectedArea.marker);
    } else {
      for (let i = 0; i < allDistributionAreas.length; i++) {
        /* if (selectedArea && allDistributionAreas[i].id === selectedArea!.id) {
          mkrs.push(selectedArea!.marker);
        } else { */
        mkrs.push(allDistributionAreas[i].marker);
        /* } */
      }
    }
    setDistributionMarkers(mkrs);
  };

  useEffect(initDistributionMarkers, [selectedArea, allDistributionAreas]);

  const addDistributionHandler = () => {
    setSelectedArea((prevArea) => {
      const newDistribution = new DistributionItem(
        prevArea!.id,
        props.settings.customers[0].name,
        props.settings.customers[0].id,
        10,
        false
      );
      prevArea!.distributions.push(newDistribution);
      return { ...prevArea!, distributions: prevArea!.distributions };
    });
  };

  const updateDistributionHandler = (id: string, distri: DistributionItem) => {
    for (let distribution of selectedArea!.distributions) {
      if (distribution.id === id) {
        return setSelectedArea((prevArea) => {
          prevArea!.distributions.splice(
            prevArea!.distributions.indexOf(distribution),
            1,
            distri
          );
          return { ...prevArea!, distributions: prevArea!.distributions };
        });
      }
    }
  };

  const sliderChangeHandler = (newValue: number) => {
    const newmarker = { ...selectedArea!.marker, radius: newValue };
    setSelectedArea((prevA) => ({ ...prevA!, marker: newmarker }));
  };

  const cityNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setSelectedArea((prevA) => ({
      ...prevA!,
      name: event.target.value,
    }));
  };

  const saveDistributionsHandler = () => {
    for (let i = 0; i < allDistributionAreas.length; i++) {
      if (selectedArea!.id === allDistributionAreas[i].id) {
        allDistributionAreas.splice(i, 1, selectedArea!);
      }
    }
    props.settings.distributionAreas = allDistributionAreas;
    props.updatedSettings(props.settings);
    setSelectedArea(undefined);
    savedAreaName = selectedArea!.name;
    setIsSaved(true);
  };

  const removeDistributionHandler = (id: string) => {
    setSelectedArea((prevArea) => {
      const newDistributionArray = prevArea!.distributions.filter(
        (distribution) => distribution.id !== id
      );
      return { ...prevArea!, distributions: newDistributionArray };
    });
  };

  const removeAreaHandler = () => {
    setAllDistributionAreas((prevAllDist) => {
      const newAllDistributions = prevAllDist!.filter(
        (area) => area.id !== selectedArea!.id
      );
      return newAllDistributions;
    });
    setSelectedArea(undefined);
  };

  useEffect(() => {
    props.settings.distributionAreas = allDistributionAreas;
    props.updatedSettings(props.settings);
  }, [allDistributionAreas]);

  const setPositionHandler = (newPositon: google.maps.LatLng) => {
    setSelectedArea((prevArea) => {
      if (prevArea?.marker) {
        const newMarker: MapMarker = {
          ...prevArea!.marker,
          latitude: newPositon.lat(),
          longitude: newPositon.lng(),
        };
        return { ...prevArea!, marker: newMarker };
      } else {
        const newArea = new DistributionArea(
          "New Area",
          new MapMarker(newPositon.lat(), newPositon.lng(), 1),
          []
        );
        setAllDistributionAreas((prevAllDistr) => {
          return [...prevAllDistr!, newArea];
        });
        return newArea;
      }
    });
  };
  const selectedMarkerHandler = (selectedMarker: MapMarker) => {
    for (let i = 0; i < allDistributionAreas.length; i++) {
      if (allDistributionAreas[i].marker.id === selectedMarker.id) {
        setSelectedArea(allDistributionAreas[i]);
      }
    }
  };

  if (selectedArea) {
    draggable = true;
  } else {
    draggable = false;
  }

  return (
    <React.Fragment>
      <Grid className="grid" container direction="row" spacing={2}>
        <Grid className="box" item xs={6}>
          {props.gmscriptLoaded && (
            <Gmap
              settings={props.settings}
              allMarkers={distributionMarkers}
              selectedMarker={selectedMarkerHandler}
              setPosition={setPositionHandler}
              draggable={draggable}
            />
          )}
        </Grid>
        {!selectedArea && (
          <Snackbar
            open={isSaved}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={handleClose}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              {savedAreaName} was saved.
            </Alert>
          </Snackbar>
        )}
        {selectedArea && (
          <Grid className="box" item xs={6}>
            <h4>Area Parametres</h4>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={1}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      id="symbolic-name"
                      label="Title"
                      variant="outlined"
                      value={selectedArea!.name}
                      size="small"
                      onChange={cityNameChangeHandler}
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={2}>
                    <p className="item-space">Radius</p>
                  </Grid>
                  <Grid item xs={10}>
                    <SingleSlider
                      label={selectedArea!.name}
                      minValue={0}
                      maxValue={15}
                      setValue={selectedArea!.marker.radius}
                      sliderUnit={"km"}
                      singleSliderChange={sliderChangeHandler}
                      step={0.1}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}>
                {selectedArea.distributions.map((distribution) => (
                  <DistributionUnit
                    key={distribution.id}
                    distribution={distribution}
                    updateDistribution={updateDistributionHandler}
                    removeDistribution={removeDistributionHandler}
                    allCustomers={props.settings.customers}
                  />
                ))}
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={9}></Grid>
                  <Grid item xs={3}>
                    {props.settings.customers !== undefined && (
                      <Fab
                        aria-label="add"
                        size="small"
                        onClick={addDistributionHandler}
                      >
                        <Add />
                      </Fab>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={3}>
                    <Button
                      variant="outlined"
                      className="item-space"
                      onClick={saveDistributionsHandler}
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="outlined"
                      className="item-space"
                      onClick={removeAreaHandler}
                    >
                      Delete area
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default CustomerDistribution;
