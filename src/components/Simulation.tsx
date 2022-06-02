import {
  Grid,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Order, { SimulationValues } from "../models/order";
import Settings, { MapMarker } from "../models/settings";

var isStopped = true;

const Simulation: React.FC<{
  settings: Settings;
  simulationValues: SimulationValues;
  updatedSimulationValues: (simulationValues: SimulationValues) => void;
}> = (props) => {
  const [orders, setOrders] = useState<Order[]>(props.simulationValues.orders);
  const randomCustomer = () => {
    const randomNumber = Math.floor(
      Math.random() * props.settings.customers.length
    );
    return props.settings.customers[randomNumber].name;
  };

  const randomPosition = () => {
    const latitude = Math.floor(Math.random() * (50 - 40 + 1)) + 40;
    const longitude = Math.floor(Math.random() * (17 - 14 + 1)) + 14;
    const radius = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    return new MapMarker("order", latitude, longitude, radius);
  };

  const addRandomOrder = () => {
    if (isStopped) return;
    setTimeout(addRandomOrder, 1500);
    const customer: string = randomCustomer();
    const position: MapMarker = randomPosition();
    setOrders((prevOrders) =>
      prevOrders.concat(
        new Order(
          customer,
          position,
          "random position",
          new Date(Date.now()),
          Math.floor(Math.random() * (20 - 10 + 1)) + 10
        )
      )
    );
  };

  const startHandler = () => {
    if(!isStopped) return;
    isStopped= false;
    setTimeout(addRandomOrder, 1500);
  };

  const stopHandler = () => {
    if (isStopped) return;
    isStopped = true;
    props.updatedSimulationValues({orders: orders, isStopped: isStopped});
  };

  const deleteHandler = () => {
    if (!isStopped) return;
    setOrders([]);
    isStopped = true;
  };

  useEffect(()=>{
    props.updatedSimulationValues({orders: orders, isStopped: isStopped});
  }, [orders, isStopped]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={1}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={1}>
            <Button variant="outlined" onClick={startHandler}>
              Start
            </Button>          </Grid>
          <Grid item xs={1}>
            <Button variant="outlined" onClick={stopHandler}>
              Stop
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button variant="outlined" onClick={deleteHandler}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <TableContainer component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Customer Type</TableCell>
              <TableCell align="center">Place</TableCell>
              <TableCell align="center">Latitude / Longitude</TableCell>
              <TableCell align="center">kWh Value</TableCell>
              <TableCell align="center">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 &&
              orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{order.id}</TableCell>
                  <TableCell align="center">{order.customerType}</TableCell>
                  <TableCell align="center">{order.positionName}</TableCell>
                  <TableCell align="center">
                    {order.position.latitude} / {order.position.longitude}
                  </TableCell>
                  <TableCell align="center">{order.kWhValue}</TableCell>
                  <TableCell align="center">
                    {order.time.toISOString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Simulation;
