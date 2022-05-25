import React, { useState } from "react";
import { Grid, Icon, TextField } from "@mui/material";
import ClockSelect from "./ClockSelect";
import { Remove } from "@mui/icons-material";
import { ParkingInterval } from "../models/settings";

const ParkingIntervalItem: React.FC<{
  parkingIntervalItemValues: ParkingInterval;
  updatedParkingInterval: (updatedIntervalValues: ParkingInterval) => void;
}> = (props) => {
  const labelClockParkingFrom: string = "From";
  const labelClockParkingTo: string = "To";

  const [parkingItervalValues, setParkingIntervalValues] =
    useState<ParkingInterval>(props.parkingIntervalItemValues);

    const changedClockFromValueHandler = (newValue: string) => {
      parkingItervalValues.from = newValue;
      return setParkingIntervalValues(parkingItervalValues);
    }

    const changedClockToValueHandler = (newValue: string) => {
      parkingItervalValues.to = newValue;
      return setParkingIntervalValues(parkingItervalValues);
    }

    const changePercentageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      parkingItervalValues.percent = +event.target.value;
      return setParkingIntervalValues(parkingItervalValues);
    }

  return (
    <React.Fragment>
      <Grid item xs={3}>
        <label>Parking interval: </label>
      </Grid>
      <Grid item xs={3}>
        <ClockSelect
          label={labelClockParkingFrom}
          clockValue={parkingItervalValues.from}
          changedClockValue={changedClockFromValueHandler}
        />
      </Grid>
      <Grid item xs={1}>
        <Icon fontSize="small">
          <Remove />
        </Icon>
      </Grid>
      <Grid item xs={3}>
        <ClockSelect
          label={labelClockParkingTo}
          clockValue={parkingItervalValues.to}
          changedClockValue={changedClockToValueHandler}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          id={parkingItervalValues.id}
          label="Percent"
          variant="outlined"
          defaultValue={parkingItervalValues.percent.toString()}
          size="small"
          onChange={changePercentageHandler}
        />
      </Grid>
    </React.Fragment>
  );
};

export default ParkingIntervalItem;
