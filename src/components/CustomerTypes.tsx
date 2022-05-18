import { Grid, TextField, IconButton, Button } from "@mui/material";
import React from "react";
import ParkingInterval from "./ParkingInterval";
import { Add } from "@mui/icons-material";
import RangeSlider from "./RangeSlider";
import SingleSlider from "./SingleSlider";

const CustomerTypes = () => {
  return (
    <React.Fragment>
      <Grid className="grid" container direction="row" spacing={2}>
        <Grid className="box" item xs={4}>
          List of items
        </Grid>
        <Grid className="box" item xs={8}>
          <h4>Add / Edit Customer segment</h4>
          <Grid container direction="column" spacing={1}>
            <Grid item xs={1}>
              <TextField
                id="segment-name"
                label="Segment name"
                variant="outlined"
                defaultValue="Outskirts car adicts"
              />
            </Grid>
            <Grid item xs={1}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={2}>
                  <label>Charges per mounth</label>
                </Grid>
                <Grid item xs={6}>
                  <RangeSlider
                    label="Charges per mounth"
                    minValue={1}
                    maxValue={30}
                    minSetValue={8}
                    maxSetValue={17}
                    sliderUnit="charges"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={2}>
                  <label>kWh per charge</label>
                </Grid>
                <Grid item xs={6}>
                  <RangeSlider
                    label="kWh per charge"
                    minValue={5}
                    maxValue={40}
                    minSetValue={17}
                    maxSetValue={26}
                    sliderUnit="kWh"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={2}>
                  <label>Subscriber ratio</label>
                </Grid>
                <Grid item xs={6}>
                  <SingleSlider
                    label="Subscriber ratio"
                    minValue={0}
                    maxValue={100}
                    setValue={60}
                    sliderUnit="%"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={2}>
                  <label>Same day orders</label>
                </Grid>
                <Grid item xs={6}>
                  <SingleSlider
                    label="Same day orders"
                    minValue={0}
                    maxValue={40}
                    setValue={20}
                    sliderUnit="%"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} container direction="row" spacing={2}>
              <ParkingInterval
                parkingFrom="10 am"
                parkingTo="2 pm"
                parkingPercentage="35%"
              />
              <ParkingInterval
                parkingFrom="8 am"
                parkingTo="3 pm"
                parkingPercentage="45%"
              />
              <ParkingInterval
                parkingFrom="8 pm"
                parkingTo="10 pm"
                parkingPercentage="10%"
              />
              <ParkingInterval
                parkingFrom="6 am"
                parkingTo="8 am"
                parkingPercentage="10%"
              />
            </Grid>
            <Grid item xs={1}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <IconButton aria-label="add" size="large">
                    <Add />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
                <Button variant="outlined">Save</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomerTypes;
