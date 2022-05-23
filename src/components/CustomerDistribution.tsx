import { Grid, TextField, Button } from "@mui/material";
import React from "react";
import Gmap from "./Gmap";
import DistributionUnit from "./DistributionUnit";
import Settings from "../models/settings";

const CustomerDistribution: React.FC<{ settings: Settings }> = (props) => {
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
                defaultValue={props.settings.symbolicName}
                size="small"
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="radius"
                label="Radius"
                variant="outlined"
                defaultValue={
                  props.settings.radius[0].toString() +
                  " " +
                  props.settings.radius[1]
                }
                size="small"
              />
            </Grid>
            <Grid item xs={1}>
              {props.settings.distributions.map((distribution) => (
                <DistributionUnit
                  key={Math.floor(Math.random() * 101)}
                  distributor={distribution.distributor}
                  distributionValue={distribution.distributionValue}
                  isChecked={distribution.isChecked}
                />
              ))}
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
