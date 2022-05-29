import { Grid, TextField, Button, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import GmapDistribution from "./GmapDistribution";
import DistributionUnit from "./DistributionUnit";
import Settings, { CityRadius, DistributionItem } from "../models/settings";
import SingleSlider from "./SingleSlider";

const CustomerDistribution: React.FC<{
  settings: Settings;
  updatedSettings: (updatedSettingsValues: Settings) => void;
}> = (props) => {
  const [allDistributions, setAllDistributions] = useState<DistributionItem[]>(
    props.settings.distributions
  );

  const [cityRadius, setCityRadius] = useState<CityRadius>(
    props.settings.cityRadius
  );

  const [isReadyToSetMarker, setIsReadyToSetMarker] = useState<boolean>(false);
  const [removeMarker, setRemoveMarker] = useState<boolean>(false);

  const addDistributionHandler = () => {
    const newDistribution = new DistributionItem(
      cityRadius.cityId,
      "Manager",
      100,
      false
    );
    setAllDistributions((prevDistributions) => {
      return prevDistributions.concat(newDistribution);
    });
  };

  const updateDistributionHandler = (id: string, distri: DistributionItem) => {
    for (let distribution of allDistributions) {
      if (distribution.id === id) {
        return props.settings.distributions.splice(
          allDistributions.indexOf(distribution),
          1,
          distri
        );
      }
    }
  };

  const sliderChangeHandler = (newValue: number) => {
    console.log("to be updated " + JSON.stringify(newValue));
    console.log("all nimbs " + JSON.stringify(cityRadius));
    setCityRadius((prevRad) => ({ ...prevRad, setValue: newValue }));
  };

  const cityNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setCityRadius((prevCityRad) => ({
      ...prevCityRad,
      name: event.target.value,
    }));
  };

  const saveDistributionsHandler = () => {
    props.settings.distributions = allDistributions;
    props.settings.cityRadius = cityRadius;
    props.updatedSettings(props.settings);
  };

  const removeDistributionHandler = (id: string) => {
    const newDistributionArray = allDistributions.filter(
      (distribution) => distribution.id !== id
    );
    setAllDistributions(newDistributionArray);
  };

  const setMarkerHandler = () => {
    setIsReadyToSetMarker(true);
  };

  const setRdyInCd = (value: boolean) => {
    setIsReadyToSetMarker(value);
  };

  const removeMarkerHandler = () => {
    setRemoveMarker(true);
  };

  const setRemoved = () => {
    setRemoveMarker(false);
  };

  useEffect(() => {
    props.settings.distributions = allDistributions;
    props.settings.cityRadius = cityRadius;
  }, [allDistributions, cityRadius, props]);

  return (
    <React.Fragment>
      <Grid className="grid" container direction="row" spacing={2}>
        <Grid className="box" item xs={6}>
          <GmapDistribution
            radius={cityRadius.setValue}
            readyToSetMarker={isReadyToSetMarker}
            readyToRemoveMarker={removeMarker}
            setReadyInCd={setRdyInCd}
            setRemoved={setRemoved}
          />
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
                    value={cityRadius.name}
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
                  {cityRadius.label}
                </Grid>
                <Grid item xs={5}>
                  <SingleSlider
                    label={cityRadius.label}
                    minValue={cityRadius.minValue}
                    maxValue={cityRadius.maxValue}
                    setValue={cityRadius.setValue}
                    sliderUnit={cityRadius.unit}
                    singleSliderChange={sliderChangeHandler}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              {allDistributions.map((distribution) => (
                <DistributionUnit
                  key={distribution.id}
                  distribution={distribution}
                  updateDistribution={updateDistributionHandler}
                  removeDistribution={removeDistributionHandler}
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
