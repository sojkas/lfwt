class Order {
  id: number
  distributionAreaId: string
  latitude: number
  longitude: number
  kw: number
  customerId: string
  orderDate: Date
  
  constructor(
    id: number,
    distributionAreaId: string,
    latitude: number,
    longitude: number,
    kw: number,
    customerId: string,
    orderDate: Date 
  ) {
    this.id=id
    this.distributionAreaId=distributionAreaId
    this.latitude=latitude
    this.longitude=longitude
    this.kw=kw
    this.customerId=customerId
    this.orderDate = orderDate
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
