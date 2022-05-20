import { Grid } from "@mui/material";
import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { TextField, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

const Nimbees = () => {
  const [nimbee, setNimbee] = useState<string>("v 1");
  const nimbeeHandler = (event: SelectChangeEvent) => {
    event.preventDefault();
    setNimbee(event.target.value);
  };

  return (
    <React.Fragment>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={6}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="nimbee-label">Nimbees</InputLabel>
                <Select
                  labelId="nimbee-label"
                  id="nimbee-select"
                  value={nimbee}
                  label="Nimbees"
                  onChange={nimbeeHandler}
                  size="small"
                >
                  <MenuItem value={"v 1"}>v 1</MenuItem>
                  <MenuItem value={"v 2"}>v 2</MenuItem>
                  <MenuItem value={"v 3"}>v 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="nimbee-capacity"
                label="Capacity"
                variant="outlined"
                defaultValue="18"
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

export default Nimbees;
