import React from "react";
import { Grid, Icon, TextField } from "@mui/material";
import ClockSelect from "./ClockSelect";
import { Remove } from "@mui/icons-material";

const ParkingInterval: React.FC<{
  parkingFrom: string;
  parkingTo: string;
  parkingPercentage: string;
}> = (props) => {
  const labelClockParkingFrom: string = "From";
  const labelClockParkingTo: string = "To";

  return (
    <React.Fragment>
      <Grid item xs={3}>
        <label>Praking interval: </label>
      </Grid>
      <Grid item xs={3}>
        <ClockSelect
          label={labelClockParkingFrom}
          clockValue={props.parkingFrom}
        />
      </Grid>
      <Grid item xs={1}>
        <Icon fontSize="small">
          <Remove />
        </Icon>
      </Grid>
      <Grid item xs={3}>
        <ClockSelect label={labelClockParkingTo} clockValue={props.parkingTo} />
      </Grid>
      <Grid item xs={2}>
        <TextField
          id={props.parkingFrom.concat(props.parkingPercentage)}
          label="Percent"
          variant="outlined"
          defaultValue={props.parkingPercentage}
          size="small"
        />
      </Grid>
    </React.Fragment>
  );
};

export default ParkingInterval;
