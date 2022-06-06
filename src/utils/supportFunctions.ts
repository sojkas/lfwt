import Settings, { Customer, ParkingInterval } from "../models/settings";

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
const findCustomerDetailById = (settings: Settings, id: string) => {
  for (let detail of settings.customerDetails) {
    if (detail.id === id) return detail;
  }
};

const findDistributionAreaById = (settings: Settings, id: string) => {
  for (let area of settings.distributionAreas) {
    if (area.id === id) return area;
  }
};

const findIntervalByHour = (parking: ParkingInterval[], hour: number) => {
  for (let interval of parking) {
    if (interval.from <= hour && interval.to >= hour) return interval;
  }
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

export {
  findCustomerById,
  findCustomerIdByName,
  findCustomerDetailById,
  findDistributionAreaById,
  findIntervalByHour,
  addToLatitude,
  addToLongitude,
};
