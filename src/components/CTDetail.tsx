import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Alert, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import RangeSlider from "./RangeSlider";
import SingleSlider from "./SingleSlider";
import ParkingIntervalItem from "./ParkingIntervalItem";
import { CustomerDetail, ParkingInterval } from "../models/settings";

const CTDetail: React.FC<{
  customerId: string;
  customerDetail: CustomerDetail;
  updatedCustomerDetail: (
    customerId: string,
    updatedDetail: CustomerDetail
  ) => void;
  updateCustomerName: (customerId: string, updatedName: string) => void;
}> = (props) => {
  const [allParkingIntervals, setAllParkingIntervals] = useState<
    CustomerDetail["parking"]
  >(props.customerDetail.parking);

  const getAllParkingValue = (allParkingIntervals: ParkingInterval[]) => {
    let parkingValue: number = 0;
    for (let parkingInterval of allParkingIntervals) {
      parkingValue = parkingValue + parkingInterval.percent;
    }
    return parkingValue;
  };
  const [allParkingValue, setAllParkingValue] = useState<number>(
    getAllParkingValue(allParkingIntervals)
  );

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [segmentName, setSegmentName] = useState<string>(
    props.customerDetail.segmentName
  );
  const [minChargesPerMonth, setMinChargesPerMonth] = useState<number>(
    props.customerDetail.minChargesPerMonth
  );
  const [maxChargesPerMonth, setMaxChargesPerMonth] = useState<number>(
    props.customerDetail.maxChargesPerMonth
  );
  const [minKwh, setMinKwh] = useState<number>(
    props.customerDetail.minkWhPerMonth
  );
  const [maxKwh, setMaxKwh] = useState<number>(
    props.customerDetail.minkWhPerMonth
  );

  const [subscriberRatio, setSubscriberRatio] = useState<number>(
    props.customerDetail.subscriberRatio
  );
  const [setSameDayOrders, setSetSameDayOrders] = useState<number>(
    props.customerDetail.setSameDayOrdersValue
  );
  const [maxSameDayOrders, setMaxSameDayOrders] = useState<number>(
    props.customerDetail.setSameDayOrdersValue
  );

  const addParkingHandler = () => {
    const parkingIntervalValueRemaining: number = 100 - allParkingValue;
    const newParkingInterval = new ParkingInterval(
      props.customerId,
      12,
      12,
      parkingIntervalValueRemaining
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
    setMinChargesPerMonth(newValue[0]);
    setMaxChargesPerMonth(newValue[1]);
  };
  const kwhHandler = (newValue: number[]) => {
    setMinKwh(newValue[0]);
    setMaxKwh(newValue[1]);
  };
  const subscriberRatioHandler = (newValue: number) => {
    setSubscriberRatio(newValue);
    setMaxSameDayOrders(100 - newValue);
    setSetSameDayOrders(Math.round((100 - newValue) / 2));
  };
  const sameDayOrderHandler = (newValue: number) => {
    setSetSameDayOrders(newValue);
  };

  const parkingIntervalHandler = (updatedParkingInterval: ParkingInterval) => {
    for (let parkingOne of allParkingIntervals) {
      if (parkingOne.id === updatedParkingInterval.id) {
        parkingOne = updatedParkingInterval;
      }
    }
    setAllParkingIntervals(allParkingIntervals);
  };

  const removeParkingIntervalItemHandler = (parkingIntervalId: string) => {
    const newAllParkingInterVals: ParkingInterval[] =
      allParkingIntervals.filter(
        (parkingOne) => parkingOne.id !== parkingIntervalId
      );
    setAllParkingIntervals(newAllParkingInterVals);
  };

  useEffect(() => {
    props.updateCustomerName(props.customerId, segmentName);
  }, [segmentName]);

  useEffect(() => {
    setSegmentName(props.customerDetail.segmentName);
    setMinChargesPerMonth(props.customerDetail.minChargesPerMonth);
    setMaxChargesPerMonth(props.customerDetail.maxChargesPerMonth);
    setMinKwh(props.customerDetail.minkWhPerMonth);
    setMaxKwh(props.customerDetail.maxkWhPerMonth);
    setSubscriberRatio(props.customerDetail.subscriberRatio);
    setSetSameDayOrders(props.customerDetail.setSameDayOrdersValue);
    setMaxSameDayOrders(props.customerDetail.maxSameDayOrdersValue);
    setAllParkingIntervals(props.customerDetail.parking);
  }, [props.customerDetail]);

  const saveHandler = () => {
    if (getAllParkingValue(allParkingIntervals) > 100) {
      return setShowAlert(true);
    }
    setShowAlert(false);
    setAllParkingValue(getAllParkingValue(allParkingIntervals));
    props.customerDetail.segmentName = segmentName;
    props.customerDetail.parking = allParkingIntervals;
    props.customerDetail.minChargesPerMonth = minChargesPerMonth;
    props.customerDetail.maxChargesPerMonth = maxChargesPerMonth;
    props.customerDetail.minkWhPerMonth = minKwh;
    props.customerDetail.maxkWhPerMonth = maxKwh;
    props.customerDetail.subscriberRatio = subscriberRatio;
    props.customerDetail.setSameDayOrdersValue = setSameDayOrders;
    props.customerDetail.maxSameDayOrdersValue = maxSameDayOrders;

    return props.updatedCustomerDetail(props.customerId, props.customerDetail);
  };

  return (
    <React.Fragment>
      <h4>Add / Edit Customer segment</h4>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            id="segment-name"
            label="Segment name"
            variant="outlined"
            value={segmentName}
            size="small"
            onChange={textFieldHandler}
          />
        </Grid>
      </Grid>
      <p className="topPadding"></p>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={2}>
          <label>Charges per month</label>
        </Grid>
        <Grid item xs={6}>
          <RangeSlider
            label="Charges per month"
            minValue={1}
            maxValue={30}
            minSetValue={minChargesPerMonth}
            maxSetValue={maxChargesPerMonth}
            sliderUnit="charges"
            rangeSliderChange={chargesHandler}
            step={1}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={2}>
          <label>kWh per charge</label>
        </Grid>
        <Grid item xs={6}>
          <RangeSlider
            label="kWh per charge"
            minValue={5}
            maxValue={40}
            minSetValue={minKwh}
            maxSetValue={maxKwh}
            sliderUnit="kWh"
            rangeSliderChange={kwhHandler}
            step={1}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={2}>
          <label>Subscriber ratio</label>
        </Grid>
        <Grid item xs={6}>
          <SingleSlider
            label="Subscriber ratio"
            minValue={0}
            maxValue={100}
            setValue={subscriberRatio}
            sliderUnit="%"
            singleSliderChange={subscriberRatioHandler}
            step={1}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={2}>
          <label>Same day orders</label>
        </Grid>
        <Grid item xs={6}>
          <SingleSlider
            label="Same day orders"
            minValue={0}
            maxValue={maxSameDayOrders}
            setValue={setSameDayOrders}
            sliderUnit="%"
            singleSliderChange={sameDayOrderHandler}
            step={1}
          />
        </Grid>
      </Grid>
      <p className="topPadding"></p>
      <Grid container direction="row" spacing={2}>
        {allParkingIntervals.map((parkingOne) => (
          <ParkingIntervalItem
            key={parkingOne.id}
            parkingIntervalItemValues={parkingOne}
            updatedParkingInterval={parkingIntervalHandler}
            removeParkingInterval={removeParkingIntervalItemHandler}
          />
        ))}
      </Grid>
      {showAlert && (
        <Grid item xs={8}>
          <Alert severity="warning" className="item-space">
            All parking intervals percentige is over 100%.
          </Alert>
        </Grid>
      )}

      <Grid container direction="row" spacing={2}>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}>
          <Fab
            disabled={allParkingValue > 100}
            aria-label="add"
            size="small"
            onClick={addParkingHandler}
            className="item-space"
          >
            <Add />
          </Fab>
        </Grid>
      </Grid>
      <Button variant="outlined" onClick={saveHandler} className="item-space">
        Save
      </Button>
    </React.Fragment>
  );
};

export default CTDetail;
