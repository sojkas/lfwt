import React, { useState } from "react";

import { Select, InputLabel,  FormControl, MenuItem, SelectChangeEvent} from "@mui/material";

const ClockSelect: React.FC<{label: string, clockValue: number, changedClockValue: (value: number) => void}> = (props) => {
    const clockId = props.label + "-select";
    const [selectedClock, setSelectedClock]=useState<number>(props.clockValue);
    const setClockHandler = (event: SelectChangeEvent) => {
        event.preventDefault();
        setSelectedClock(parseInt(event.target.value));
        return props.changedClockValue(parseInt(event.target.value));
    }
    const hours: number[] = [];
    for (let i=0; i<24; i++){
      hours[i]=i;
    };


    return (
        <React.Fragment>
            <FormControl fullWidth>
            <InputLabel id={props.label}>{props.label}</InputLabel>
            <Select
              labelId={props.label}
              id={clockId}
              value={selectedClock.toString()}
              label={props.label}
              onChange={setClockHandler}
              size="small"
            >
              {hours.map((hour)=>
              <MenuItem value={hour}>{hour}</MenuItem>
              )}
            </Select>
          </FormControl>
        </React.Fragment>
    );

};

export default ClockSelect;
