import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Order, { SimulationValues } from "../models/order";
import Settings from "../models/settings";
import generateOrders from "../utils/GenerateOrders";
import { findCustomerById, findDistributionAreaById } from "../utils/supportFunctions";
import {renderKeplerHtml} from "../utils/keplerUtils";

let isStopped = true;

const Simulation: React.FC<{
  settings: Settings;
  simulationValues: SimulationValues;
  updatedSimulationValues: (simulationValues: SimulationValues) => void;
}> = (props) => {
  const [orders, setOrders] = useState<Order[]>(props.simulationValues.orders);
  const [virtualClock, setVirtualClock] = useState<Date>(
      props.simulationValues.clockTime
  );

  const clockRunning = () => {
    return virtualClock.toLocaleString("cs-CZ");
  };

  const addMinutes = (date: Date, minutes: number) => {
    date = new Date(date);
    return new Date(date.getTime() + minutes * 60000);
  };

  const addRandomOrder = () => {
    if (isStopped) return;
    setTimeout(addRandomOrder, 500);
    setVirtualClock((prevClock) => {
      const newDate = addMinutes(prevClock, 15);
      /* console.log("add ranodm -> generateOrders " + virtualClock?.toString()) */
      setOrders((prevOrders) => {
        const orders = generateOrders(props.settings, 1 / 4, newDate);
        /* console.log("Generated orders: "+orders); */
        return prevOrders.concat(orders);
      });
      return newDate;
    });
  };

  const startHandler = () => {
    isStopped = false;
    setTimeout(addRandomOrder, 500);
  };

  const stopHandler = () => {
    isStopped = true;
    props.updatedSimulationValues({
      orders: orders,
      isStopped: isStopped,
      clockTime: virtualClock,
    });
  };

  const deleteHandler = () => {
    if (!isStopped) return;
    setOrders([]);
    setVirtualClock(new Date(Date.now()));
    isStopped = true;
  };

  const downloadHandler = () => {
    var dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(orders));
    var dlAnchorElem = document.createElement("a");
    document.body.append(dlAnchorElem);
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "nimbee-simulation.json");
    dlAnchorElem.click();
    dlAnchorElem.remove();
  };

  const keplerHandler = () => {
    var dataStr =
        "data:text/html;charset=utf-8," +
        encodeURIComponent(renderKeplerHtml(orders));
    var dlAnchorElem = document.createElement("a");
    document.body.append(dlAnchorElem);
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "nimbee-visualization.html");
    dlAnchorElem.click();
    dlAnchorElem.remove();
  };

  useEffect(() => {
    props.updatedSimulationValues({
      orders: orders,
      isStopped: isStopped,
      clockTime: virtualClock,
    });
    /* window.localStorage.setItem(
      "orders",
      JSON.stringify({
        orders: orders,
        isStopped: isStopped,
        clockTime: virtualClock,
      })
    ); */
  }, [orders, isStopped]);

  return (
      <div>
        <Stack direction="row" spacing={2} className="topPadding">
          <Button variant="outlined" onClick={startHandler}>
            Start
          </Button>{" "}
          <Button variant="outlined" onClick={stopHandler}>
            Stop
          </Button>
          <Button variant="outlined" onClick={deleteHandler}>
            Delete
          </Button>
          <p className="item-space">{clockRunning()}</p>
          <Button variant="outlined" onClick={downloadHandler}>
            Download simulation
          </Button>
          <Button variant="outlined" onClick={keplerHandler}>
            Download visualization
          </Button>
        </Stack>
        <div className="topPadding">
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
                        <TableCell align="center">
                          {findCustomerById(props.settings, order.customerId)?.name}
                        </TableCell>
                        <TableCell align="center">
                          {findDistributionAreaById(props.settings, order.distributionAreaId)?.name}
                        </TableCell>
                        <TableCell align="center">
                          {order.latitude.toFixed(4)} / {order.longitude.toFixed(4)}
                        </TableCell>
                        <TableCell align="center">{order.kw.toFixed(1)}</TableCell>
                        <TableCell align="center">
                          {order.orderDate.toLocaleString("cs-CZ")}
                        </TableCell>
                      </TableRow>
                  ))}
            </TableBody>
          </TableContainer>
        </div>
      </div>
  );
};

export default Simulation;
