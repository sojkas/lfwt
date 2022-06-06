import { Grid, ButtonGroup, Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Settings,
  CustomerDetail,
  Customer,
  ParkingInterval,
  DistributionArea,
} from "../models/settings";
import CTDetail from "./CTDetail";
import CustomerComponent from "./CustomerComponent";
import AddIcon from "@mui/icons-material/Add";
import { findCustomerById } from "../utils/supportFunctions";

const CustomerTypes: React.FC<{
  settings: Settings;
  updatedSettings: (updatedSettingsValues: Settings) => void;
}> = (props) => {
  const [customerId, setCustomerId] = useState<number>(
    props.settings.customerId
  );
  const [customers, setCustomers] = useState<Customer[]>(
    props.settings.customers
  );
  const [newNameCustomer, setNewNameCustomer] = useState<string>("");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>();

  const [selectedCustomerDetail, setSelectedCustomerDetail] =
    useState<CustomerDetail>(props.settings.customerDetails[0]);

  const [customerDetails, setCustomerDetails] = useState<CustomerDetail[]>(
    props.settings.customerDetails
  );

  const activeCustomerIdHandler = (customerDetailId: string) => {
    setSelectedCustomerId(customerDetailId);
  };

  const createCustomerDetail = (cdID: number) => {
    const newCustomerDetail = new CustomerDetail(
      cdID.toString(),
      "New Customer",
      10,
      20,
      15,
      25,
      50,
      25,
      50,
      [new ParkingInterval(cdID.toString(), 8, 12, 100)]
    );
    setCustomerDetails((prevDetails) => prevDetails.concat(newCustomerDetail));
  };

  const addCustomerHandler = () => {
    const newCustomer: Customer = new Customer(customerId, "New Customer");
    setCustomers((prevCustomers) => prevCustomers.concat(newCustomer));
    createCustomerDetail(customerId);
    setCustomerId(customerId + 1);
  };

  const removeCustomerHandler = (id: string) => {
    const custName = findCustomerById(props.settings, id)?.name;
    if (window.confirm('Do you really want to remove customer "' + custName + '"?')) {
      const newCustomerList: Customer[] = customers.filter(
        (customer) => customer.id !== id
      );
      setCustomers(newCustomerList);
      const newCustomerDetailList: CustomerDetail[] = customerDetails.filter(
        (detail) => detail.id !== id
      );
      setCustomerDetails(newCustomerDetailList);
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

      props.settings.distributionAreas = newDistributionAreas;
      props.updatedSettings(props.settings);
    }
  };

  useEffect(() => {
    props.settings.customers = customers;
    props.settings.customerId = customerId;
    props.settings.customerDetails = customerDetails;
    props.updatedSettings(props.settings);
    window.localStorage.setItem("data", JSON.stringify(props.settings));
  }, [customers, newNameCustomer, customerDetails, customerId]);

  useEffect(() => {
    for (let detail of customerDetails) {
      if (detail.id === selectedCustomerId)
        return setSelectedCustomerDetail(
          customerDetails[customerDetails.indexOf(detail)]
        );
    }
  }, [selectedCustomerId]);

  const updateDetail = (id: string, updatedDetail: CustomerDetail) => {
    for (let detail of customerDetails) {
      if (detail.id === id) {
        setSelectedCustomerId(undefined);
        return props.settings.customerDetails.splice(
          customerDetails.indexOf(detail),
          1,
          updatedDetail
        );
      }
    }
  };
  const updateCustomerNameHandler = (id: string, newName: string) => {
    setNewNameCustomer(newName);
    for (let customer of customers) {
      if (customer.id.toString() === id)
        return (props.settings.customers[customers.indexOf(customer)].name =
          newName);
    }
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
                {customers.map((customer) => (
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
          {selectedCustomerId && (
            <CTDetail
              customerId={selectedCustomerId}
              customerDetail={selectedCustomerDetail}
              updatedCustomerDetail={updateDetail}
              updateCustomerName={updateCustomerNameHandler}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomerTypes;
