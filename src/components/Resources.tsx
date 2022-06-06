import { Fab, TextField, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DepotSetUnit from "./DepotSetUnit";
import TransportersItem from "./TransportersItem";
import Settings, {
  DepotArea,
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
  const [depotAreas, setDepotAreas] = useState<DepotArea[]>(
    props.settings.depotAreas
  );
  const [selectedArea, setSelectedArea] = useState<DepotArea>();

  const [nimbees, setNimbees] = useState<Nimbee[]>(props.settings.nimbees);
  const [transporters, setTransporters] = useState<Transporter[]>(
    props.settings.transporters
  );
  const shifts: Shift[] = props.settings.shifts;

  const addDepotUnitHandler = () => {
    setSelectedArea((prevArea) => {
      const newDepot = new DepotUnit(prevArea!.id, "new Depot", 8);
      prevArea!.depots.push(newDepot);
      return { ...prevArea!, depots: prevArea!.depots };
    });
  };

  const removeDepotUnitHandler = (id: string) => {
    setSelectedArea((prevArea) => {
      const newDepotsArray = prevArea!.depots.filter(
        (depotUnit) => depotUnit.id !== id
      );
      return { ...prevArea!, depots: newDepotsArray };
    });
  };

  const updateDepotUnitHandler = (id: string, dpUnit: DepotUnit) => {
    for (let depotUnit of selectedArea!.depots) {
      if (depotUnit.id === id) {
        return setSelectedArea((prevArea) => {
          prevArea!.depots.splice(
            prevArea!.depots.indexOf(depotUnit),
            1,
            dpUnit
          );
          return { ...prevArea!, depots: prevArea!.depots };
        });
      }
    }
  };

  const [depotMarkers, setDepotMarkers] = useState<MapMarker[]>(
    []
  );

  const cityNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setSelectedArea((prevArea) => {
      return { ...prevArea!, name: event.target.value };
    });
  };
  const initDepotMarkers = () => {
    const mkrs = [];
    if (selectedArea) {
      mkrs.push(selectedArea.marker);
    } else {
      for (let i = 0; i < depotAreas.length; i++) {
        /* if (selectedArea && allDistributionAreas[i].id === selectedArea!.id) {
          mkrs.push(selectedArea!.marker);
        } else { */
        mkrs.push(depotAreas[i].marker);
        /* } */
      }
    }
    setDepotMarkers(mkrs);
  };

  useEffect(initDepotMarkers, [selectedArea, depotAreas]);

  const setPositionHandler = (newPositon: google.maps.LatLng) => {
    setSelectedArea((prevArea) => {
      if (prevArea?.marker) {
        const newMarker: MapMarker = {
          ...prevArea!.marker,
          latitude: newPositon.lat(),
          longitude: newPositon.lng(),
        };
        return { ...prevArea!, marker: newMarker };
      } else {
        const newArea = new DepotArea(
          "New Area",
          new MapMarker(newPositon.lat(), newPositon.lng(), 0),
          []
        );
        setDepotAreas((prevDepots) => {
          return [...prevDepots!, newArea];
        });
        return newArea;
      }
    });
  };
  const selectedMarkerHandler = (selectedMarker: MapMarker) => {
    for (let i = 0; i < depotAreas.length; i++) {
      if (depotAreas[i].marker.id === selectedMarker.id) {
        setSelectedArea(depotAreas[i]);
      }
    }
  };
  const saveDepotsHandler = () => {
    for (let i = 0; i < depotAreas.length; i++) {
      if (selectedArea!.id === depotAreas[i].id) {
        depotAreas.splice(i, 1, selectedArea!);
      }
    }
    props.settings.depotAreas = depotAreas;
    props.updatedSettings(props.settings);
    setSelectedArea(undefined);
  };
  const removeAreaHandler = () => {
    setDepotAreas((prevDepots) => {
      const newDepotAreas = prevDepots!.filter(
        (area) => area.id !== selectedArea!.id
      );
      return newDepotAreas;
    });
    setSelectedArea(undefined);
  };

  if (selectedArea) {
    draggable=true;
  } else {
    draggable=false;
  }

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
    props.settings.depotAreas = depotAreas;
    props.settings.nimbees = nimbees;
    props.settings.transporters = transporters;
    props.settings.shifts = shifts;
    props.updatedSettings(props.settings);
    window.localStorage.setItem("data", JSON.stringify(props.settings));
  }, [depotAreas, nimbees, transporters, shifts, props]);

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
          {selectedArea && (
            <Grid container direction="column" spacing={2}>
              <Grid item xs={1}>
                <TextField
                  id="city"
                  label="City"
                  variant="outlined"
                  value={selectedArea?.name}
                  size="small"
                  onChange={cityNameChangeHandler}
                />
              </Grid>
              <Grid item rowSpacing={2}>
                {selectedArea.depots.map((depotUnit) => (
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
              <Grid item xs={1}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={3}>
                    <Button
                      variant="outlined"
                      className="item-space"
                      onClick={saveDepotsHandler}
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="outlined"
                      className="item-space"
                      onClick={removeAreaHandler}
                    >
                      Delete area
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
          {selectedArea && <div className="space-20"></div>}
          {props.gmscriptLoaded && (
            <Gmap
              settings={props.settings}
              allMarkers={depotMarkers}
              draggable={draggable}
              setPosition={setPositionHandler}
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
