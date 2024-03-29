import Settings from "../models/settings";
import Order from "../models/order";
import {
  addToLatitude,
  addToLongitude,
  countIntervalLength,
  findCustomerById,
  findIntervalByHour,
  getSnapToRoadLatLng,
  snapToRoad,
} from "./supportFunctions";

// simRatio = interval simulace 0.1 = 10 x za hodinu
// hour = aktualni hodina
const generateOrders = async (
  settings: Settings,
  simRatio: number,
  virtualDate: Date,
  snapToRoads: boolean
) => {
  const hour = virtualDate.getUTCHours();
  /* console.log("Generating orders for "+hour+" hour"); */
  var orders = [];
  for (var i = 0; i < settings.distributionAreas.length; i++) {
    const oblast = settings.distributionAreas[i];
    for (var j = 0; j < oblast.distributions.length; j++) {
      /* console.log("iterating in distribution " + JSON.stringify(oblast.distributions[j])); */
      const customerId = oblast.distributions[j].customerId;
      const customer = findCustomerById(settings, customerId);
      if (customer === null || customer === undefined) {
        /* console.log("cannot find customer with id " + customerId + " -> " + customer + " / " + JSON.stringify(oblast)); */
        continue;
      }
      // const customernum = props.settings.customers.indexOf(customer!) + 1;
      const customernum = oblast.distributions[j].distributionValue;
      var interval = findIntervalByHour(customer!.parking, hour);
      /* console.log("interval -> " + JSON.stringify(interval) + " [] " + JSON.stringify(customerDetail!.parking) + " hour " + hour); */
      if (interval) {
        const minCharge = customer!.minChargesPerMonth;
        const maxCharge = customer!.maxChargesPerMonth;
        var charge = minCharge + (maxCharge - minCharge) * Math.random();
        const intervalLength = countIntervalLength(interval!);
        var orderNums =
          ((charge * customernum) / (intervalLength * 30)) *
          (interval.percent / 100) *
          simRatio;
        /* console.log("orderNumber " + orderNums + " charge " + charge) */
        var decimalPart = orderNums - Math.floor(orderNums);
        if (Math.random() <= decimalPart) {
          orderNums = Math.ceil(orderNums);
        } else {
          orderNums = Math.floor(orderNums);
        }
        /* console.log("calculated orderNums " + orderNums) */
        for (var k = 0; k < orderNums; k++) {
          var angle = Math.random() * 360;
          var rndRadius = Math.random();
          if (oblast.distributions[j].isChecked) {
            // Polopaticky zpusob, jak to prisunout vic ke stredu oblasti
            rndRadius = rndRadius * rndRadius;
          }
          var radius = rndRadius * oblast.marker.radius;

          let generatedOrder = new Order(
            oblast.id,
            addToLatitude(oblast.marker.latitude, radius * Math.cos(angle)),
            addToLongitude(oblast.marker.longitude, radius * Math.sin(angle)),
            customer!.minkWhPerMonth +
              (customer!.maxkWhPerMonth - customer!.minkWhPerMonth) *
                Math.random(),
            customer!.minStartingCapacity +
              (customer!.maxStartingCapacity - customer!.minStartingCapacity) *
                Math.random(),
            customer!.id,
            virtualDate
          );
          if (snapToRoads) {
            generatedOrder = await snapToRoad(generatedOrder);
          }
          orders[orders.length] = generatedOrder;
        }
      }
    }
  }
  /* console.log("orders -> "+ JSON.stringify(orders)) */
  return orders;
};

export default generateOrders;
