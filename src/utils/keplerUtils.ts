import {SimulationValues} from "../models/order";

const mapboxApiAccessToken="pk.eyJ1IjoibWlyb3phcCIsImEiOiJjbDEzcGpwYXQwMWZpM2xudmRmbDEzN2diIn0.2Y04D3Ir4kN2GPirpCLftQ"

const renderDataset = (simulation: SimulationValues) => {
  return {
    datasets: {
      info: {
        label: 'Nimbee simulation',
        id: 'simulation'
      },
      data: {
        rows: simulation.orders.map(value => [value.id, value.distributionAreaId, value.latitude, value.longitude, value.kw, value.customerId, value.orderDate]),
        fields: [
          {"name": "id", "type": "string", "format": "", "analyzerType": "STRING"},
          {"name": "distributionAreaId", "type": "string", "format": "", "analyzerType": "STRING"},
          {"name": "latitude", "type": "real", "format": "", "analyzerType": "FLOAT"},
          {"name": "longitude", "type": "real", "format": "", "analyzerType": "FLOAT"},
          {"name": "kw", "type": "real", "format": "", "analyzerType": "FLOAT"},
          {"name": "customerId", "type": "integer", "format": "", "analyzerType": "INT"},
          {"name": "orderDate", "type": "timestamp", "format": "YYYY-M-DTHH:mm:ss.SSSS", "analyzerType": "DATETIME"}
        ]
      }
    }
  };
}
