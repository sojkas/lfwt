import { DataThresholdingSharp } from "@mui/icons-material";

const settingsName = "nimbeeSimulatorV1.2";

class Settings {
  /* GENERAL */
  distributionMarkerId: number;
  depotMarkerId: number;

  /* RESOURCES */
  depots: DepotUnit[];

  /* Nimbees */
  nimbees: Nimbee[];

  /* Transporters */
  transporters: Transporter[];

  /* Shifts */
  shifts: Shift[];

  /* CUSTOMER TYPES */
  customers: Customer[];

  /* CUSTOMER DISTRIBUTION */
  distributionAreas: DistributionArea[];

  constructor() {
    this.distributionMarkerId = 2;
    this.depotMarkerId = 2;
    this.depots = [
      new DepotUnit("depot A", new MapMarker(50.06983, 14.43713, 0), 4),
    ];
    this.nimbees = [new Nimbee("v 1", 18, 4)];
    this.transporters = [new Transporter(2, 10, 5)];
    this.shifts = [
      new Shift("Morning shift", 10, 2, 5),
      new Shift("Evening shift", 20, 0, 8),
      new Shift("Night shift", 18, 1, 12),
    ];
    this.customers = [
      new Customer("Audi e-tron 50 / Sportback 50 (quattro)",
      new CarModel(285, 
        "e-tron 50 / Sportback 50 (quattro)",
        "Audi",
        64.7), 
        8, 17, 17, 26, 15, 25, 60, 20, 40, [
        new ParkingInterval("todo", 0, 20, 55),
        new ParkingInterval("todo", 21, 23, 45),
      ]),
      new Customer("BMW i3 60 Ah",
      new CarModel(10,
        "i3 60 Ah",
        "BMW",
        18),
       6, 13, 12, 30, 7, 10, 45, 27, 55, [
        new ParkingInterval("todo", 0, 11, 55),
        new ParkingInterval("todo", 12, 23, 45),
      ]),
    ];
    this.customers[0].parking[0].customerID = this.customers[0].id;
    this.customers[0].parking[1].customerID = this.customers[0].id;
    this.customers[1].parking[0].customerID = this.customers[1].id;
    this.customers[1].parking[1].customerID = this.customers[1].id;
    this.distributionAreas = [
      new DistributionArea("Test A", new MapMarker(50.06983, 14.43713, 1), [
        new DistributionItem(
          "1",
          this.customers[0].name,
          this.customers[0].id,
          100,
          true
        ),
      ]),
      new DistributionArea("Test B", new MapMarker(50.07983, 14.42713, 2), [
        new DistributionItem(
          "2",
          this.customers[1].name,
          this.customers[1].id,
          50,
          false
        ),
        new DistributionItem(
          "2",
          this.customers[0].name,
          this.customers[0].id,
          50,
          true
        ),
      ]),
    ];
  }
}
var parkingId = new Date().getTime();
class ParkingInterval {
  id: string;
  customerID: string;
  from: number;
  to: number;
  percent: number;
  constructor(
    customerId: string,
    fromValue: number,
    toValue: number,
    percentValue: number
  ) {
    this.id = "PARKING" + parkingId++;
    this.customerID = customerId;
    this.from = fromValue;
    this.to = toValue;
    this.percent = percentValue;
  }
}
var distributionId = new Date().getTime();
class DistributionItem {
  id: string;
  mapId: string; //MapMarker id
  distributor: string; //customerName
  customerId: string;
  distributionValue: number;
  isChecked: boolean;
  constructor(
    mapId: string,
    distributor: string,
    customerId: string,
    distributionValue: number,
    isChecked: boolean
  ) {
    this.id = "DISTRIBUTION" + distributionId++;
    this.mapId = mapId;
    this.distributor = distributor;
    this.customerId = customerId;
    this.distributionValue = distributionValue;
    this.isChecked = isChecked;
  }
}
class CarModel {
  pkCarsModels: number;
  model: string;
  manufacturer: string;
  batteryCapacityUseable: number;
  constructor(
    pkCarsModels: number,
    model: string,
    manufacturer: string,
    batteryCapacityUseable: number
  ){
    this.pkCarsModels = pkCarsModels;
    this.model = model;
    this.manufacturer = manufacturer;
    this.batteryCapacityUseable = batteryCapacityUseable;
  }
}

var customerId = new Date().getTime();
class Customer {
  id: string;
  name: string;
  carsModel: CarModel;
  minChargesPerMonth: number;
  maxChargesPerMonth: number;

  minkWhPerMonth: number;
  maxkWhPerMonth: number;
  minStartingCapacity: number;
  maxStartingCapacity: number;
  subscriberRatio: number;
  setSameDayOrdersValue: number;
  maxSameDayOrdersValue: number;
  //pole intervalu
  parking: ParkingInterval[];

  constructor(
    name: string,
    carsModel: CarModel,
    minChargesPerMonth: number,
    maxChargesPerMonth: number,
    minkWhPerMonth: number,
    maxkWhPerMonth: number,
    minStartingCapacity: number,
    maxStartingCapacity: number,
    subscriberRatio: number,
    setSameDayOrdersValue: number,
    maxSameDayOrdersValue: number,
    parking: ParkingInterval[]
  ) {
    this.id = "CUSTOMER" + customerId++;
    this.name = name;
    this.carsModel = carsModel;
    this.minChargesPerMonth = minChargesPerMonth;
    this.maxChargesPerMonth = maxChargesPerMonth;
    this.minkWhPerMonth = minkWhPerMonth;
    this.maxkWhPerMonth = maxkWhPerMonth;
    this.minStartingCapacity = minStartingCapacity;
    this.maxStartingCapacity = maxStartingCapacity;
    this.subscriberRatio = subscriberRatio;
    this.setSameDayOrdersValue = setSameDayOrdersValue;
    this.maxSameDayOrdersValue = maxSameDayOrdersValue;
    this.parking = parking;
  }
}

function getBestLatitude(settings: Settings): number {
  let i = 0;
  for (let item of settings.distributionAreas) {
    i = i + item.marker.latitude;
  }
  return i / settings.distributionAreas.length;
}
function getBestLongitude(settings: Settings): number {
  let i = 0;
  for (let item of settings.distributionAreas) {
    i = i + item.marker.longitude;
  }
  return i / settings.distributionAreas.length;
}

var depotUnitId = new Date().getTime();

class DepotUnit {
  id: string;
  marker: MapMarker;
  depotName: string;
  depotSlotNumber: number;

  constructor(depotName: string, marker: MapMarker, depotSlotNumber: number) {
    this.id = "DEPOTUNIT" + depotUnitId++;
    this.depotName = depotName;
    this.depotSlotNumber = depotSlotNumber;
    this.marker = marker;
  }
}
var nimbeeId = new Date().getTime();
class Nimbee {
  id: string;
  nimbeeName: string;
  nimbeeCapacity: number;
  nimbeePieces: number;

  constructor(name: string, capacity: number, pieces: number) {
    this.id = "NIMBEE" + nimbeeId++;
    this.nimbeeName = name;
    this.nimbeeCapacity = capacity;
    this.nimbeePieces = pieces;
  }
}
var transporterId = new Date().getTime();
class Transporter {
  id: string;
  transporterSlots: number;
  maxCapacity: number;
  transporterPieces: number;

  constructor(slots: number, maxCapacity: number, pieces: number) {
    this.id = "TRANSPORTER" + transporterId++;
    this.transporterSlots = slots;
    this.maxCapacity = maxCapacity;
    this.transporterPieces = pieces;
  }
}
var shiftId = new Date().getTime();
class Shift {
  id: string;
  shiftName: string;
  from: number;
  to: number;
  drivers: number;

  constructor(name: string, from: number, to: number, drivers: number) {
    this.id = "SHIFT" + shiftId++;
    this.shiftName = name;
    this.from = from;
    this.to = to;
    this.drivers = drivers;
  }
}
var mapmarkerId = new Date().getTime();
class MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  radius: number;

  constructor(lat: number, lng: number, radius: number) {
    this.id = "MAPMARKER" + mapmarkerId++;
    this.latitude = lat;
    this.longitude = lng;
    this.radius = radius;
  }
}
var distributionAreaId = new Date().getTime();
class DistributionArea {
  id: string;
  name: string;
  marker: MapMarker;
  distributions: DistributionItem[];
  constructor(
    name: string,
    marker: MapMarker,
    distributions: DistributionItem[]
  ) {
    this.id = "DISTRIBUTIONAREA" + distributionAreaId++;
    this.name = name;
    this.marker = marker;
    this.distributions = distributions;
  }
}

export default Settings;
export {
  Settings,
  ParkingInterval,
  DistributionItem,
  Customer,
  DepotUnit,
  Nimbee,
  Transporter,
  Shift,
  MapMarker,
  DistributionArea,
  CarModel,
  getBestLatitude,
  getBestLongitude,
  settingsName,
};
