import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import Gmap from "./Gmap";

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
                    size="small"
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
              <Grid container direction="column" spacing={2}>
                <Grid item xs={6}>
                  <Grid container direction="row" spacing={1}>
                    <Grid item xs={8}>
                      <TextField
                        id="depot"
                        label="Depot set"
                        variant="outlined"
                        size="small"
                        defaultValue="depot A"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Icon fontSize="small">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 12H4"
                          />
                        </svg>
                      </Icon>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Icon fontSize="small">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </Icon>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Gmap />
        </Grid>
        <Grid className="box" item xs={4}>
          <h4>Batteries & Transporters</h4>
        </Grid>
        <Grid className="box" item xs={4}>
          <h4>Drivers & Workshifts</h4>
        </Grid>
      </Grid>
    </div>
  );
};

export default Resources;
