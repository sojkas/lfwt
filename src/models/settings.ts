class Settings {
  /* GENERAL */
  customerId: number;
  distributionMarkerId: number;
  depotMarkerId: number;

  /* RESOURCES */
  depotCity: DepotCity;
  depotUnits: DepotUnit[];

  /* Nimbees */
  nimbees: Nimbee[];

  /* Transporters */
  transporters: Transporter[];

  /* Shifts */
  shifts: Shift[];

  /* CUSTOMER TYPES */
  customers: Customer[];
  customerDetails: CustomerDetail[];
  /* segmentName: string;
  //charges per month [minValueChart, maxValueChart, minValue, maxValue, sliderUnit]
  chargesPerMonth: [number, number, number, number, string];
  //kWh per charge [minValueChart, maxValueChart, minValue, maxValue, sliderUnit]
  kWhPerMonth: [number, number, number, number, string];
  //subscriber ratio [minValueChart, maxVauleChart, setValue, sliderUnit]
  subscriberRatio: [number, number, number, string];
  //same day orders [minValueChart, maxVauleChart, setValue, sliderUnit]
  sameDayOrders: [number, number, number, string];
  //pole intervalu
  parking: ParkingInterval[];*/

  /* CUSTOMER DISTRIBUTION */
  distributionAreas: DistributionArea[];

  constructor() {
    this.customerId = 3;
    this.distributionMarkerId = 2;
    this.depotMarkerId = 2;
    this.depotCity = new DepotCity("Prague");
    this.depotUnits = [new DepotUnit(this.depotCity.cityId, "depot A", 4)];
    this.nimbees = [new Nimbee("v 1", 18, 4)];
    this.transporters = [new Transporter(2, 10, 5)];
    this.shifts = [
      new Shift("Morning shift", "10 am", "2 pm", 5),
      new Shift("Evening shift", "8 am", "12 am", 8),
      new Shift("Night shift", "6 am", "10 pm", 12),
    ];
    this.customers = [
      new Customer(1, "Outskirts car adicts"),
      new Customer(2, "Rohlik"),
    ];
    this.customerDetails = [
      new CustomerDetail(
        this.customers[0].id,
        "Outskirts car adicts",
        [1, 30, 8, 17, "charges"],
        [5, 40, 17, 26, "kWh"],
        [0, 100, 60, "%"],
        [0, 40, 20, "%"],
        [
          new ParkingInterval(this.customers[0].id, "10 am", "2 pm", 55),
          new ParkingInterval(this.customers[0].id, "8 am", "3 pm", 45),
        ]
      ),
      new CustomerDetail(
        this.customers[1].id,
        "Rohlik",
        [1, 30, 6, 13, "charges"],
        [5, 40, 12, 30, "kWh"],
        [0, 100, 45, "%"],
        [0, 55, 27, "%"],
        [
          new ParkingInterval(this.customers[1].id, "8 am", "2 pm", 55),
          new ParkingInterval(this.customers[1].id, "12 am", "4 pm", 45),
        ]
      ),
    ];
    this.distributionAreas = [
      new DistributionArea(
        "Test A",
        1,
        new MapMarker(50.06983, 14.43713, 1),
        [new DistributionItem("1", this.customers[0].name, 50, true)]
      ),
      new DistributionArea(
        "Test B",
        2,
        new MapMarker(50.07983, 14.42713, 2),
        [new DistributionItem("2", this.customers[1].name, 25, false),
        new DistributionItem("2", this.customers[0].name, 50, true)]
      ),
    ];
  }
}

class ParkingInterval {
  id: string;
  customerID: string;
  from: string;
  to: string;
  percent: number;
  constructor(
    customerId: string,
    fromValue: string,
    toValue: string,
    percentValue: number
  ) {
    this.id = "PI" + Date.now().toString() + Math.random().toString();
    this.customerID = customerId;
    this.from = fromValue;
    this.to = toValue;
    this.percent = percentValue;
  }
}

class DistributionItem {
  id: string;
  mapId: string; //MapMarker id
  distributor: string;
  distributionValue: number;
  isChecked: boolean;
  constructor(
    mapId: string,
    distributor: string,
    distributionValue: number,
    isChecked: boolean
  ) {
    this.id = "DI" + Date.now().toString() + Math.random().toString();
    this.mapId = mapId;
    this.distributor = distributor;
    this.distributionValue = distributionValue;
    this.isChecked = isChecked;
  }
}

class Customer {
  id: string;
  name: string;
  constructor(id: number, name: string) {
    this.id = id.toString();
    this.name = name;
  }
}

class CustomerDetail {
  id: string;
  segmentName: string;
  //charges per month [minValueChart, maxValueChart, minValue, maxValue, sliderUnit]
  chargesPerMonth: [number, number, number, number, string];
  //kWh per charge [minValueChart, maxValueChart, minValue, maxValue, sliderUnit]
  kWhPerMonth: [number, number, number, number, string];
  //subscriber ratio [minValueChart, maxVauleChart, setValue, sliderUnit]
  subscriberRatio: [number, number, number, string];
  //same day orders [minValueChart, maxVauleChart, setValue, sliderUnit]
  sameDayOrders: [number, number, number, string];
  //pole intervalu
  parking: ParkingInterval[];

  constructor(
    id: string,
    segmentName: string,
    chargesPerMonth: [number, number, number, number, string],
    kWhPerMonth: [number, number, number, number, string],
    subscriberRatio: [number, number, number, string],
    sameDayOrders: [number, number, number, string],
    parking: ParkingInterval[]
  ) {
    this.id = id;
    this.segmentName = segmentName;
    this.chargesPerMonth = chargesPerMonth;
    this.kWhPerMonth = kWhPerMonth;
    this.subscriberRatio = subscriberRatio;
    this.sameDayOrders = sameDayOrders;
    this.parking = parking;
  }
}

class DepotCity {
  cityId: string;
  cityName: string;

  constructor(cityName: string) {
    this.cityId = "DC" + Date.now().toString();
    this.cityName = cityName;
  }
}

class DepotUnit {
  id: string;
  cityId: string;
  /* Depots Default Variables */

  depotName: string;
  depotSlotNumber: number;

  constructor(cityId: string, depotName: string, depotSlotNumber: number) {
    this.id = "DU" + Date.now().toString();
    this.cityId = cityId;
    this.depotName = depotName;
    this.depotSlotNumber = depotSlotNumber;
  }
}

class Nimbee {
  id: string;
  nimbeeName: string;
  nimbeeCapacity: number;
  nimbeePieces: number;

  constructor(name: string, capacity: number, pieces: number) {
    this.id = "N" + Date.now().toString();
    this.nimbeeName = name;
    this.nimbeeCapacity = capacity;
    this.nimbeePieces = pieces;
  }
}
class Transporter {
  id: string;
  transporterSlots: number;
  transporterCapacity: number;
  transporterPieces: number;

  constructor(slots: number, capacity: number, pieces: number) {
    this.id = "T" + Date.now().toString();
    this.transporterSlots = slots;
    this.transporterCapacity = capacity;
    this.transporterPieces = pieces;
  }
}

class Shift {
  id: string;
  shiftName: string;
  from: string;
  to: string;
  drivers: number;

  constructor(name: string, from: string, to: string, drivers: number) {
    this.id = "S" + Date.now().toString() + Math.random().toString();
    this.shiftName = name;
    this.from = from;
    this.to = to;
    this.drivers = drivers;
  }
}
class MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  radius: number;

  constructor(lat: number, lng: number, radius: number) {
    this.id = "MM" + Date.now().toString + Math.random() + toString();
    this.latitude = lat;
    this.longitude = lng;
    this.radius = radius;
  }
}

class DistributionArea {
  id: string;
  name: string;
  radius: number;
  marker: MapMarker;
  distributions: DistributionItem[];
  constructor(
    name: string,
    radius: number,
    marker: MapMarker,
    distributions: DistributionItem[]
  ) {
    this.id = "DA" + Date.now().toString() + Math.random() + toString();
    this.name = name;
    this.radius = radius;
    this.marker = marker;
    this.distributions = distributions;
  }
}

export default Settings;
export {
  Settings,
  ParkingInterval,
  DistributionItem,
  CustomerDetail,
  Customer,
  DepotCity,
  DepotUnit,
  Nimbee,
  Transporter,
  Shift,
  MapMarker,
  DistributionArea,
};
