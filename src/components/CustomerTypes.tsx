import { Grid, ButtonGroup, Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Settings,
  CustomerDetail,
  Customer,
  ParkingInterval,
} from "../models/settings";
import CTDetail from "./CTDetail";
import CustomerComponent from "./CustomerComponent";
import AddIcon from "@mui/icons-material/Add";

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
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(
    props.settings.customers[0].id
  );

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
      [1, 30, 10, 20, "charges"],
      [5, 40, 15, 25, "kWh"],
      [0, 100, 50, "%"],
      [0, 50, 25, "%"],
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
    if (customers.length <= 1) return;
    const newCustomerList: Customer[] = customers.filter(
      (customer) => customer.id !== id
    );
    setCustomers(newCustomerList);
    const newCustomerDetailList: CustomerDetail[] = customerDetails.filter(
      (detail) => detail.id !== id
    );
    setCustomerDetails(newCustomerDetailList);
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
      if (detail.id === id)
        return props.settings.customerDetails.splice(
          customerDetails.indexOf(detail),
          1,
          updatedDetail
        );
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
          <Grid container direction="column" spacing={2}>
            <Grid item xs={1}>
              <Fab aria-label="Add" size="small" onClick={addCustomerHandler}>
                <AddIcon />
              </Fab>
            </Grid>
            <Grid item xs={5}>
              <ButtonGroup orientation="vertical" variant="contained">
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
          </Grid>
        </Grid>
        <Grid className="box" item xs={8}>
          {customers.length > 0 && (
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
