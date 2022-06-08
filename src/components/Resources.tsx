import { Button, Fab, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Settings, {
  DepotUnit,
  MapMarker,
  Nimbee,
  Shift,
  Transporter,
} from "../models/settings";
import { Add } from "@mui/icons-material";
import DepotSetUnit from "./DepotSetUnit";
import NimbeeItem from "./NimbeeItem";
import TransportersItem from "./TransportersItem";
import ShiftItem from "./ShiftItem";
import Gmap from "./Gmap";

let draggable: boolean = false;

const Resources: React.FC<{
  settings: Settings;
  gmscriptLoaded: boolean;
  updatedSettings: (updatedSettings: Settings) => void;
}> = (props) => {
  const [selectedUnit, setSelectedUnit] = useState<DepotUnit>();

  const getAllDepotMarkers = () => {
    if (selectedUnit) {
      return [selectedUnit.marker];
    }
    return props.settings.depots.map((depot) => depot.marker);
  };

  const removeUnitHandler = (id: string) => {
    setSelectedUnit((prevUnit) => {
      const newDepotsArray = props.settings.depots.filter(
          (depotUnit) => depotUnit.id !== id
      );
      const settings = { ...props.settings, depots: newDepotsArray };
      props.updatedSettings(settings);
      return undefined;
    });
  };

  const updateUnitHandler = (changedUnit: DepotUnit) => {
    console.log("Updating  " + changedUnit);
    for (let depotUnit of props.settings.depots) {
      if (depotUnit.id === changedUnit.id) {
        return setSelectedUnit((prevUnit) => {
          const newDepotArray = [...props.settings.depots];
          newDepotArray.splice(
              newDepotArray.indexOf(depotUnit),
              1,
              changedUnit
          );
          const settings = { ...props.settings, depots: newDepotArray };
          props.updatedSettings(settings);
          return changedUnit;
        });
      }
    }
  };

  const addUnitHandler = () => {
    console.log("Creating new unit from button")
    const newDepot = new DepotUnit("new Depot", new MapMarker(50, 14, 0), 4);
    const settings = {
      ...props.settings,
      depots: [...props.settings.depots, newDepot],
    };
    props.updatedSettings(settings);
    setSelectedUnit(newDepot);
  };

  const setPositionHandler = (newPositon: google.maps.LatLng) => {
    console.log("Handling incoming position")
    setSelectedUnit((prevUnit) => {
      if (prevUnit) {
        console.log("Updating unit")
        const newMarker: MapMarker = {
          ...prevUnit!.marker,
          latitude: newPositon.lat(),
          longitude: newPositon.lng(),
        };
        const newUnit = { ...prevUnit!, marker: newMarker };
        updateUnitHandler(newUnit);
        return newUnit;
      } else {
        console.log("Creating new unit from position")
        const newUnit = new DepotUnit("New Unit", new MapMarker(newPositon.lat(), newPositon.lng(), 0), 1);
        const settings = {
          ...props.settings,
          depots: [...props.settings.depots, newUnit],
        };
        props.updatedSettings(settings);
        return newUnit;
      }
    });
  };

  const selectedMarkerHandler = (selectedMarker: MapMarker) => {
    console.log("Selected marker: "+selectedMarker);
    for (let i = 0; i < props.settings.depots.length; i++) {
      if (props.settings.depots[i].marker.id === selectedMarker.id) {
        setSelectedUnit(props.settings.depots[i]);
      }
    }
  };

  const depotDoneHandler = () => {
    setSelectedUnit(undefined);
  };

  if (selectedUnit) {
    draggable = true;
  } else {
    draggable = false;
  }

  const updateNimbeeHandler = (id: string, updatedNimbee: Nimbee) => {
    console.log("Updating nimbee: "+props.settings.nimbees.length);
    for (let existingNimbee of props.settings.nimbees) {
      if (existingNimbee.id === updatedNimbee.id) {
        const newNimbees = [...props.settings.nimbees];
        newNimbees.splice(newNimbees.indexOf(existingNimbee), 1, updatedNimbee);
        props.updatedSettings({
          ...props.settings,
          nimbees: newNimbees
        });
      }
    }
  };

  const addNimbeeHandler = () => {
    const newNimbee: Nimbee = new Nimbee("v 1", 20, 4);
    console.log("Adding new nimbee");
    const newSettings = { ...props.settings, nimbees: [...props.settings.nimbees, newNimbee] }
    props.updatedSettings(newSettings);
  };

  const removeNimbeeHandler = (id: string) => {
    console.log("Removing nimbee");
    const newNimbeesList = props.settings.nimbees.filter((nimbee) => nimbee.id !== id);
    props.updatedSettings({ ...props.settings, nimbees: newNimbeesList });
  };

  const updateTransporterHandler = (id: string, transp: Transporter) => {
    /* console.log("to be updated " +JSON.stringify(nimb));
    console.log("all nimbs " +JSON.stringify(nimbees)); */
    for (let transporter of props.settings.transporters) {
      if (transporter.id === id) {
        const newArray = [...props.settings.transporters];
        newArray.splice(props.settings.transporters.indexOf(transporter), 1, transp);
        return props.updatedSettings({ ...props.settings, transporters: newArray});
      }
    }
  };

  const addTransporterHandler = () => {
    console.log("Adding transporter");
    const newTransporter: Transporter = new Transporter(3, 10, 5);
    props.updatedSettings({ ...props.settings, transporters: [...props.settings.transporters, newTransporter]});
  };

  const removeTransporterHandler = (id: string) => {
    console.log("Removing transporter");
    const newTransportersList = props.settings.transporters.filter(
        (transporter) => transporter.id !== id
    );
    props.updatedSettings({ ...props.settings, transporters: newTransportersList });
  };

  const updateShiftHandler = (id: string, shiftItem: Shift) => {
    for (let shift of props.settings.shifts) {
      if (shift.id === id) {
        const newShifts = [...props.settings.shifts];
        newShifts.splice(newShifts.indexOf(shift), 1, shiftItem);
        return props.updatedSettings({...props.settings, shifts: newShifts});
      }
    }
  };

  return (
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
            {props.settings.depots.map((depotUnit) => (
                <Grid item rowSpacing={2}>
                  <DepotSetUnit
                      key={depotUnit.id}
                      depotUnit={
                        depotUnit.id === selectedUnit?.id ? selectedUnit : depotUnit
                      }
                      removeDepotUnit={removeUnitHandler}
                      updateDepotUnit={updateUnitHandler}
                      disabled={depotUnit.id !== selectedUnit?.id}
                  />
                </Grid>
            ))}
            <Grid item xs={1}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={9}></Grid>
                <Grid item xs={3}>
                  {selectedUnit && (
                      <Button
                          variant="outlined"
                          className="item-space"
                          onClick={depotDoneHandler}
                      >
                        Done
                      </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <div className="space-20"></div>
            {props.gmscriptLoaded && (
                <Grid item xs={1}>
                  <Gmap
                      settings={props.settings}
                      allMarkers={getAllDepotMarkers()}
                      draggable={draggable}
                      setPosition={setPositionHandler}
                      selectedMarker={selectedMarkerHandler}
                  />
                </Grid>
            )}
          </Grid>
        </Grid>
        <Grid className="box" item xs={4}>
          <h4>Batteries & Transporters</h4>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={6}>
                  {props.settings.nimbees.map((nimbee) => (
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
                  {props.settings.transporters.map((transporter) => (
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
              {props.settings.shifts.map((shift) => (
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
  );
};

export default Resources;
