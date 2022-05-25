import React from "react";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import { RemoveCircleOutline } from "@mui/icons-material";

const CustomerComponent: React.FC<{
  customerId: string;
  name: string;
  removeCustomer: (customerId: string) => void;
  activeCustomerId: (CustomerId: string) => void;
}> = (props) => {
  const removeCustomerHandler = () => {
    return props.removeCustomer(props.customerId);
  };
  const customerButtonHandler = () => {
    return props.activeCustomerId(props.customerId);
  };
  return (
    <ButtonGroup variant="outlined">
      <Button onClick={customerButtonHandler}>{props.name}</Button>
      <IconButton onClick={removeCustomerHandler}>
        <RemoveCircleOutline />
      </IconButton>
    </ButtonGroup>
  );
};

export default CustomerComponent;
