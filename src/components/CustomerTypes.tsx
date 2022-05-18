import { Grid, TextField, IconButton } from "@mui/material";
import React from "react";
import ParkingInterval from "./ParkingInterval";
import { Add } from "@mui/icons-material";

const CustomerTypes = () => {
  return (
    <React.Fragment>
      <Grid className="grid" container direction="row" spacing={2}>
        <Grid className="box" item xs={4}>
          List of items
        </Grid>
        <Grid className="box" item xs={8}>
          <h4>Add / Edit Customer segment</h4>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={1}>
              <TextField
                id="segment-name"
                label="Segment name"
                variant="outlined"
                defaultValue="Outskirts car adicts"
              />
            </Grid>
            <Grid item xs={1}>
              druhy
            </Grid>
            <Grid item xs={1}>
              treti
            </Grid>
            <Grid item xs={2}>
              ctvrty
            </Grid>
            <Grid item xs={2}>
              paty
            </Grid>
            <Grid item xs={5} container direction="row" spacing={2}>
              <ParkingInterval
                parkingFrom="10 am"
                parkingTo="2 pm"
                parkingPercentage="60%"
              />
              <ParkingInterval
                parkingFrom="10 am"
                parkingTo="2 pm"
                parkingPercentage="60%"
              />
              <ParkingInterval
                parkingFrom="10 am"
                parkingTo="2 pm"
                parkingPercentage="60%"
              />
              <ParkingInterval
                parkingFrom="10 am"
                parkingTo="2 pm"
                parkingPercentage="60%"
              />
              <ParkingInterval
                parkingFrom="10 am"
                parkingTo="2 pm"
                parkingPercentage="60%"
              />
              <ParkingInterval
                parkingFrom="10 am"
                parkingTo="2 pm"
                parkingPercentage="60%"
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <IconButton aria-label="add" size="large">
                    <Add />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomerTypes;
