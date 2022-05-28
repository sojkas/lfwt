import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  IconButton,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import { RemoveCircleOutline } from "@mui/icons-material";
import { DepotUnit } from "../models/settings";

const DepotSetUnit: React.FC<{
  depotUnit: DepotUnit;
  removeDepotUnit: (id: string) => void;
  updateDepotUnit: (id: string, depotUnit: DepotUnit) => void;
}> = (props) => {
  const [depotUnit, setDepotUnit] = useState<DepotUnit>(props.depotUnit);

  const depotSlotsHandler = (event: SelectChangeEvent) => {
    event.preventDefault();
    const newValue: number = parseInt(event.target.value);
    setDepotUnit((prevSetDepotUnit) => ({
      ...prevSetDepotUnit,
      depotSlotNumber: newValue,
    }));
  };

  const depotNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDepotUnit((prevDepotUnit)=>({...prevDepotUnit, depotName: event.target.value}));
  }

  const removeDepotUnitHandler = () => {
    props.removeDepotUnit(props.depotUnit.id);
  };

  useEffect (()=>{
    props.updateDepotUnit(props.depotUnit.id, depotUnit);
  }, [depotUnit]);

  return (
    <React.Fragment>
      <Grid container direction="row" spacing={2} className="item-space">
        <Grid item xs={5}>
          <TextField
            id="depot"
            label="Depot set"
            variant="outlined"
            value={depotUnit.depotName}
            size="small"
            onChange={depotNameChangeHandler}
          />
        </Grid>
        <Grid item xs={5}>
          <FormControl fullWidth>
            <InputLabel id="slot-depot-label">Depot slots</InputLabel>
            <Select
              labelId="slot-depot-label"
              id="slot-depot-select"
              value={depotUnit.depotSlotNumber.toString()}
              label="Slots per Depot"
              onChange={depotSlotsHandler}
              size="small"
            >
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={12}>12</MenuItem>
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
