import { Grid, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import ClockSelect from "./ClockSelect";
import { Shift } from "../models/settings";

const ShiftItem: React.FC<{
  shift: Shift;
  updateShift: (id: string, shift: Shift) => void;
}> = (props) => {
  const [shift, setShift] = useState<Shift>(props.shift);

  const shiftNameFrom: string = props.shift.shiftName + " from";
  const shiftNameTo: string = props.shift.shiftName + " to";

  const changeFromHandler = (value: string) => {
    setShift((prevShift) => ({ ...prevShift, from: value }));
  };

  const changeToHandler = (value: string) => {
    setShift((prevShift) => ({ ...prevShift, to: value }));
  };

  const changeDriversHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setShift((prevShift) => ({
      ...prevShift,
      drivers: parseInt(event.target.value),
    }));
  };

  useEffect(() => {
    props.updateShift(shift.id, shift);
  }, [shift]);

  return (
    <React.Fragment>
      <Grid container direction="row" spacing={2} className="item-space">
        <Grid item xs={4}>
          <ClockSelect
            label={shiftNameFrom}
            clockValue={shift.from}
            changedClockValue={changeFromHandler}
          />
        </Grid>
        <Grid item xs={4}>
          <ClockSelect
            label={shiftNameTo}
            clockValue={shift.to}
            changedClockValue={changeToHandler}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="drivers"
            label="Drivers"
            variant="outlined"
            value={shift.drivers}
            size="small"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={changeDriversHandler}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ShiftItem;
