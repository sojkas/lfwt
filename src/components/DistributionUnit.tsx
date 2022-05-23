import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Stack,
  Typography,
  Switch,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import React, { useState } from "react";

const DistributionUnit: React.FC<{ distributor: string, distributionValue: number, isChecked: boolean }> = (props) => {
  const [distribution, setDistribution] = useState<string>(props.distributor);
  const [isChecked, setIsChecked] = useState<boolean>(props.isChecked);

  const distributionHandler = (event: SelectChangeEvent) => {
    event.preventDefault();
    setDistribution(event.target.value);
  };
  const isCheckedHandler = () => {
    setIsChecked(!isChecked);
  }

  return (
    <React.Fragment>
      <Grid container direction="column" spacing={1}>
        <Grid item xs={6}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <Select
                  labelId="distribution-label"
                  id="distribution-select"
                  value={distribution}
                  onChange={distributionHandler}
                  size="small"
                >
                  <MenuItem value={"Manager"}>Manager</MenuItem>
                  <MenuItem value={"Distribution 2"}>Distribution 2</MenuItem>
                  <MenuItem value={"Distribution 3"}>Distribution 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="distribution-value-name"
                variant="outlined"
                defaultValue={props.distributionValue}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                size="small"
              />
            </Grid>
            <Grid item xs={3}>
              <Stack direction="row" spacing={1}>
                <Typography>Random</Typography>
                <Switch
                  checked={isChecked}
                  inputProps={{ "aria-label": "ant design" }}
                  onChange={isCheckedHandler}
                />
                <Typography>Cluster</Typography>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <IconButton aria-label="add" size="small">
                <Remove />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={9}></Grid>
            <Grid item xs={3}>
              <IconButton aria-label="add" size="small">
                <Add />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DistributionUnit;
