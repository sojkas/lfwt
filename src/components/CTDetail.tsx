import React, { useEffect, useState } from "react";
import { Grid, TextField, IconButton, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import RangeSlider from "./RangeSlider";
import SingleSlider from "./SingleSlider";
import ParkingIntervalItem from "./ParkingIntervalItem";
import { CustomerDetail, ParkingInterval } from "../models/settings";

const CTDetail: React.FC<{
  customerId: string;
  customerDetail: CustomerDetail;
  updatedCustomerDetail: (customerId:string, updatedDetail: CustomerDetail) => void;
  updateCustomerName: (customerId:string, updatedName: string) => void;
}> = (props) => {
  const [allParkingIntervals, setAllParkingIntervals] = useState<
    CustomerDetail["parking"]
  >(props.customerDetail.parking);

  const [segmentName, setSegmentName] = useState<string>(
    props.customerDetail.segmentName
  );
  const [chargesPerMonth, setChargesPerMonth] = useState<number[]>([
    props.customerDetail.chargesPerMonth[2],
    props.customerDetail.chargesPerMonth[3],
  ]);
  const [kwh, setKwh] = useState<number[]>([
    props.customerDetail.kWhPerMonth[2],
    props.customerDetail.kWhPerMonth[3],
  ]);

  const [subscriberRatio, setSubscriberRatio] = useState<number>(
    props.customerDetail.subscriberRatio[2]
  );
  const [sameDayOrders, setSameDayOrders] = useState<number>(
    props.customerDetail.sameDayOrders[2]
  );
  const [sameDayeOrdersMaxValue, setSameDayOrdersMaxValue] = useState<number>(
    props.customerDetail.sameDayOrders[1]
  );

  const addParkingHandler = () => {
    const newParkingInterval = new ParkingInterval(
      props.customerId,
      "12 am",
      "12 am",
      0
    );
    setAllParkingIntervals((prevIntervals) => {
      return prevIntervals.concat(newParkingInterval);
    });
  };

  const textFieldHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSegmentName(event.target.value);
  };

  const chargesHandler = (newValue: number[]) => {
    setChargesPerMonth(newValue);
  };
  const kwhHandler = (newValue: number[]) => {
    setKwh(newValue);
  };
  const subscriberRatioHandler = (newValue: number) => {
    setSubscriberRatio(newValue);
    setSameDayOrdersMaxValue(100 - newValue);
    setSameDayOrders(Math.round((100 - newValue) / 2));
  };
  const sameDayOrderHandler = (newValue: number) => {
    setSameDayOrders(newValue);
  };

  const parkingIntervalHandler = (updatedParkingInterval: ParkingInterval) => {
    for (let parkingOne of allParkingIntervals) {
      if (parkingOne.id === updatedParkingInterval.id) {
        parkingOne = updatedParkingInterval;
      }
    }
    setAllParkingIntervals(allParkingIntervals);
  };

  useEffect(()=>{
    props.updateCustomerName(props.customerId, segmentName);
  },[segmentName]);

  const saveHandler = () => {
    props.customerDetail.segmentName = segmentName;
    props.customerDetail.parking = allParkingIntervals;
    props.customerDetail.chargesPerMonth = [
      props.customerDetail.chargesPerMonth[0],
      props.customerDetail.chargesPerMonth[1],
      chargesPerMonth[0],
      chargesPerMonth[1],
      props.customerDetail.chargesPerMonth[4],
    ];
    props.customerDetail.kWhPerMonth = [
      props.customerDetail.kWhPerMonth[0],
      props.customerDetail.kWhPerMonth[1],
      kwh[0],
      kwh[1],
      props.customerDetail.kWhPerMonth[4],
    ];
    props.customerDetail.subscriberRatio = [
      props.customerDetail.subscriberRatio[0],
      props.customerDetail.subscriberRatio[1],
      subscriberRatio,
      props.customerDetail.subscriberRatio[3],
    ];
    props.customerDetail.sameDayOrders = [
      props.customerDetail.sameDayOrders[0],
      sameDayeOrdersMaxValue,
      sameDayOrders,
      props.customerDetail.sameDayOrders[3],
    ];
    return props.updatedCustomerDetail(props.customerId, props.customerDetail);
  };

  return (
    <React.Fragment>
      <h4>Add / Edit Customer segment</h4>
      <Grid container direction="column" spacing={1}>
        <Grid item xs={1}>
          <TextField
            id="segment-name"
            label="Segment name"
            variant="outlined"
            defaultValue={segmentName}
            size="small"
            onChange={textFieldHandler}
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
                minValue={props.customerDetail.chargesPerMonth[0]}
                maxValue={props.customerDetail.chargesPerMonth[1]}
                minSetValue={chargesPerMonth[0]}
                maxSetValue={chargesPerMonth[1]}
                sliderUnit={props.customerDetail.chargesPerMonth[4]}
                rangeSliderChange={chargesHandler}
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
                minValue={props.customerDetail.kWhPerMonth[0]}
                maxValue={props.customerDetail.kWhPerMonth[1]}
                minSetValue={kwh[0]}
                maxSetValue={kwh[1]}
                sliderUnit={props.customerDetail.kWhPerMonth[4]}
                rangeSliderChange={kwhHandler}
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
                minValue={props.customerDetail.subscriberRatio[0]}
                maxValue={props.customerDetail.subscriberRatio[1]}
                setValue={subscriberRatio}
                sliderUnit={props.customerDetail.subscriberRatio[3]}
                singleSliderChange={subscriberRatioHandler}
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
                minValue={props.customerDetail.sameDayOrders[0]}
                maxValue={sameDayeOrdersMaxValue}
                setValue={sameDayOrders}
                sliderUnit={props.customerDetail.sameDayOrders[3]}
                singleSliderChange={sameDayOrderHandler}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} container direction="row" spacing={2}>
          {allParkingIntervals.map((parkingOne) => (
            <ParkingIntervalItem
              key={parkingOne.id}
              parkingIntervalItemValues={parkingOne}
              updatedParkingInterval={parkingIntervalHandler}
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
          <Button variant="outlined" onClick={saveHandler}>
            Save
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CTDetail;
