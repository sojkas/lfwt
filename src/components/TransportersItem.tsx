import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { TextField, IconButton } from "@mui/material";
import { RemoveCircleOutline } from "@mui/icons-material";
import { Transporter } from "../models/settings";

const TransportersItem: React.FC<{
  transporter: Transporter;
  updatedTransporter: (id: string, transporter: Transporter) => void;
  removeTransporter: (id: string) => void;
}> = (props) => {
  const [transporter, setTransporter] = useState<Transporter>(
    props.transporter
  );

  const transporterSlotsHandler = (event: SelectChangeEvent) => {
    event.preventDefault();
    setTransporter((transp) => ({ ...transp, transporterSlots: parseInt(event.target.value) }));
  };

  const transporterCapacityHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setTransporter((transp) => ({
      ...transp,
      transporterCapacity: parseInt(event.target.value),
    }));
  };

  const transporterPiecesHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTransporter((transp) => ({
      ...transp,
      transporterPieces: parseInt(event.target.value),
    }));
  };
  const removeTransporterHandler = () => {
    return props.removeTransporter(props.transporter.id);
  };

  useEffect(() => {
    props.updatedTransporter(transporter.id, transporter);
  }, [transporter]);

  return (
    <React.Fragment>
      <Grid container direction="row" spacing={2} className="item-space">
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="transporter-label">Transporters</InputLabel>
            <Select
              labelId="transporter-label"
              id="transporter-select"
              value={transporter.transporterSlots.toString()}
              label="Transporters"
              onChange={transporterSlotsHandler}
              size="small"
            >
              <MenuItem value={1}>1 unit</MenuItem>
              <MenuItem value={2}>2 units</MenuItem>
              <MenuItem value={3}>3 units</MenuItem>
              <MenuItem value={4}>4 units</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="transporter-capacity"
            label="Capacity"
            variant="outlined"
            value={transporter.transporterCapacity}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            size="small"
            onChange={transporterCapacityHandler}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="transporter-pieces"
            label="Pieces"
            variant="outlined"
            value={transporter.transporterPieces}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            size="small"
            onChange={transporterPiecesHandler}
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton aria-label="remove" onClick={removeTransporterHandler}>
            <RemoveCircleOutline />
          </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default TransportersItem;
