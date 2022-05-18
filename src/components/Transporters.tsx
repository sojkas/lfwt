import { Grid } from "@mui/material";
import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { TextField, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

const Transporters = () => {
  const [transporter, setTransporter] = useState<string>("2 units");
  const transporterHandler = (event: SelectChangeEvent) => {
    event.preventDefault();
    setTransporter(event.target.value);
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
                  value={transporter}
                  label="Transporters"
                  onChange={transporterHandler}
                >
                  <MenuItem value={"1 unit"}>1 unit</MenuItem>
                  <MenuItem value={"2 units"}>2 units</MenuItem>
                  <MenuItem value={"3 units"}>3 units</MenuItem>
                  <MenuItem value={"4 units"}>4 units</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="transporter-capacity"
                label="Capacity"
                variant="outlined"
                defaultValue="10"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <IconButton aria-label="add">
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
