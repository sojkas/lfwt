import { Grid } from "@mui/material";
import React from "react";
import Icon from "@mui/material/Icon";
import { Remove } from "@mui/icons-material";
import { TextField} from "@mui/material";
import ClockSelect from "./ClockSelect";

const Shift: React.FC<{ shiftName:string, shiftParams: [string, string, number] }> = (props) => {
  
  
  const shiftNameFrom: string = props.shiftName + " from";
  const shiftNameTo: string = props.shiftName + " to";

  return (
    <React.Fragment>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={4}>
            <ClockSelect label={shiftNameFrom} clockValue={props.shiftParams[0]} />
        </Grid>
        <Grid item xs={1}>
          <Icon fontSize="small">
            <Remove />
          </Icon>
        </Grid>
        <Grid item xs={4}>
            <ClockSelect label={shiftNameTo} clockValue={props.shiftParams[1]} />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="drivers"
            label="Drivers"
            variant="outlined"
            defaultValue={props.shiftParams[2]}
            size="small"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Shift;
