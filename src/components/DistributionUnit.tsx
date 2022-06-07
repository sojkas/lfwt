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
import { Customer, DistributionItem } from "../models/settings";
import { findCustomerIdByName } from "../utils/supportFunctions";

const DistributionUnit: React.FC<{
  distribution: DistributionItem;
  allCustomers: Customer[];
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
      customerId: findCustomerIdByName(props.allCustomers, event.target.value)!
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
    props.removeDistribution(distribution.id);
  }

  useEffect(()=>{
    props.updateDistribution(distribution.id, distribution);
  },[distribution])

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
              {props.allCustomers && props.allCustomers.map(
                (customer) =>(
                  <MenuItem key={customer.id} value={customer.name}>{customer.name}</MenuItem>
                )
              )}
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
