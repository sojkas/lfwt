import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import Gmap from "./Gmap";
import DepotSet from "./DepotSet";
import Nimbees from "./Nimbees";
import Transporters from "./Transporters";
import Shift from "./Shift";
import Settings from "../models/settings";

const Resources: React.FC<{ settings: Settings }> = (props) => {
  const [depotSlots, setDepotSlots] = useState<number>(
    props.settings.depotsSlotNumber
  );
  const depotSlotsHandle = (event: SelectChangeEvent) => {
    event.preventDefault();
    setDepotSlots(parseInt(event.target.value));
  };

  return (
    <React.Fragment {...{ className: "resources" }}>
      <Grid
        className="grid"
        container
        direction="row"
        justifyContent="center"
        spacing={1}
      >
        <Grid className="box" item xs={4}>
          <h4>Depots configuration</h4>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="city"
                    label="City"
                    variant="outlined"
                    defaultValue={props.settings.depotsCityValue}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="slot-depot-label">Depot slots</InputLabel>
                    <Select
                      labelId="slot-depot-label"
                      id="slot-depot-select"
                      value={depotSlots.toString()}
                      label="Slots per Depot"
                      onChange={depotSlotsHandle}
                      size="small"
                    >
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <DepotSet settings={props.settings} />
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
