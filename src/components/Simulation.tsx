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
import Settings, { MapMarker, ParkingInterval } from "../models/settings";

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
    return new MapMarker(latitude, longitude, radius);
  };

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
      console.log("add ranodm -> generateOrders " + virtualClock?.toString())
      setOrders((prevOrders) => {
        const orders = generateOrders(1 / 4, newDate);
        console.log("Generated orders: "+orders);
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
    console.log("Generating orders for "+hour+" hour");
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
        console.log("interval -> " + JSON.stringify(interval) + " [] " + JSON.stringify(customerDetail!.parking) + " hour " + hour);
        if (interval) {
          const minCharge = customerDetail!.chargesPerMonth[2];
          const maxCharge = customerDetail!.chargesPerMonth[3];
          var charge =  minCharge + (maxCharge - maxCharge) * Math.random();
          var orderNums = ((charge * customernum) / (24 * 30)) * (interval.percent / 100) * simRatio;
          console.log("orderNumber " + orderNums + " charge " + charge)
          var decimalPart = orderNums - Math.floor(orderNums);
          if (Math.random() <= decimalPart) {
            orderNums = Math.ceil(orderNums);
          } else {
            orderNums = Math.floor(orderNums);
          }
          console.log("calculated orderNums " + orderNums)
          for (var k = 0; k < orderNums; k++) {
            var angle = Math.random() * 360;
            var radius = Math.random() * oblast.marker.radius;
            orders[orders.length] = new Order(
              oblast.id,
              addToLatitude(oblast.marker.latitude, radius * Math.cos(angle)),
              addToLongitude(oblast.marker.longitude, radius * Math.sin(angle)),
              customerDetail!.kWhPerMonth[2] +
                (customerDetail!.kWhPerMonth[3] =
                  customerDetail!.kWhPerMonth[2]) *
                  Math.random(),
              customer!.id,
              virtualDate
            );
          }
        }
      }
    }
    console.log("orders -> "+ JSON.stringify(orders))
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
    <Grid container direction="column" spacing={2} className="topPadding">
      <Grid item xs={1}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={1}>
            <Button variant="outlined" onClick={startHandler}>
              Start
            </Button>{" "}
          </Grid>
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
          <Grid item xs={2}>
            <p className="item-space">{clockRunning()}</p>
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
      </Grid>
    </Grid>
  );
};

export default Simulation;
