import { Grid, TextField, Button } from "@mui/material";
import React from "react";
import Gmap from "./Gmap";
import DistributionUnit from "./DistributionUnit";

const CustomerDistribution = () => {
  return (
    <React.Fragment>
      <Grid className="grid" container direction="row" spacing={2}>
        <Grid className="box" item xs={6}>
          <Gmap />
        </Grid>
        <Grid className="box" item xs={6}>
          <h4>Parametry oblasti</h4>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={1}>
              <TextField
                id="symbolic-name"
                label="Symbolicky nazev"
                variant="outlined"
                defaultValue="Vnitrni mesto"
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="radius"
                label="Radius"
                variant="outlined"
                defaultValue="5 km"
              />
            </Grid>
            <Grid item xs={1}>
              <DistributionUnit />
            </Grid>
            <Grid item xs={1}>
              <Button variant="outlined">Save</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomerDistribution;
