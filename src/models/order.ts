var orderId = new Date().getTime()

class Order {
  id: string
  distributionAreaId: string
  lat: number
  lng: number
  energyToCharge: number
  customerId: string
  createDateTime: Date
  
  constructor(
    distributionAreaId: string,
    lat: number,
    lng: number,
    energyToCharge: number,
    customerId: string,
    createDateTime: Date 
  ) {
    this.id="ORDER"+(orderId++)
    this.distributionAreaId=distributionAreaId
    this.lat=lat
    this.lng=lng
    this.energyToCharge=energyToCharge
    this.customerId=customerId
    this.createDateTime = createDateTime
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
