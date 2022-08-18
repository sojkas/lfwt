import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Alert,
  Fab,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Autocomplete,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import RangeSlider from "./RangeSlider";
import SingleSlider from "./SingleSlider";
import ParkingIntervalItem from "./ParkingIntervalItem";
import { CarModel, Customer, ParkingInterval } from "../models/settings";

let allParkingValue: number = 0;

const CTDetail: React.FC<{
  custormer: Customer;
  updatedCustomer: (customer: Customer) => void;
  carsModels: CarModel[];
}> = (props) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(
    props.custormer
  );

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setSelectedCustomer(props.custormer);
  }, [props.custormer]);

  const getAllParkingValue = (customer: Customer) => {
    let parkingValue: number = 0;
    for (let parkingInterval of selectedCustomer.parking) {
      parkingValue = parkingValue + parkingInterval.percent;
    }
    return parkingValue;
  };

  allParkingValue = getAllParkingValue(selectedCustomer);

  const addParkingHandler = () => {
    const parkingIntervalValueRemaining: number = 100 - allParkingValue;
    const newParkingInterval = new ParkingInterval(
      props.custormer.id,
      12,
      12,
      parkingIntervalValueRemaining
    );
    setSelectedCustomer((prevCustomer) => {
      const newParkingIntervalArray: ParkingInterval[] = [
        ...selectedCustomer.parking,
        newParkingInterval,
      ];
      return { ...prevCustomer, parking: newParkingIntervalArray };
    });
  };

  const textFieldHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSelectedCustomer((prevCustomer) => {
      const newName = event.target.value;
      return { ...prevCustomer, name: newName };
    });
  };

  const chargesHandler = (newValue: number[]) => {
    setSelectedCustomer((prevCustomeer) => {
      const newMin = newValue[0];
      const newMax = newValue[1];
      return {
        ...prevCustomeer,
        minChargesPerMonth: newMin,
        maxChargesPerMonth: newMax,
      };
    });
  };
  const kwhHandler = (newValue: number[]) => {
    setSelectedCustomer((prevCustomeer) => {
      const newMin = newValue[0];
      const newMax = newValue[1];
      return {
        ...prevCustomeer,
        minkWhPerMonth: newMin,
        maxkWhPerMonth: newMax,
      };
    });
  };
  const startingCapacityHandler = (newValue: number[]) => {
    setSelectedCustomer((prevCustomer) => {
      const newMin = newValue[0];
      const newMax = newValue[1];
      return {
        ...prevCustomer,
        minStartingCapacity: newMin,
        maxStartingCapacity: newMax,
      };
    });
  };

  const subscriberRatioHandler = (newValue: number) => {
    setSelectedCustomer((prevCustomeer) => {
      const newRatio = newValue;
      const newSDOMax = 100 - newValue;
      const newSDOValue = Math.round((100 - newValue) / 2);
      return {
        ...prevCustomeer,
        subscriberRatio: newRatio,
        maxSameDayOrdersValue: newSDOMax,
        setSameDayOrdersValue: newSDOValue,
      };
    });
  };
  const sameDayOrderHandler = (newValue: number) => {
    setSelectedCustomer((prevCustomer) => {
      const newSDOValue = newValue;
      return { ...prevCustomer, setSameDayOrdersValue: newSDOValue };
    });
  };

  const parkingIntervalHandler = (updatedParkingInterval: ParkingInterval) => {
    let newParkingIntervalArray: ParkingInterval[] = selectedCustomer.parking;
    for (let parkingOne of selectedCustomer.parking) {
      if (parkingOne.id === updatedParkingInterval.id) {
        newParkingIntervalArray.splice(
          selectedCustomer.parking.indexOf(parkingOne),
          1,
          updatedParkingInterval
        );
      }
    }
    setSelectedCustomer((prevCustomer) => {
      return { ...prevCustomer, parking: newParkingIntervalArray };
    });
  };

  const carModelChangeHandler = (event: any, newCarModel: CarModel) => {
    event.preventDefault();
    setSelectedCustomer((prevCustomer) => {
      let newCarsModel = newCarModel;

      return {
        ...prevCustomer,
        carsModel: newCarsModel,
        name: newCarsModel.manufacturer + " " + newCarsModel.model,
        minStartingCapacity: Math.round(
          newCarsModel.batteryCapacityUseable / 4
        ),
        maxStartingCapacity: Math.round(
          3 * (newCarsModel.batteryCapacityUseable / 4)
        ),
      };
    });
  };

  const removeParkingIntervalItemHandler = (parkingIntervalId: string) => {
    setSelectedCustomer((prevCustomer) => {
      const newAllParkingInterVals: ParkingInterval[] =
        selectedCustomer.parking.filter(
          (parkingOne) => parkingOne.id !== parkingIntervalId
        );
      return { ...prevCustomer, parking: newAllParkingInterVals };
    });
  };

  const saveHandler = () => {
    const allParkingIntervalsValue = getAllParkingValue(selectedCustomer);
    if (allParkingIntervalsValue !== 100) {
      return setShowAlert(true);
    }
    setShowAlert(false);
    return props.updatedCustomer(selectedCustomer);
  };

  const defaultProps = {
    options: props.carsModels,
    getOptionLabel: (option: CarModel) =>
      option.manufacturer + " " + option.model,
  };

  const carOptions : String[] = props.carsModels.map((car)=> car.manufacturer + " " + car.model);

  return (
    <React.Fragment>
      <h4>Add / Edit Customer segment</h4>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <Autocomplete
              {...defaultProps}
              value={selectedCustomer.carsModel}
              id="disable-clearable"
              disableClearable
              onChange={carModelChangeHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Car model"
                  variant="standard"
                />
              )}
            />
            {/* <InputLabel id="carModel-label">Car model</InputLabel>
            <Select
              labelId="carModel-label"
              id="carModel-select"
              value={selectedCustomer.carsModel.pkCarsModels.toString()}
              label="CarModel"
              onChange={carModelChangeHandler}
              size="small"
            >
              {props.carsModels.map((carModel) => (
                <MenuItem value={carModel.pkCarsModels.toString()}>
                  {carModel.manufacturer} - {carModel.model}
                </MenuItem>
              ))}
            </Select> */}
          </FormControl>
        </Grid>
      </Grid>
      <p className="topPadding"></p>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={6}>
          <TextField
            fullWidth={true}
            id="segment-name"
            label="Segment name"
            variant="outlined"
            value={selectedCustomer.name}
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
            maxValue={60}
            minSetValue={selectedCustomer.minChargesPerMonth}
            maxSetValue={selectedCustomer.maxChargesPerMonth}
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
            maxValue={60}
            minSetValue={selectedCustomer.minkWhPerMonth}
            maxSetValue={selectedCustomer.maxkWhPerMonth}
            sliderUnit="kWh"
            rangeSliderChange={kwhHandler}
            step={1}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={2}>
          <label>Starting capacity</label>
        </Grid>
        <Grid item xs={6}>
          <RangeSlider
            label="Starting capacity"
            minValue={0}
            maxValue={selectedCustomer.carsModel.batteryCapacityUseable}
            minSetValue={selectedCustomer.minStartingCapacity}
            maxSetValue={selectedCustomer.maxStartingCapacity}
            sliderUnit="kWh"
            rangeSliderChange={startingCapacityHandler}
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
            setValue={selectedCustomer.subscriberRatio}
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
            maxValue={selectedCustomer.maxSameDayOrdersValue}
            setValue={selectedCustomer.setSameDayOrdersValue}
            sliderUnit="%"
            singleSliderChange={sameDayOrderHandler}
            step={1}
          />
        </Grid>
      </Grid>
      <p className="topPadding"></p>
      <Grid container direction="row" spacing={2}>
        {selectedCustomer.parking.map((parkingOne) => (
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
            The sum of the all parking intervals is not 100%.
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
