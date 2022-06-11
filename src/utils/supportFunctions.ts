import Settings, {Customer, CustomerDetail, ParkingInterval} from "../models/settings";


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
const findCustomerDetailById = (settings: Settings, id: string) => {
  for (let detail of settings.customerDetails) {
    if (detail.customerId === id) return detail;
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
    return 24-interval.from + interval.to;
  } else {
    // parkuje pres den 13-16
    return interval.to - interval.from;
  }
};

const countCustomerParkingDuration = (customer: CustomerDetail) => {
  let res = 0;
  for (const p of customer.parking) {
    res = res + countIntervalLength(p);
  }
  return res;
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

export {
  findCustomerById,
  findCustomerIdByName,
  findCustomerDetailById,
  findDistributionAreaById,
  findIntervalByHour,
  addToLatitude,
  addToLongitude,
  toSafeInt,
  countCustomerParkingDuration
};
