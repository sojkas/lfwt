import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { TextField, IconButton, Grid } from "@mui/material";
import { RemoveCircleOutline } from "@mui/icons-material";
import { Nimbee } from "../models/settings";
import React, { useEffect, useState } from "react";
import {toSafeInt} from "../utils/supportFunctions";

const NimbeeItem: React.FC<{
  nimbee: Nimbee;
  updatedNimbee: (id: string, nimbee: Nimbee) => void;
  removeNimbee: (id: string) => void;
}> = (props) => {
  const [nimbee, setNimbee] = useState<Nimbee>(props.nimbee);

  const nimbeeNameHandler = (event: SelectChangeEvent) => {
    event.preventDefault();
    setNimbee((nimb) => ({ ...nimb, nimbeeName: event.target.value }));
  };

  const nimbeeCapacityHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setNimbee((nimb) => ({
      ...nimb,
      nimbeeCapacity: toSafeInt(event.target.value),
    }));
  };

  const nimbeePiecesHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNimbee((nimb) => ({
      ...nimb,
      nimbeePieces: toSafeInt(event.target.value),
    }));
  };
  const removeNimbeeHandler = () => {
    return props.removeNimbee(props.nimbee.id);
  }

  useEffect(()=>{
    props.updatedNimbee(nimbee.id, nimbee);
  },[nimbee])

  return (
    <Grid container direction="row" spacing={2} className="item-space">
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="nimbee-label">Nimbees</InputLabel>
          <Select
            labelId="nimbee-label"
            id={nimbee.id}
            value={nimbee.nimbeeName}
            label="Nimbees"
            onChange={nimbeeNameHandler}
            size="small"
          >
            <MenuItem value={"v 1"}>v 1</MenuItem>
            <MenuItem value={"v 2"}>v 2</MenuItem>
            <MenuItem value={"v 3"}>v 3</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <TextField
          id="nimbee-capacity"
          label="Capacity"
          variant="outlined"
          value={nimbee.nimbeeCapacity}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          size="small"
          onChange={nimbeeCapacityHandler}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          id="nimbee-pieces"
          label="Pieces"
          variant="outlined"
          value={nimbee.nimbeePieces}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          size="small"
          onChange={nimbeePiecesHandler}
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton aria-label="remove" onClick={removeNimbeeHandler}>
          <RemoveCircleOutline />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default NimbeeItem;
