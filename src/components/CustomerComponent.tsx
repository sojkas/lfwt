import React from "react";
import {Button} from "@mui/material";

const CustomerComponent: React.FC<{ name: string }> = (props) => {

    return (
        <Button>{props.name}</Button>
    );

}

export default CustomerComponent;