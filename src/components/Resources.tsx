import { Button, Fab, Grid } from "@mui/material";
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

let draggable: boolean = false;

const Resources: React.FC<{
  settings: Settings;
  gmscriptLoaded: boolean;
  updatedSettings: (updatedSettings: Settings) => void;
}> = (props) => {
  const [selectedUnit, setSelectedUnit] = useState<DepotUnit>();
  const [nimbees, setNimbees] = useState<Nimbee[]>(props.settings.nimbees);
  const [transporters, setTransporters] = useState<Transporter[]>(
    props.settings.transporters
  );
  const shifts: Shift[] = props.settings.shifts;

  const getAllDepotMarkers = () => {
    if (selectedUnit) {
      return [selectedUnit.marker];
    }
    return props.settings.depots.map((depot) => depot.marker);
  };
  const addUnitHandler = () => {
    setSelectedUnit((prevUnit) => {
      const newDepot = new DepotUnit("new Depot", new MapMarker(50, 14, 0), 4);

      const settings = {
        ...props.settings,
        depots: [...props.settings.depots, newDepot],
      };
      props.updatedSettings(settings);
      return newDepot;
    });
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

  /*
    const initDepotMarkers = () => {
      const mkrs = [];
      if (selectedUnit) {
        mkrs.push(selectedUnit.marker);
      } else {
        for (let i = 0; i < depotUnits.length; i++) {
          // /* if (selectedUnit && allDistributionUnits[i].id === selectedUnit!.id) {
          //   mkrs.push(selectedUnit!.marker);
          // } else {
          mkrs.push(depotUnits[i].marker);
          // /* }
        }
      }
      setDepotMarkers(mkrs);
    };
  */

  // useEffect(initDepotMarkers, [selectedUnit, depotUnits]);

  const setPositionHandler = (newPositon: google.maps.LatLng) => {
    console.log("Marker "+ JSON.stringify(selectedUnit?.marker));
    setSelectedUnit((prevUnit) => {
      if (prevUnit?.marker) {
        const newMarker: MapMarker = {
          ...prevUnit!.marker,
          latitude: newPositon.lat(),
          longitude: newPositon.lng(),
        };
        const newUnit = { ...prevUnit!, marker: newMarker };
        updateUnitHandler(newUnit);
        return newUnit;
      } else {
        const newUnit = new DepotUnit(
          "New Unit",
          new MapMarker(newPositon.lat(), newPositon.lng(), 0),
          1
        );
        // setDepotUnits((prevDepots) => {
        //   return [...prevDepots!, newUnit];
        // });
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

  const updateNimbeeHandler = (id: string, nimb: Nimbee) => {
    /* console.log("to be updated " +JSON.stringify(nimb));
    console.log("all nimbs " +JSON.stringify(nimbees)); */
    for (let nimbee of props.settings.nimbees) {
      if (nimbee.id === id) {
        return props.settings.nimbees.splice(props.settings.nimbees.indexOf(nimbee), 1, nimb);
      }
    }
  };

  const addNimbeeHandler = () => {
    const newNimbee: Nimbee = new Nimbee("v 1", 20, 4);
    const newSettings = { ...props.settings, nimbees: [...props.settings.nimbees, newNimbee] }
    props.updatedSettings(newSettings);
  };

  const removeNimbeeHandler = (id: string) => {
    const newNimbeesList = nimbees.filter((nimbee) => nimbee.id !== id);
    props.updatedSettings({...props.settings, nimbees: newNimbeesList });
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
    //props.settings.depots = depotUnits;
    props.settings.nimbees = nimbees;
    props.settings.transporters = transporters;
    props.settings.shifts = shifts;
    props.updatedSettings(props.settings);
    window.localStorage.setItem("data", JSON.stringify(props.settings));
  }, [nimbees, transporters, shifts, props]);

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
                  {/* <Fab
                        aria-label="add"
                        size="small"
                        onClick={addUnitHandler}>
                      <Add />
                    </Fab> */}
                </Grid>
              </Grid>
            </Grid>
            <div className="space-20"></div>
            {props.gmscriptLoaded && (
              <Gmap
                settings={props.settings}
                allMarkers={getAllDepotMarkers()}
                draggable={draggable}
                setPosition={setPositionHandler}
                selectedMarker={selectedMarkerHandler}
              />
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
