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
import { RemoveCircleOutline } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { DistributionItem } from "../models/settings";

const DistributionUnit: React.FC<{
  distribution: DistributionItem;
  updateDistribution: (id: string, distribution: DistributionItem) => void;
  removeDistribution: (id: string) => void;
}> = (props) => {
  const [distribution, setDistribution] = useState<DistributionItem>(
    props.distribution
  );

  const distributorChangeHandler = (event: SelectChangeEvent) => {
    event.preventDefault();
    setDistribution((prevDistr) => ({
      ...prevDistr,
      distributor: event.target.value,
    }));
  };
  const distributionValueHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setDistribution((prevDistr) => ({
      ...prevDistr,
      distributionValue: parseInt(event.target.value),
    }));
  };
  const isCheckedHandler = () => {
    setDistribution((prevDistr) => ({
      ...prevDistr,
      isChecked: !distribution.isChecked,
    }));
  };

  const removeDistributonHandler = () => {
    props.removeDistribution(props.distribution.id);
  }

  useEffect(()=>{
    props.updateDistribution(props.distribution.id, distribution);
  },[distribution, props])

  return (
    <React.Fragment>
      <Grid container direction="row" spacing={2} className="item-space">
        <Grid item xs={3}>
          <FormControl fullWidth>
            <Select
              labelId="distribution-label"
              id="distribution-select"
              value={distribution.distributor}
              onChange={distributorChangeHandler}
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
            value={distribution.distributionValue}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            size="small"
            onChange={distributionValueHandler}
          />
        </Grid>
        <Grid item xs={3}>
          <Stack direction="row" spacing={1}>
            <Typography>Random</Typography>
            <Switch
              checked={distribution.isChecked}
              inputProps={{ "aria-label": "ant design" }}
              onChange={isCheckedHandler}
            />
            <Typography>Cluster</Typography>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <IconButton aria-label="add" size="small" onClick={removeDistributonHandler}>
            <RemoveCircleOutline />
          </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DistributionUnit;
