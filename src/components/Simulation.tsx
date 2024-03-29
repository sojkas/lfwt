import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SimulationValues } from "../models/order";
import Settings from "../models/settings";
import generateOrders from "../utils/GenerateOrders";
import {
  findCustomerById,
  findDistributionAreaById,
} from "../utils/supportFunctions";
import { renderKeplerHtml } from "../utils/keplerUtils";

let isStopped = true;

const Simulation: React.FC<{
  settings: Settings;
  simulationValues: SimulationValues;
  updatedSimulationValues: (simulationValues: SimulationValues) => void;
}> = (props) => {
  const [virtualClock, setVirtualClock] = useState<Date>(
    props.simulationValues.clockTime
  );

  const [snapToRoadsChecked, setSnapToRoadsChecked] = useState<boolean>(false);

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
    });
  };

  async function orderGenerator () {
    const newOrders = await generateOrders(props.settings, 1 / 4, virtualClock, snapToRoadsChecked);
      props.updatedSimulationValues({
        chargingRequests: [
          ...props.simulationValues.chargingRequests,
          ...newOrders,
        ],
        isStopped: isStopped,
        clockTime: virtualClock,
      });
  } 

  useEffect(() => {
    if (!isStopped) {
      orderGenerator();
    }
  }, [virtualClock]);

  const startHandler = () => {
    isStopped = false;
    setTimeout(addRandomOrder, 250);
  };

  const stopHandler = () => {
    isStopped = true;
    props.updatedSimulationValues({
      chargingRequests: props.simulationValues.chargingRequests,
      isStopped: isStopped,
      clockTime: virtualClock,
    });
  };

  const changeSnapToRoadsHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSnapToRoadsChecked(event.target.checked);
  };

  const deleteHandler = () => {
    isStopped = true;
    const d = new Date(Date.now());
    setVirtualClock(d);
    props.updatedSimulationValues({
      chargingRequests: [],
      isStopped: true,
      clockTime: d,
    });
  };

  const downloadHandler = () => {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify(props.simulationValues.chargingRequests)
      );
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
      encodeURIComponent(
        renderKeplerHtml(props.simulationValues.chargingRequests)
      );
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
        <p className="item-space">
          {clockRunning()} ({props.simulationValues.chargingRequests.length}{" "}
          orders)
        </p>
        <Button variant="outlined" onClick={downloadHandler}>
          Download simulation
        </Button>
        <Button variant="outlined" onClick={keplerHandler}>
          Download visualization
        </Button>
        <FormControlLabel
          label="Snap to roads"
          control={
            <Checkbox
              checked={snapToRoadsChecked}
              onChange={changeSnapToRoadsHandler}
              inputProps={{ "aria-label": "snapToRoads" }}
            />
          }
        />
      </Stack>
      <div className="topPadding">
        <TableContainer component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Customer Type</TableCell>
              <TableCell align="center">Place</TableCell>
              <TableCell align="center">Latitude / Longitude</TableCell>
              <TableCell align="center">Capacity kWh Value</TableCell>
              <TableCell align="center">Request kWh Value</TableCell>
              <TableCell align="center">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.simulationValues.chargingRequests.length > 0 &&
              props.simulationValues.chargingRequests
                .slice(0, 100)
                .map((chargingRequest) => (
                  <TableRow
                    key={chargingRequest.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{chargingRequest.id}</TableCell>
                    <TableCell align="center">
                      {
                        findCustomerById(
                          props.settings,
                          chargingRequest.customerId
                        )?.name
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        findDistributionAreaById(
                          props.settings,
                          chargingRequest.distributionAreaId
                        )?.name
                      }
                    </TableCell>
                    <TableCell align="center">
                      {chargingRequest.lat.toFixed(4)} /{" "}
                      {chargingRequest.lng.toFixed(4)}
                    </TableCell>
                    <TableCell align="center">
                      {chargingRequest.startingCapacity.toFixed(1)}
                    </TableCell>
                    <TableCell align="center">
                      {chargingRequest.energyToCharge.toFixed(1)}
                    </TableCell>
                    <TableCell align="center">
                      {chargingRequest.createDateTime.toUTCString()}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </TableContainer>
        {props.simulationValues.chargingRequests.length > 100 && (
          <p>Listing is limited to the first 100 orders.</p>
        )}
      </div>
    </>
  );
};

export default Simulation;
