import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Alert,
  Fab,
} from "@mui/material";
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
  const [chargesPerMonth, setChargesPerMonth] = useState<
    [number, number, number, number, string]
  >(props.customerDetail.chargesPerMonth);
  const [kwh, setKwh] = useState<[number, number, number, number, string]>(
    props.customerDetail.kWhPerMonth
  );

  const [subscriberRatio, setSubscriberRatio] = useState<
    [number, number, number, string]
  >(props.customerDetail.subscriberRatio);
  const [sameDayOrders, setSameDayOrders] = useState<
    [number, number, number, string]
  >(props.customerDetail.sameDayOrders);

  const addParkingHandler = () => {
    const parkingIntervalValueRemaining: number = 100 - allParkingValue;
    const newParkingInterval = new ParkingInterval(
      props.customerId,
      "12 am",
      "12 am",
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
    setChargesPerMonth([
      chargesPerMonth[0],
      chargesPerMonth[1],
      newValue[0],
      newValue[1],
      chargesPerMonth[4],
    ]);
  };
  const kwhHandler = (newValue: number[]) => {
    setKwh([kwh[0], kwh[1], newValue[0], newValue[1], kwh[4]]);
  };
  const subscriberRatioHandler = (newValue: number) => {
    setSubscriberRatio([
      subscriberRatio[0],
      subscriberRatio[1],
      newValue,
      subscriberRatio[3],
    ]);
    setSameDayOrders([
      sameDayOrders[0],
      100 - newValue,
      Math.round((100 - newValue) / 2),
      sameDayOrders[3],
    ]);
  };
  const sameDayOrderHandler = (newValue: number) => {
    setSameDayOrders([
      sameDayOrders[0],
      sameDayOrders[1],
      newValue,
      sameDayOrders[3],
    ]);
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
    setChargesPerMonth(props.customerDetail.chargesPerMonth);
    setKwh(props.customerDetail.kWhPerMonth);
    setSubscriberRatio(props.customerDetail.subscriberRatio);
    setSameDayOrders(props.customerDetail.sameDayOrders);
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
    props.customerDetail.chargesPerMonth = chargesPerMonth;
    props.customerDetail.kWhPerMonth = kwh;
    props.customerDetail.subscriberRatio = subscriberRatio;
    props.customerDetail.sameDayOrders = sameDayOrders;
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
            value={segmentName}
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
                minValue={chargesPerMonth[0]}
                maxValue={chargesPerMonth[1]}
                minSetValue={chargesPerMonth[2]}
                maxSetValue={chargesPerMonth[3]}
                sliderUnit={chargesPerMonth[4]}
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
                minValue={kwh[0]}
                maxValue={kwh[1]}
                minSetValue={kwh[2]}
                maxSetValue={kwh[3]}
                sliderUnit={kwh[4]}
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
                minValue={subscriberRatio[0]}
                maxValue={subscriberRatio[1]}
                setValue={subscriberRatio[2]}
                sliderUnit={subscriberRatio[3]}
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
                minValue={sameDayOrders[0]}
                maxValue={sameDayOrders[1]}
                setValue={sameDayOrders[2]}
                sliderUnit={sameDayOrders[3]}
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
              removeParkingInterval={removeParkingIntervalItemHandler}
            />
          ))}
        </Grid>
        {showAlert && (
          <Grid item xs={1}>
            <Alert severity="warning">
              All parking intervals percentige is over 100%.
            </Alert>
            ;
          </Grid>
        )}
        <Grid item xs={1}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={8}></Grid>
            <Grid item xs={4}>
              <Fab
                disabled={allParkingValue > 100}
                aria-label="add"
                size="large"
                onClick={addParkingHandler}
              >
                <Add />
              </Fab>
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
