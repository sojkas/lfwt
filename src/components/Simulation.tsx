import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button, Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Order, { SimulationValues } from "../models/order";
import Settings, { ParkingInterval } from "../models/settings";

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
        const orders = generateOrders(1 / 4, newDate);
        /* console.log("Generated orders: "+orders); */
        return prevOrders.concat(orders);
      });
      return newDate;
    });
  };

  const findCustomerById = (id: string) => {
    for (let customer of props.settings.customers) {
      if (customer.id === id) return customer;
    }
  }

  const findCustomerDetailById = (id: string) => {
    for (let detail of props.settings.customerDetails) {
      if (detail.id === id) return detail;
    }
  }

  const findDistributionAreaById = (id: string) => {
    for (let area of props.settings.distributionAreas) {
      if (area.id === id) return area;
    }
  }

  const findIntervalByHour = (parking: ParkingInterval[], hour:number) => {
    for (let interval of parking) {
      if (interval.from <= hour && interval.to >=hour ) return interval
    }
  }

  // simRatio = interval simulace 0.1 = 10 x za hodinu
  // hour = aktualni hodina
  function generateOrders(simRatio: number, virtualDate: Date) {
    const hour = virtualDate.getHours();
    /* console.log("Generating orders for "+hour+" hour"); */
    var orders = [];
    for (var i = 0; i < props.settings.distributionAreas.length; i++) {
      const oblast = props.settings.distributionAreas[i];
      for (var j = 0; j < oblast.distributions.length; j++) {
        /* console.log("iterating in distribution " + JSON.stringify(oblast.distributions[j])); */
        const customerId = oblast.distributions[j].customerId;
        const customer = findCustomerById(customerId);
        if (customer === null || customer === undefined) {
          /* console.log("cannot find customer with id " + customerId + " -> " + customer + " / " + JSON.stringify(oblast)); */
          continue;
        }
        const customerDetail = findCustomerDetailById(customerId);

        // const customernum = props.settings.customers.indexOf(customer!) + 1;
        const customernum = oblast.distributions[j].distributionValue;
        var interval = findIntervalByHour(customerDetail!.parking, hour);
        /* console.log("interval -> " + JSON.stringify(interval) + " [] " + JSON.stringify(customerDetail!.parking) + " hour " + hour); */
        if (interval) {
          const minCharge = customerDetail!.minChargesPerMonth;
          const maxCharge = customerDetail!.maxChargesPerMonth;
          var charge =  minCharge + (maxCharge - maxCharge) * Math.random();
          var orderNums = ((charge * customernum) / (24 * 30)) * (interval.percent / 100) * simRatio;
          /* console.log("orderNumber " + orderNums + " charge " + charge) */
          var decimalPart = orderNums - Math.floor(orderNums);
          if (Math.random() <= decimalPart) {
            orderNums = Math.ceil(orderNums);
          } else {
            orderNums = Math.floor(orderNums);
          }
          /* console.log("calculated orderNums " + orderNums) */
          for (var k = 0; k < orderNums; k++) {
            var angle = Math.random() * 360;
            var rndRadius = Math.random();
            if (oblast.distributions[j].isChecked) {
              // Polopaticky zpusob, jak to prisunout vic ke stredu oblasti
              rndRadius = rndRadius * rndRadius;
            }
            var radius = rndRadius * oblast.marker.radius;
            orders[orders.length] = new Order(
                oblast.id,
                addToLatitude(oblast.marker.latitude, radius * Math.cos(angle)),
                addToLongitude(oblast.marker.longitude, radius * Math.sin(angle)),
                customerDetail!.minkWhPerMonth +
                (customerDetail!.maxkWhPerMonth =
                    customerDetail!.minkWhPerMonth) *
                Math.random(),
                customer!.id,
                virtualDate
            );
          }
        }
      }
    }
    /* console.log("orders -> "+ JSON.stringify(orders)) */
    return orders;
  }

  function addToLatitude(latitude: number, dy: number) {
    return latitude + (dy / 6378) * (180 / Math.PI);
  }

  function addToLongitude(longitude: number, dx: number) {
    return (
        longitude +
        ((dx / 6378) * (180 / Math.PI)) / Math.cos((longitude * Math.PI) / 180)
    );
  }

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
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(orders));
    var dlAnchorElem = document.createElement("a");
    document.body.append(dlAnchorElem);
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "simulation.json");
    dlAnchorElem.click();
    dlAnchorElem.remove();
  }

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
        </Stack>
        <TableContainer component={Paper} className="topPadding">
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
                      <TableCell align="center">{findCustomerById(order.customerId)?.name}</TableCell>
                      <TableCell align="center">{findDistributionAreaById(order.distributionAreaId)?.name}</TableCell>
                      <TableCell align="center">
                        {order.latitude.toFixed(4)} / {order.longitude.toFixed(4)}
                      </TableCell>
                      <TableCell align="center">{order.kw.toFixed(1)}</TableCell>
                      <TableCell align="center">{order.orderDate.toLocaleString("cs-CZ")}</TableCell>
                    </TableRow>
                ))}
          </TableBody>
        </TableContainer>
      </div>
  );
};

export default Simulation;
