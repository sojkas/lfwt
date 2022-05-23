import { Grid, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import Gmap from "./Gmap";
import DistributionUnit from "./DistributionUnit";
import Settings, {DistributionUnitClass} from "../models/settings";

const CustomerDistribution: React.FC<{ settings: Settings }> = (props) => {
  const[allDistributions, setAllDistributions] = useState<Settings["distributions"]>(props.settings.distributions);

  const addDistributionHandler = () => {
    const newDistribution = new DistributionUnitClass("Manager", 100, false);
    setAllDistributions((prevDistributions)=>{
      return prevDistributions.concat(newDistribution);
    })
  };

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
              {allDistributions.map((distribution) => (
                <DistributionUnit
                  key={Math.floor(Math.random() * 101)}
                  distributor={distribution.distributor}
                  distributionValue={distribution.distributionValue}
                  isChecked={distribution.isChecked}
                  onAddDistribution={addDistributionHandler}
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
