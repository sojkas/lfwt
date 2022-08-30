import Settings, { Customer, ParkingInterval } from "../models/settings";
import Order from "../models/order";

function toSafeInt(value: string): number {
  const i = parseInt(value);
  if (isNaN(i)) return 0;
  return i;
}

const findCustomerById = (settings: Settings, id: string) => {
  for (let customer of settings.customers) {
    if (customer.id === id) return customer;
  }
};
const findCustomerIdByName = (customers: Customer[], name: string) => {
  for (let customer of customers) {
    if (customer.name === name) return customer.id;
  }
};

const findDistributionAreaById = (settings: Settings, id: string) => {
  for (let area of settings.distributionAreas) {
    if (area.id === id) return area;
  }
};

const findIntervalByHour = (parking: ParkingInterval[], hour: number) => {
  // hour prichazi zaokrouhlena dolu, 9:30 prichazi jako 9
  for (let interval of parking) {
    if (interval.from > interval.to) {
      // parkuje pres noc 22-06
      if (hour >= interval.from || hour < interval.to) return interval;
    } else {
      // parkuje pres den 13-16
      if (hour >= interval.from && hour < interval.to) return interval;
    }
  }
  return null;
};

const countIntervalLength = (interval: ParkingInterval) => {
  if (interval.from > interval.to) {
    // parkuje pres noc 22-06
    return 24 - interval.from + interval.to;
  } else {
    // parkuje pres den 13-16
    return interval.to - interval.from;
  }
};

const countCustomerParkingDuration = (customer: Customer) => {
  let res = 0;
  for (const p of customer.parking) {
    res = res + countIntervalLength(p);
  }
  return res;
};

function addToLatitude(latitude: number, dy: number) {
  return latitude + (dy / 6378) * (180 / Math.PI);
}

function addToLongitude(longitude: number, dx: number) {
  return (
    longitude +
    ((dx / 6378) * (180 / Math.PI)) / Math.cos((longitude * Math.PI) / 180)
  );
}

async function getSnapToRoadLatLng(latitude: number, longitude: number) {
  const path: string = latitude.toString() + "," + longitude.toString();
  const gmapUrl = `https://roads.googleapis.com/v1/snapToRoads?path=${path}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  try {
    const response = await fetch(gmapUrl);

    if (!response.ok) {
      //const errorStatus = response.status;
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    /* console.log("Data z googlu " + JSON.stringify(data)); */

    return data.snappedPoints[0].location;
  } catch (error) {

    /* console.log("error: "+ error); */
    return {latitude: latitude, longitude: longitude}
  }
}

async function snapToRoad (order: Order) {
  /* console.log("Puvodni lokace lat:"+order.lat+" lng: "+order.lng); */
  const snappedLocation = await getSnapToRoadLatLng(order.lat, order.lng);
  const snappedOrder = {...order, lat: snappedLocation.latitude, lng: snappedLocation.longitude}
  /* console.log("snappnute lat: "+snappedOrder.lat+" lng: "+ snappedOrder.lng); */
  return snappedOrder;

}

export {
  findCustomerById,
  findCustomerIdByName,
  findDistributionAreaById,
  findIntervalByHour,
  addToLatitude,
  addToLongitude,
  toSafeInt,
  countCustomerParkingDuration,
  countIntervalLength,
  getSnapToRoadLatLng,
  snapToRoad,
};
