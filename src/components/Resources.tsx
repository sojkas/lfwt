import { Fab, TextField, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import DepotSetUnit from "./DepotSetUnit";
import TransportersItem from "./TransportersItem";
import Settings, {
  DepotUnit,
  MapMarker,
  Nimbee,
  Shift,
  Transporter,
} from "../models/settings";
import { Add } from "@mui/icons-material";
import NimbeeItem from "./NimbeeItem";
import ShiftItem from "./ShiftItem";
import Gmap from "./Gmap";

const Resources: React.FC<{
  settings: Settings;
  gmscriptLoaded: boolean;
  updatedSettings: (updatedSettings: Settings) => void;
}> = (props) => {
  const [depotSlotUnits, setDepotSlotUnits] = useState<DepotUnit[]>(
    props.settings.depotUnits
  );

  const [nimbees, setNimbees] = useState<Nimbee[]>(props.settings.nimbees);
  const [transporters, setTransporters] = useState<Transporter[]>(
    props.settings.transporters
  );
  const shifts: Shift[] = props.settings.shifts;

  const [cityName, setCityName] = useState<string>(
    props.settings.depotCity.cityName
  );

  const [isReadyToSetMarker, setIsReadyToSetMarker] = useState<boolean>(true);

  const isMarkerInPlace = (value: boolean) => {};

  const [depotMarkers, setDepotMarkers] = useState<MapMarker[]>([]);
  const selectedMarkerHandler = (mapMarker: MapMarker) => {};

  const addDepotUnitHandler = () => {
    const newDepot: DepotUnit = new DepotUnit(
      props.settings.depotCity.cityId,
      "New Depot",
      8
    );
    setDepotSlotUnits(depotSlotUnits.concat(newDepot));
  };

  const removeDepotUnitHandler = (id: string) => {
    const newDepotUnitsList = depotSlotUnits.filter(
      (depotSlotUnit) => depotSlotUnit.id !== id
    );
    setDepotSlotUnits(newDepotUnitsList);
  };

  const updateDepotUnitHandler = (id: string, dpUnit: DepotUnit) => {
    for (let depotUnit of depotSlotUnits) {
      if (depotUnit.id === id) {
        return props.settings.depotUnits.splice(
          depotSlotUnits.indexOf(depotUnit),
          1,
          dpUnit
        );
      }
    }
  };

  const cityNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setCityName(event.target.value);
  };
  const updateNimbeeHandler = (id: string, nimb: Nimbee) => {
    /* console.log("to be updated " +JSON.stringify(nimb));
    console.log("all nimbs " +JSON.stringify(nimbees)); */
    for (let nimbee of nimbees) {
      if (nimbee.id === id) {
        return props.settings.nimbees.splice(nimbees.indexOf(nimbee), 1, nimb);
      }
    }
  };

  const addNimbeeHandler = () => {
    const newNimbee: Nimbee = new Nimbee("v 1", 20, 4);
    setNimbees(nimbees.concat(newNimbee));
  };

  const removeNimbeeHandler = (id: string) => {
    const newNimbeesList = nimbees.filter((nimbee) => nimbee.id !== id);
    setNimbees(newNimbeesList);
  };

  const updateTransporterHandler = (id: string, transp: Transporter) => {
    /* console.log("to be updated " +JSON.stringify(nimb));
    console.log("all nimbs " +JSON.stringify(nimbees)); */
    for (let transporter of transporters) {
      if (transporter.id === id) {
        return props.settings.transporters.splice(
          transporters.indexOf(transporter),
          1,
          transp
        );
      }
    }
  };

  const addTransporterHandler = () => {
    const newTransporter: Transporter = new Transporter(3, 10, 5);
    setTransporters(transporters.concat(newTransporter));
  };

  const removeTransporterHandler = (id: string) => {
    const newTransportersList = transporters.filter(
      (transporter) => transporter.id !== id
    );
    setTransporters(newTransportersList);
  };

  const updateShiftHandler = (id: string, shiftItem: Shift) => {
    for (let shift of shifts) {
      if (shift.id === id) {
        return props.settings.shifts.splice(
          shifts.indexOf(shift),
          1,
          shiftItem
        );
      }
    }
  };

  useEffect(() => {
    props.settings.depotCity.cityName = cityName;
    props.settings.depotUnits = depotSlotUnits;
    props.settings.nimbees = nimbees;
    props.settings.transporters = transporters;
    props.settings.shifts = shifts;
    props.updatedSettings(props.settings);
  }, [cityName, depotSlotUnits, nimbees, transporters, shifts, props]);

  return (
    <React.Fragment>
      <Grid
        className="grid"
        container
        direction="row"
        justifyContent="center"
        spacing={1}
      >
        <Grid className="box" item xs={4}>
          <h4>Depots configuration</h4>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={1}>
              <TextField
                id="city"
                label="City"
                variant="outlined"
                value={cityName}
                size="small"
                onChange={cityNameChangeHandler}
              />
            </Grid>
            <Grid item rowSpacing={2}>
              {depotSlotUnits.map((depotUnit) => (
                <DepotSetUnit
                  key={depotUnit.id}
                  depotUnit={depotUnit}
                  removeDepotUnit={removeDepotUnitHandler}
                  updateDepotUnit={updateDepotUnitHandler}
                />
              ))}
            </Grid>
            <Grid item xs={1}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={10}></Grid>
                <Grid item xs={2}>
                  <Fab
                    aria-label="add"
                    size="small"
                    onClick={addDepotUnitHandler}
                  >
                    <Add />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div className="space-20"></div>
          {props.gmscriptLoaded && (
            <Gmap
              settings={props.settings}
              isReadyToSetMarker={isReadyToSetMarker}
              isMarkerInPlace={isMarkerInPlace}
              circleAvailable={false}
              allMarkers={depotMarkers}
              selectedMarker={selectedMarkerHandler}
            />
          )}
        </Grid>
        <Grid className="box" item xs={4}>
          <h4>Batteries & Transporters</h4>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={6}>
                  {nimbees.map((nimbee) => (
                    <NimbeeItem
                      key={nimbee.id}
                      nimbee={nimbee}
                      updatedNimbee={updateNimbeeHandler}
                      removeNimbee={removeNimbeeHandler}
                    />
                  ))}
                </Grid>
                <Grid item xs={6}>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={10}></Grid>
                    <Grid item xs={2}>
                      <Fab
                        aria-label="add"
                        size="small"
                        onClick={addNimbeeHandler}
                      >
                        <Add />
                      </Fab>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={6}>
                  {transporters.map((transporter) => (
                    <TransportersItem
                      key={transporter.id}
                      transporter={transporter}
                      updatedTransporter={updateTransporterHandler}
                      removeTransporter={removeTransporterHandler}
                    />
                  ))}
                </Grid>
                <Grid item xs={6}>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={10}></Grid>
                    <Grid item xs={2}>
                      <Fab
                        aria-label="add"
                        size="small"
                        onClick={addTransporterHandler}
                      >
                        <Add />
                      </Fab>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="box" item xs={4}>
          <h4>Drivers & Workshifts</h4>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={6}>
              {shifts.map((shift) => (
                <ShiftItem
                  key={shift.id}
                  shift={shift}
                  updateShift={updateShiftHandler}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Resources;
