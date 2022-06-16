import { Grid, ButtonGroup, Fab, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";
import {
  Settings,
  Customer,
  ParkingInterval,
  DistributionArea,
} from "../models/settings";
import CTDetail from "./CTDetail";
import CustomerComponent from "./CustomerComponent";
import AddIcon from "@mui/icons-material/Add";
import { findCustomerById } from "../utils/supportFunctions";

let savedCustomerName: string = "";

const CustomerTypes: React.FC<{
  settings: Settings;
  updatedSettings: (updatedSettingsValues: Settings) => void;
}> = (props) => {
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer>();

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSaved(false);
  };

  const activeCustomerIdHandler = (customerDetailId: string) => {
    setSelectedCustomer(() => {
      for (let customer of props.settings.customers) {
        if (customer.id === customerDetailId) {
          return customer;
        }
      }
      return undefined;
    });
  };

  const createParkingIntervalForCustomer = (cdID: string) => {
    const newParkingIntervals: ParkingInterval[] = [new ParkingInterval(cdID, 8, 12, 100)];
    return newParkingIntervals;
  };

  const addCustomerHandler = () => {
    let newCustomer: Customer = new Customer(
      "New Customer",
      10,
      20,
      15,
      25,
      50,
      25,
      50,
      []
    );
    newCustomer = { ...newCustomer, parking: createParkingIntervalForCustomer(newCustomer.id) }
    const newCustomerList: Customer[] = [ ...props.settings.customers, newCustomer ];
    props.updatedSettings({ ...props.settings, customers: newCustomerList });    
  };

  const removeCustomerHandler = (id: string) => {
    const custName = findCustomerById(props.settings, id)?.name;
    if (
      window.confirm(
        'Do you really want to remove customer "' + custName + '"?'
      )
    ) {
      const newCustomerList: Customer[] = props.settings.customers!.filter(
        (customer) => customer.id !== id
      );
      const newDistributionAreas: DistributionArea[] =
        props.settings.distributionAreas;
      for (let i = 0; i < props.settings.distributionAreas.length; i++) {
        const newDistributions = props.settings.distributionAreas[
          i
        ].distributions.filter(
          (distribution) => id !== distribution.customerId
        );
        newDistributionAreas[i].distributions = newDistributions;
      }
      setSelectedCustomer(undefined);
      props.updatedSettings({ ...props.settings, distributionAreas: newDistributionAreas, customers: newCustomerList});
    }
  };

  const updateDetail = (updatedDetail: Customer) => {
    for (let customer of props.settings.customers) {
      if (customer.id === updatedDetail.id) {
        setSelectedCustomer(undefined);
        const newCustomersList: Customer[] = props.settings.customers;
        newCustomersList.splice(props.settings.customers.indexOf(customer), 1, updatedDetail);        
        props.updatedSettings({ ...props.settings, customers: newCustomersList });
      }
    }
    setIsSaved(true);
  };
  

  return (
    <React.Fragment>
      <Grid className="grid" container direction="row" spacing={2}>
        <Grid className="box" item xs={4}>
          <Grid
            container
            direction="column"
            spacing={2}
            className="topPaddingBig"
          >
            <Grid item xs={5}>
              <ButtonGroup
                orientation="vertical"
                variant="text"
                fullWidth={true}
              >
                {props.settings.customers &&
                  props.settings.customers.map((customer) => (
                    <CustomerComponent
                      key={customer.id}
                      customerId={customer.id}
                      name={customer.name}
                      removeCustomer={removeCustomerHandler}
                      activeCustomerId={activeCustomerIdHandler}
                    />
                  ))}
              </ButtonGroup>
            </Grid>
            <Grid item xs={1}>
              <Fab aria-label="Add" size="small" onClick={addCustomerHandler}>
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="box" item xs={8}>
          {!selectedCustomer && (
            <Snackbar
              open={isSaved}
              autoHideDuration={3000}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              onClose={handleClose}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                {savedCustomerName} was saved.
              </Alert>
            </Snackbar>
          )}
          {selectedCustomer && (
            <CTDetail
              custormer={selectedCustomer}
              updatedCustomer={updateDetail}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomerTypes;
