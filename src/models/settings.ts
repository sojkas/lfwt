class Settings {
  /* RESOURCES */
  /* Depots Default Variables */
  depotsCityValue: string;
  depotsDepotSetName: string;
  depotsSlotNumber: number;

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

  /* CUSTOMER DISTRIBUTION */
  symbolicName: string;
  // radius [radius: number, unit: string]
  radius: [number, string];
  // pole distributionUnits
  distributions : DistributionUnitClass[];

  constructor() {
    this.depotsCityValue = "Prague";
    this.depotsDepotSetName = "depot A";
    this.depotsSlotNumber = 4;
    this.nimbeesName = "v 1";
    this.nimbeesCapacity = 18;
    this.transporterCount = 2;
    this.transporterCapacity = 10;
    this.shiftName = ["Morning shift", "Evening shift", "Night shift"];
    this.shiftMorningParams = ["10 am", "2 pm", 5];
    this.shiftEveningParams = ["8 am", "12 am", 8];
    this.shiftNightParams = ["6 am", "10 pm", 12];
    this.segmentName = "Outskirts car adicts";
    this.chargesPerMonth = [1, 30, 8, 17, "charges"];
    this.kWhPerMonth = [5, 40, 17, 26, "kWh"];
    this.subscriberRatio = [0, 100, 60, "%"];
    this.sameDayOrders = [0, 40, 20, "%"];
    this.parking = [
      { from: "10 am", to: "2 pm", percent: 33 },
      { from: "8 am", to: "3 pm", percent: 45 },
      { from: "8 pm", to: "10 pm", percent: 12 },
      { from: "6 pm", to: "8 pm", percent: 10 },
    ];
    this.symbolicName = "Vnitrni mesto";
    this.radius = [5, "km"];
    this.distributions = [
        {distributor: "Manager", distributionValue: 100, isChecked: true},
        {distributor: "Distribution 3", distributionValue: 50, isChecked: false},
        {distributor: "Distribution 2", distributionValue: 65, isChecked: true},
        {distributor: "Manager", distributionValue: 15, isChecked: false}
    ]

  }
}

class ParkingInterval {
  from: string;
  to: string;
  percent: number;
  constructor(fromValue: string, toValue: string, percentValue: number) {
    this.from = fromValue;
    this.to = toValue;
    this.percent = percentValue;
  }
}

class DistributionUnitClass {
    distributor: string;
    distributionValue: number;
    isChecked: boolean;
    constructor(distributor: string, distributionValue: number, isChecked: boolean) {
        this.distributor = distributor;
        this.distributionValue = distributionValue;
        this.isChecked = isChecked;
    }
}

export default Settings;
