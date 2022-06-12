import Settings from "../models/settings";
import Order from "../models/order";
import {
  addToLatitude,
  addToLongitude,
  countIntervalLength,
  findCustomerById,
  findCustomerDetailById,
  findIntervalByHour,
} from "./supportFunctions";

// simRatio = interval simulace 0.1 = 10 x za hodinu
// hour = aktualni hodina
const generateOrders = (
  settings: Settings,
  simRatio: number,
  virtualDate: Date
) => {
  const hour = virtualDate.getHours();
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
      const customerDetail = findCustomerDetailById(settings, customerId);

      // const customernum = props.settings.customers.indexOf(customer!) + 1;
      const customernum = oblast.distributions[j].distributionValue;
      var interval = findIntervalByHour(customerDetail!.parking, hour);
      /* console.log("interval -> " + JSON.stringify(interval) + " [] " + JSON.stringify(customerDetail!.parking) + " hour " + hour); */
      if (interval) {
        const minCharge = customerDetail!.minChargesPerMonth;
        const maxCharge = customerDetail!.maxChargesPerMonth;
        var charge = minCharge + (maxCharge - maxCharge) * Math.random();
        const intervalLength = countIntervalLength(interval!)
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
          orders[orders.length] = new Order(
            oblast.id,
            addToLatitude(oblast.marker.latitude, radius * Math.cos(angle)),
            addToLongitude(oblast.marker.longitude, radius * Math.sin(angle)),
            customerDetail!.minkWhPerMonth + (customerDetail!.maxkWhPerMonth - customerDetail!.minkWhPerMonth) *
                Math.random(),
            customer!.id,
            virtualDate
          );
        }
      }
    }
  }
  /* console.log("orders -> "+ JSON.stringify(orders)) */
  return orders;
};

export default generateOrders;
