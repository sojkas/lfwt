import { Grid, TextField, Button, Fab } from "@mui/material";
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

const CustomerDistribution: React.FC<{
  settings: Settings;
  gmscriptLoaded: boolean;
  updatedSettings: (updatedSettingsValues: Settings) => void;
}> = (props) => {
  const [allDistributionAreas, setAllDistributionAreas] = useState<
    DistributionArea[]
  >(props.settings.distributionAreas);
  const [selectedDistributionMarker, setSelectedDistributionMarker] =
    useState<MapMarker>();

  const [selectedArea, setSelectedArea] = useState<DistributionArea>(
    props.settings.distributionAreas[1]
  );
  const [allSelectedDistributions, setAllSelectedDistributions] = useState<
    DistributionItem[]
  >(selectedArea.distributions);

  /* const getSelectedMarkerDistribution = () => {};

  useEffect(getSelectedMarkerDistribution, [selectedDistributionMarker]); */

  const [distributionMarkers, setDistributionMarkers] = useState<
    MapMarker[]
  >([]);

  const initDistributionMarkers = () => {
    if (distributionMarkers?.length === 0) {
      for (let i = 0; i < allDistributionAreas.length; i++) {
        distributionMarkers.push(allDistributionAreas[i].marker);
        setDistributionMarkers(distributionMarkers);
      }
    }    
    console.log("all distributions le " + allSelectedDistributions);
  };
  
  useEffect(initDistributionMarkers,[allDistributionAreas]);
  

  const [isReadyToSetMarker, setIsReadyToSetMarker] = useState<boolean>(false);

  const addDistributionHandler = () => {
    console.log("distributions"+allSelectedDistributions.length);
    const newDistribution = new DistributionItem(
      selectedArea.id,
      props.settings.customers[0].name,
      10,
      false
    );
    allSelectedDistributions.push(newDistribution);
    setAllSelectedDistributions(allSelectedDistributions);
    console.log("distributions after "+allSelectedDistributions.length);
  };

  const updateDistributionHandler = (id: string, distri: DistributionItem) => {
    for (let distribution of allSelectedDistributions) {
      if (distribution.id === id) {
        return setAllSelectedDistributions(
          allSelectedDistributions.splice(
            allSelectedDistributions.indexOf(distribution),
            1,
            distri
          )
        );
      }
    }
  };

  const sliderChangeHandler = (newValue: number) => {
    setSelectedArea((prevA) => ({ ...prevA, radius: newValue }));
    for (let i=0; i<distributionMarkers.length; i++){
      if(distributionMarkers[i].id === selectedArea.marker.id) {
        return setDistributionMarkers(
          distributionMarkers.splice(
            i, 1, selectedArea.marker
          )
        )
      }
    }

    setDistributionMarkers((prevDM)=>({...prevDM, }))
  };

  const cityNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setSelectedArea((prevA) => ({
      ...prevA,
      name: event.target.value,
    }));
  };

  const saveDistributionsHandler = () => {
    for (let i = 0; i < allDistributionAreas.length; i++) {
      if (selectedArea.id === allDistributionAreas[i].id) {
        allDistributionAreas.splice(
          i,
          1,
          selectedArea
        );
      }
    }
    props.settings.distributionAreas = allDistributionAreas;
    props.updatedSettings(props.settings);
  };

  const removeDistributionHandler = (id: string) => {
    const newDistributionArray = allSelectedDistributions.filter(
      (distribution) => distribution.id !== id
    );
    setAllSelectedDistributions(newDistributionArray);
  };

  const setMarkerHandler = () => {
    setIsReadyToSetMarker(true);
  };

  const isMarkerInPlace = (value: boolean) => {
    setIsReadyToSetMarker(!value);
  };

  const removeMarkerHandler = () => {};

  useEffect(() => {
    props.settings.distributionAreas = allDistributionAreas;
    props.updatedSettings(props.settings);
  }, [allDistributionAreas]);

  return (
    <React.Fragment>
      <Grid className="grid" container direction="row" spacing={2}>
        <Grid className="box" item xs={6}>
          {props.gmscriptLoaded && (
            <Gmap
              settings={props.settings}
              circleAvailable={true}
              allMarkers={distributionMarkers}
            />
          )}
        </Grid>
        <Grid className="box" item xs={6}>
          <h4>Parametry oblasti</h4>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={1}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    id="symbolic-name"
                    label="Symbolicky nazev"
                    variant="outlined"
                    value={selectedArea.name}
                    size="small"
                    onChange={cityNameChangeHandler}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button variant="outlined" onClick={setMarkerHandler}>
                    Set marker
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button variant="outlined" onClick={removeMarkerHandler}>
                    Remove marker
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={1}>
                  Radius
                </Grid>
                <Grid item xs={5}>
                  <SingleSlider
                    label={selectedArea.name}
                    minValue={0}
                    maxValue={10}
                    setValue={selectedArea.radius}
                    sliderUnit={"km"}
                    singleSliderChange={sliderChangeHandler}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              {allSelectedDistributions.map((distribution) => (
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
                  <Fab
                    aria-label="add"
                    size="small"
                    onClick={addDistributionHandler}
                  >
                    <Add />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="outlined"
                className="item-space"
                onClick={saveDistributionsHandler}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomerDistribution;
