import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import {FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField,} from "@mui/material";
import {RemoveCircleOutline} from "@mui/icons-material";
import {DepotUnit} from "../models/settings";

const DepotSetUnit: React.FC<{
  depotUnit: DepotUnit;
  disabled: boolean;
  removeDepotUnit: (id: string) => void;
  updateDepotUnit: (depotUnit: DepotUnit) => void;
}> = (props) => {


  const [depotUnit, setDepotUnit] = useState<DepotUnit>(props.depotUnit);

  const depotSlotsHandler = (event: SelectChangeEvent) => {
    event.preventDefault();
    const newValue: number = parseInt(event.target.value);
    setDepotUnit((prevSetDepotUnit) => {
      const unit = {...prevSetDepotUnit, depotSlotNumber: newValue};
      props.updateDepotUnit(unit);
      return unit;
    });
  };

  const depotNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDepotUnit((prevDepotUnit)=>{
      const unit = {...prevDepotUnit, depotName: event.target.value};
      props.updateDepotUnit(unit);
      return unit
    });
  }

  const removeDepotUnitHandler = () => {
    props.removeDepotUnit(props.depotUnit.id);
  };

  return (
      <React.Fragment>
        <Grid spacing={2} direction="row" container >
          <Grid item xs={5}>
            <TextField fullWidth
                 disabled={props.disabled}
                 id="depot"
                 label="Depot name"
                 variant="outlined"
                 value={depotUnit.depotName}
                 size="small"
                 onChange={depotNameChangeHandler}
            />
          </Grid>
          <Grid item xs={5}>
            <FormControl disabled={props.disabled} fullWidth >
              <InputLabel id="slot-depot-label">Depot slots</InputLabel>
              <Select
                  disabled={props.disabled}
                  labelId="slot-depot-label"
                  id="slot-depot-select"
                  value={depotUnit.depotSlotNumber.toString()}
                  label="Slots per Depot"
                  onChange={depotSlotsHandler}
                  size="small"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <IconButton aria-label="remove" onClick={removeDepotUnitHandler}>
              <RemoveCircleOutline />
            </IconButton>
          </Grid>
        </Grid>
      </React.Fragment>
  );
};

export default DepotSetUnit;
