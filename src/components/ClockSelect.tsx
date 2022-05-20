import React, { useState } from "react";

import { Select, InputLabel,  FormControl, MenuItem, SelectChangeEvent} from "@mui/material";

const ClockSelect: React.FC<{label: string, clockValue: string}> = (props) => {
    const clockId = props.label + "-select";
    const [selectedClock, setSelectedClock]=useState<string>(props.clockValue);
    const setClockHandler = (event: SelectChangeEvent) => {
        event.preventDefault();
        setSelectedClock(event.target.value);
    }

    return (
        <React.Fragment>
            <FormControl fullWidth>
            <InputLabel id={props.label}>{props.label}</InputLabel>
            <Select
              labelId={props.label}
              id={clockId}
              value={selectedClock}
              label={props.label}
              onChange={setClockHandler}
              size="small"
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
            </Select>
          </FormControl>
        </React.Fragment>
    );

};

export default ClockSelect;
