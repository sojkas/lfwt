class Settings {
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
  shiftMorningParams: [string, string, number];
  shiftEveningParams: [string, string, number]
  shiftNightParams: [string, string, number]

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
  }
}

export default Settings;
