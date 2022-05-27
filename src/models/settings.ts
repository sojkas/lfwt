class Settings {
  customerId: number;
  /* RESOURCES */
  depotCity: DepotCity;
  depotUnits: DepotUnit[];

  /* Nimbees */
  nimbeesName: string;
  nimbeesCapacity: number;

  /* Transporters */
  transporterCount: number;
  transporterCapacity: number;

  /* Shifts */
  shiftName: string[];
  //shift params [from, to, drivers]
  shiftMorningParams: [string, string, number];
  shiftEveningParams: [string, string, number];
  shiftNightParams: [string, string, number];

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
  symbolicName: string;
  // radius [radius: number, unit: string]
  radius: [number, string];
  // pole distributionUnits
  distributions: DistributionUnitClass[];

  constructor() {
    this.customerId = 2;
    this.depotCity = new DepotCity("Prague");
    this.depotUnits = [new DepotUnit(this.depotCity.cityId, "depot A", 4)];
    this.nimbeesName = "v 1";
    this.nimbeesCapacity = 18;
    this.transporterCount = 2;
    this.transporterCapacity = 10;
    this.shiftName = ["Morning shift", "Evening shift", "Night shift"];
    this.shiftMorningParams = ["10 am", "2 pm", 5];
    this.shiftEveningParams = ["8 am", "12 am", 8];
    this.shiftNightParams = ["6 am", "10 pm", 12];
    this.customers = [new Customer(1, "Tomas Marny")];
    this.customerDetails = [
      new CustomerDetail(
        this.customers[0].id,
        "Outskirts car adicts",
        [1, 30, 8, 17, "charges"],
        [5, 40, 17, 26, "kWh"],
        [0, 100, 60, "%"],
        [0, 40, 20, "%"],
        [
          new ParkingInterval(this.customers[0].id, "10 am", "2 pm", 33),
          new ParkingInterval(this.customers[0].id, "8 am", "3 pm", 45),
        ]
      ),
    ];
    this.symbolicName = "Vnitrni mesto";
    this.radius = [5, "km"];
    this.distributions = [
      new DistributionUnitClass("Manager", 100, true),
      new DistributionUnitClass("Distribution 3", 50, false),
      new DistributionUnitClass("Distribution 2", 35, true),
      new DistributionUnitClass("Manager", 75, false),
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
    this.id = Math.random().toString();
    this.customerID = customerId;
    this.from = fromValue;
    this.to = toValue;
    this.percent = percentValue;
  }
}

class DistributionUnitClass {
  id: string;
  distributor: string;
  distributionValue: number;
  isChecked: boolean;
  constructor(
    distributor: string,
    distributionValue: number,
    isChecked: boolean
  ) {
    this.id = Math.random().toString();
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
    this.cityId = Date.now().toString();
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
    this.id = Date.now().toString();
    this.cityId = cityId;
    this.depotName = depotName;
    this.depotSlotNumber = depotSlotNumber;
  }
}
export default Settings;
export {
  Settings,
  ParkingInterval,
  DistributionUnitClass,
  CustomerDetail,
  Customer,
  DepotCity,
  DepotUnit,
};
