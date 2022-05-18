import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import Gmap from "./Gmap";
import DepotSet from "./DepotSet";
import Nimbees from "./Nimbees";
import Transporters from "./Transporters";
import Shift from "./Shift";

const Resources = () => {
  const [depotSlots, setDepotSlots] = useState<number>(4);
  const depotSlotsHandle = (event: SelectChangeEvent) => {
    event.preventDefault();
    setDepotSlots(parseInt(event.target.value));
  };

  return (
    <div className="resources">
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
                    defaultValue="Praha"
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
              <DepotSet />
            </Grid>
          </Grid>

          <Gmap />
        </Grid>
        <Grid className="box" item xs={4}>
          <h4>Batteries & Transporters</h4>
          <Grid container direction="column" spacing={2}>
           <Grid item xs={6}><Nimbees /></Grid>
            <Grid item xs={6}><Transporters /></Grid>
          </Grid>
        </Grid>
        <Grid className="box" item xs={4}>
          <h4>Drivers & Workshifts</h4>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={6}><Shift shiftName="Morning shift" /></Grid>
            <Grid item xs={6}><Shift shiftName="Evening shift" /></Grid>
            <Grid item xs={6}><Shift shiftName="Night shift" /></Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Resources;
