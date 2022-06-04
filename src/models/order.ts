import { MapMarker } from "./settings";

class Order {
  id: string;
  customerType: string;
  position: MapMarker;
  positionName: string;
  time: Date;
  kWhValue: number;

  constructor(
    customerType: string,
    position: MapMarker,
    positionName: string,
    time: Date,
    kWhValue: number
  ) {
    this.id = "O" + Date.now().toString();
    this.customerType = customerType;
    this.position = position;
    this.positionName = positionName;
    this.time = time;
    this.kWhValue = kWhValue;
  }
}


class SimulationValues {
  orders: Order[];
  isStopped: boolean;
  clockTime: Date;

  constructor (orders: Order[], isStopped: boolean) {
    this.orders = orders;
    this.isStopped = isStopped;
    this.clockTime = new Date(Date.now());
  }
 }

export default Order;
export {
  Order,
  SimulationValues,
}
