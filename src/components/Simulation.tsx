import {Button, Paper, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import React, {useEffect, useState} from "react";
import {SimulationValues} from "../models/order";
import Settings from "../models/settings";
import generateOrders from "../utils/GenerateOrders";
import {findCustomerById, findDistributionAreaById} from "../utils/supportFunctions";
import {renderKeplerHtml} from "../utils/keplerUtils";

let isStopped = true;

const Simulation: React.FC<{
  settings: Settings;
  simulationValues: SimulationValues;
  updatedSimulationValues: (simulationValues: SimulationValues) => void;
}> = (props) => {

  const [virtualClock, setVirtualClock] = useState<Date>(
      props.simulationValues.clockTime
  );

  const clockRunning = () => {
    return virtualClock.toUTCString();
  };

  const addMinutes = (date: Date, minutes: number) => {
    return new Date(date.getTime() + minutes * 60000);
  };

  const addRandomOrder = () => {
    if (isStopped) return;
    setTimeout(addRandomOrder, 250);
    setVirtualClock((prevClock) => {
      const newDate = addMinutes(prevClock, 15);
      return newDate;
    })
  };

  useEffect(( )=> {
    if (!isStopped) {
      const newOrders = generateOrders(props.settings, 1 / 4, virtualClock);
      props.updatedSimulationValues({
        orders: [...props.simulationValues.orders, ...newOrders],
        isStopped: isStopped,
        clockTime: virtualClock,
      });
    }
  }, [virtualClock])

  const startHandler = () => {
    isStopped = false;
    setTimeout(addRandomOrder, 250);
  };

  const stopHandler = () => {
    isStopped = true;
    props.updatedSimulationValues({
      orders: props.simulationValues.orders,
      isStopped: isStopped,
      clockTime: virtualClock,
    });
  };

  const deleteHandler = () => {
    isStopped = true;
    const d = new Date(Date.now());
    setVirtualClock(d);
    props.updatedSimulationValues({
      orders: [],
      isStopped: true,
      clockTime: d
    });
  };

  const downloadHandler = () => {
    var dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(props.simulationValues.orders));
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
        encodeURIComponent(renderKeplerHtml(props.simulationValues.orders));
    var dlAnchorElem = document.createElement("a");
    document.body.append(dlAnchorElem);
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "nimbee-visualization.html");
    dlAnchorElem.click();
    dlAnchorElem.remove();
  };

  return (
      <>
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
          <p className="item-space">{clockRunning()} ({props.simulationValues.orders.length} orders)</p>
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
              {props.simulationValues.orders.length > 0 &&
                  props.simulationValues.orders.slice(0,100).map((order) => (
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
                          {order.lat.toFixed(4)} / {order.lng.toFixed(4)}
                        </TableCell>
                        <TableCell align="center">{order.energyToCharge.toFixed(1)}</TableCell>
                        <TableCell align="center">
                          {order.createDateTime.toUTCString()}
                        </TableCell>
                      </TableRow>
                  ))}
            </TableBody>
          </TableContainer>
          {props.simulationValues.orders.length > 100 &&
              <p>Listing is limited to the first 100 orders.</p>
          }
        </div>
      </>
  );
};

export default Simulation;
