import { Grid, TextField, IconButton, Button } from "@mui/material";
import React, { useState } from "react";
import { Add } from "@mui/icons-material";
import RangeSlider from "./RangeSlider";
import SingleSlider from "./SingleSlider";
import { Settings, ParkingInterval } from "../models/settings";
import ParkingIntervalItem from "./ParkingIntervalItem";

const CustomerTypes: React.FC<{ settings: Settings }> = (props) => {
  const [allParkingIntervals, setAllParkingIntervals] = useState<
    Settings["parking"]
  >(props.settings.parking);
  const addParkingHandler = () => {
    const newParkingInterval = new ParkingInterval("12 am", "12 am", 0);
    setAllParkingIntervals((prevIntervals) => {
      return prevIntervals.concat(newParkingInterval);
    });
  };
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
                defaultValue={props.settings.segmentName}
                size="small"
              />
            </Grid>
            <Grid item xs={1}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={2}>
                  <label>Charges per month</label>
                </Grid>
                <Grid item xs={6}>
                  <RangeSlider
                    label="Charges per month"
                    minValue={props.settings.chargesPerMonth[0]}
                    maxValue={props.settings.chargesPerMonth[1]}
                    minSetValue={props.settings.chargesPerMonth[2]}
                    maxSetValue={props.settings.chargesPerMonth[3]}
                    sliderUnit={props.settings.chargesPerMonth[4]}
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
                    minValue={props.settings.kWhPerMonth[0]}
                    maxValue={props.settings.kWhPerMonth[1]}
                    minSetValue={props.settings.kWhPerMonth[2]}
                    maxSetValue={props.settings.kWhPerMonth[3]}
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
                    minValue={props.settings.subscriberRatio[0]}
                    maxValue={props.settings.subscriberRatio[1]}
                    setValue={props.settings.subscriberRatio[2]}
                    sliderUnit={props.settings.subscriberRatio[3]}
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
                    minValue={props.settings.sameDayOrders[0]}
                    maxValue={props.settings.sameDayOrders[1]}
                    setValue={props.settings.sameDayOrders[2]}
                    sliderUnit={props.settings.sameDayOrders[3]}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} container direction="row" spacing={2}>
              {allParkingIntervals.map((parkingOne) => (
                <ParkingIntervalItem
                  key={parkingOne.id}
                  parkingFrom={parkingOne.from}
                  parkingTo={parkingOne.to}
                  parkingPercentage={parkingOne.percent.toString() + " %"}
                />
              ))}
            </Grid>
            <Grid item xs={1}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <IconButton
                    aria-label="add"
                    size="large"
                    onClick={addParkingHandler}
                  >
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
