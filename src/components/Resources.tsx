import { Fab, TextField, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Gmap from "./Gmap";
import DepotSetUnit from "./DepotSetUnit";
import Nimbees from "./Nimbees";
import Transporters from "./Transporters";
import Shift from "./Shift";
import Settings, { DepotUnit } from "../models/settings";
import { Add } from "@mui/icons-material";

const Resources: React.FC<{ settings: Settings, updatedSettings: (updatedSettings: Settings)=> void }> = (props) => {
  const [depotSlotUnits, setDepotSlotUnits] = useState<DepotUnit[]>(
    props.settings.depotUnits
  );

  const [cityName, setCityName] = useState<string>(props.settings.depotCity.cityName);

  const addDepotUnitHandler = () => {
    const newDepot: DepotUnit = new DepotUnit(props.settings.depotCity.cityId, "New Depot", 8);
    setDepotSlotUnits(depotSlotUnits.concat(newDepot));
  }

  const removeDepotUnitHandler = (id: string) => {
    const newDepotUnitsList = depotSlotUnits.filter((depotSlotUnit)=> depotSlotUnit.id !== id);
    setDepotSlotUnits(newDepotUnitsList);
  }

  const updateDepotUnitHandler = (dpUnit: DepotUnit) => {
    for (let depotUnit of depotSlotUnits){
    return props.settings.depotUnits.splice(depotSlotUnits.indexOf(depotUnit), 1, dpUnit);
    }
  }

  const cityNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCityName(event.target.value);
  }

  useEffect(()=>{
    props.settings.depotCity.cityName = cityName;
    props.settings.depotUnits = depotSlotUnits;
    props.updatedSettings(props.settings);
  },[depotSlotUnits, cityName, props]);



  return (
    <React.Fragment>
      <Grid
        className="grid"
        container
        direction="row"
        justifyContent="center"
        spacing={1}
      >
        <Grid className="box" item xs={4}>
          <h4>Depots configuration</h4>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={1}>
              <TextField
                id="city"
                label="City"
                variant="outlined"
                value={props.settings.depotCity.cityName}
                size="small"
                onChange={cityNameChangeHandler}
              />
            </Grid>
            <Grid item rowSpacing={2}>
              {depotSlotUnits.map((depotUnit) => (
                <DepotSetUnit key={depotUnit.id} depotUnit={depotUnit} removeDepotUnit={removeDepotUnitHandler} updateDepotUnit={updateDepotUnitHandler}/>
              ))}
            </Grid>
            <Grid item xs={1}>
              <Fab aria-label="add" onClick={addDepotUnitHandler}>
                <Add />
              </Fab>
            </Grid>
          </Grid>
          <div className="space-20"></div>
          <Gmap />
        </Grid>
        <Grid className="box" item xs={4}>
          <h4>Batteries & Transporters</h4>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={6}>
              <Nimbees settings={props.settings} />
            </Grid>
            <Grid item xs={6}>
              <Transporters settings={props.settings} />
            </Grid>
          </Grid>
        </Grid>
        <Grid className="box" item xs={4}>
          <h4>Drivers & Workshifts</h4>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={6}>
              <Shift
                shiftName={props.settings.shiftName[0]}
                shiftParams={props.settings.shiftMorningParams}
              />
            </Grid>
            <Grid item xs={6}>
              <Shift
                shiftName={props.settings.shiftName[1]}
                shiftParams={props.settings.shiftEveningParams}
              />
            </Grid>
            <Grid item xs={6}>
              <Shift
                shiftName={props.settings.shiftName[2]}
                shiftParams={props.settings.shiftNightParams}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Resources;
