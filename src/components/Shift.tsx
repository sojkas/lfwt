import { Grid } from "@mui/material";
import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Icon from "@mui/material/Icon";
import { Remove } from "@mui/icons-material";
import { TextField, InputLabel,  FormControl, MenuItem} from "@mui/material";

const Shift: React.FC<{ shiftName: string }> = (props) => {
  const [shiftFrom, setShiftFrom] = useState<string>("8 am");
  const [shiftTo, setShiftTo] = useState<string>("4 pm");
  const shiftFromHandler = (event: SelectChangeEvent) => {
    event.preventDefault();
    setShiftFrom(event.target.value);
  };
  const shiftToHandler = (event: SelectChangeEvent) => {
    event.preventDefault();
    setShiftTo(event.target.value);
  };

  const shiftNameFrom: string = props.shiftName + " from";
  const shiftNameTo: string = props.shiftName + " to";

  return (
    <React.Fragment>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="shift-label-from">{shiftNameFrom}</InputLabel>
            <Select
              labelId="shift-label-from"
              id="shift-select-from"
              value={shiftFrom}
              label={shiftNameFrom}
              onChange={shiftFromHandler}
            >
              <MenuItem value={"0 am"}>0 am</MenuItem>
              <MenuItem value={"1 am"}>1 am</MenuItem>
              <MenuItem value={"2 am"}>2 am</MenuItem>
              <MenuItem value={"3 am"}>3 am</MenuItem>
              <MenuItem value={"4 am"}>4 am</MenuItem>
              <MenuItem value={"5 am"}>5 am</MenuItem>
              <MenuItem value={"6 am"}>6 am</MenuItem>
              <MenuItem value={"7 am"}>7 am</MenuItem>
              <MenuItem value={"8 am"}>8 am</MenuItem>
              <MenuItem value={"9 am"}>9 am</MenuItem>
              <MenuItem value={"10 am"}>10 am</MenuItem>
              <MenuItem value={"11 am"}>11 am</MenuItem>
              <MenuItem value={"12 am"}>12 am</MenuItem>
              <MenuItem value={"1 pm"}>1 pm</MenuItem>
              <MenuItem value={"2 pm"}>2 pm</MenuItem>
              <MenuItem value={"3 pm"}>3 pm</MenuItem>
              <MenuItem value={"4 pm"}>4 pm</MenuItem>
              <MenuItem value={"5 pm"}>5 pm</MenuItem>
              <MenuItem value={"6 pm"}>6 pm</MenuItem>
              <MenuItem value={"7 pm"}>7 pm</MenuItem>
              <MenuItem value={"8 pm"}>8 pm</MenuItem>
              <MenuItem value={"9 pm"}>9 pm</MenuItem>
              <MenuItem value={"10 pm"}>10 pm</MenuItem>
              <MenuItem value={"11 pm"}>11 pm</MenuItem>
              <MenuItem value={"12 pm"}>12 pm</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <Icon fontSize="large">
            <Remove />
          </Icon>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="shift-label-to">{shiftNameTo}</InputLabel>
            <Select
              labelId="shift-label-to"
              id="shift-select-to"
              value={shiftTo}
              label={shiftNameTo}
              onChange={shiftToHandler}
            >
              <MenuItem value={"0 am"}>0 am</MenuItem>
              <MenuItem value={"1 am"}>1 am</MenuItem>
              <MenuItem value={"2 am"}>2 am</MenuItem>
              <MenuItem value={"3 am"}>3 am</MenuItem>
              <MenuItem value={"4 am"}>4 am</MenuItem>
              <MenuItem value={"5 am"}>5 am</MenuItem>
              <MenuItem value={"6 am"}>6 am</MenuItem>
              <MenuItem value={"7 am"}>7 am</MenuItem>
              <MenuItem value={"8 am"}>8 am</MenuItem>
              <MenuItem value={"9 am"}>9 am</MenuItem>
              <MenuItem value={"10 am"}>10 am</MenuItem>
              <MenuItem value={"11 am"}>11 am</MenuItem>
              <MenuItem value={"12 am"}>12 am</MenuItem>
              <MenuItem value={"1 pm"}>1 pm</MenuItem>
              <MenuItem value={"2 pm"}>2 pm</MenuItem>
              <MenuItem value={"3 pm"}>3 pm</MenuItem>
              <MenuItem value={"4 pm"}>4 pm</MenuItem>
              <MenuItem value={"5 pm"}>5 pm</MenuItem>
              <MenuItem value={"6 pm"}>6 pm</MenuItem>
              <MenuItem value={"7 pm"}>7 pm</MenuItem>
              <MenuItem value={"8 pm"}>8 pm</MenuItem>
              <MenuItem value={"9 pm"}>9 pm</MenuItem>
              <MenuItem value={"10 pm"}>10 pm</MenuItem>
              <MenuItem value={"11 pm"}>11 pm</MenuItem>
              <MenuItem value={"12 pm"}>12 pm</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="drivers"
            label="Drivers"
            variant="outlined"
            defaultValue="5"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Shift;
