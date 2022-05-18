import React from "react";
import Grid from "@mui/material/Grid";
import { IconButton, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const DepotSet = () => {

    return (
        <React.Fragment>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={6}>
                  <Grid container direction="row" spacing={1}>
                    <Grid item xs={8}>
                      <TextField
                        id="depot"
                        label="Depot set"
                        variant="outlined"
                        defaultValue="depot A"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <IconButton aria-label="remove">
                        <Remove />

                      </IconButton>
                      {/* <Button size="large" variant="contained" onClick={removeDepotHandler}>
                      <Icon fontSize="small">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 12H4"
                          />
                        </svg>
                      </Icon>
                      </Button> */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                <IconButton aria-label="add">
                        <Add />

                      </IconButton>
                  {/* <Icon fontSize="small">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </Icon> */}
                </Grid>
              </Grid>
        </React.Fragment>
    );

}

export default DepotSet;