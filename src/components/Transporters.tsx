import { Grid } from "@mui/material";
import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { TextField, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import Settings from "../models/settings";

const Transporters: React.FC<{settings: Settings}> = (props) => {

  const [transporter, setTransporter] = useState<number>(props.settings.transporterCount);
  const transporterHandler = (event: SelectChangeEvent) => {
    event.preventDefault();
    setTransporter(parseInt(event.target.value, 10));
  };

  return (
    <React.Fragment>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={6}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="transporter-label">Transporters</InputLabel>
                <Select
                  labelId="transporter-label"
                  id="transporter-select"
                  value={transporter.toString()}
                  label="Transporters"
                  onChange={transporterHandler}
                  size="small"
                >
                  <MenuItem value={1}>1 unit</MenuItem>
                  <MenuItem value={2}>2 units</MenuItem>
                  <MenuItem value={3}>3 units</MenuItem>
                  <MenuItem value={4}>4 units</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="transporter-capacity"
                label="Capacity"
                variant="outlined"
                defaultValue={props.settings.transporterCapacity}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <IconButton aria-label="add" size="small">
                <Add />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Transporters;
