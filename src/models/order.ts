var orderId = new Date().getTime()

class ChargingRequest {
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
    this.id="CHR"+(orderId++)
    this.distributionAreaId=distributionAreaId
    this.lat=lat
    this.lng=lng
    this.energyToCharge=energyToCharge
    this.customerId=customerId
    this.createDateTime = createDateTime
  }
}


class SimulationValues {
  chargingRequests: ChargingRequest[];
  isStopped: boolean;
  clockTime: Date;

  constructor (chargingRequests: ChargingRequest[], isStopped: boolean) {
    this.chargingRequests = chargingRequests;
    this.isStopped = isStopped;
    this.clockTime = new Date(Date.now());
  }
 }

export default ChargingRequest;
export {
  ChargingRequest,
  SimulationValues,
}
