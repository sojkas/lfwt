import { Grid } from "@mui/material";
import React from "react";
import Icon from "@mui/material/Icon";
import { Remove } from "@mui/icons-material";
import { TextField} from "@mui/material";
import ClockSelect from "./ClockSelect";

const Shift: React.FC<{ shiftName: string, shiftFrom: string, shiftTo: string, drivers: number }> = (props) => {
  
  
  const shiftNameFrom: string = props.shiftName + " from";
  const shiftNameTo: string = props.shiftName + " to";

  return (
    <React.Fragment>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={4}>
            <ClockSelect label={shiftNameFrom} clockValue={props.shiftFrom} />
        </Grid>
        <Grid item xs={1}>
          <Icon fontSize="large">
            <Remove />
          </Icon>
        </Grid>
        <Grid item xs={4}>
            <ClockSelect label={shiftNameTo} clockValue={props.shiftTo} />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="drivers"
            label="Drivers"
            variant="outlined"
            defaultValue={props.drivers}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Shift;
