import { Grid, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { Settings, CustomerDetail } from "../models/settings";
import CTDetail from "./CTDetail";
import CustomerComponent from "./CustomerComponent";

const CustomerTypes: React.FC<{
  settings: Settings;
  updatedSettings: (updatedSettingsValues: Settings) => void;
}> = (props) => {
  const [selectedCustomer, setSelectedCustomer] = useState<number> (0);
  const [selectedCustomerId, setSelectedCustomerID] = useState<string>(props.settings.customers[selectedCustomer].id);
  const [activeCustomerName, setActiveCustomerName] = useState<string>(props.settings.customers[0].name);

  const selectedCustomerDetail: CustomerDetail = props.settings.customerDetails[selectedCustomer];

  const updateDetail = (updatedDetail: CustomerDetail) => {
    props.settings.customerDetails[selectedCustomer] = updatedDetail;
    return props.updatedSettings(props.settings);
  };
  const updateCustomerNameHandler = (newName: string) => {
    props.settings.customers[selectedCustomer].name = newName;
  }


  return (
    <React.Fragment>
      <Grid className="grid" container direction="row" spacing={2}>
        <Grid className="box" item xs={4}>
          <ButtonGroup orientation="vertical" variant="text">
            {props.settings.customers.map((customer) => (
              <CustomerComponent key={customer.id} name={customer.name} />
            ))}
          </ButtonGroup>
        </Grid>
        <Grid className="box" item xs={8}>
          <CTDetail customerId={selectedCustomerId} customerDetail={selectedCustomerDetail} updatedCustomerDetail={updateDetail} updateCustomerName={updateCustomerNameHandler}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomerTypes;
