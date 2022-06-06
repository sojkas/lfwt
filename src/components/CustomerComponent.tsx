import React from "react";
import { IconButton } from "@mui/material";
import { RemoveCircleOutline } from "@mui/icons-material";
import Grid from "@mui/material/Grid";

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
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <a onClick={customerButtonHandler} className="list-customer">{props.name}</a>
            </Grid>
            <Grid item xs={2}>
                <IconButton onClick={removeCustomerHandler}>
                    <RemoveCircleOutline />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default CustomerComponent;
