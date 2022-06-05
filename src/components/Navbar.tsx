import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const Navbar: React.FC<{
  selectedItem: (number: number) => void;
  active: number;
}> = (props) => {
  const resourcesHandler = () => {
    return props.selectedItem(0);
  };
  const cTHandler = () => {
    return props.selectedItem(1);
  };
  const cDHandler = () => {
    return props.selectedItem(2);
  };
  const simulationHandler = () => {
    return props.selectedItem(3);
  };

const clearStorageHandler = () => {
  window.localStorage.clear();
}

  return (
    <Grid container direction="row" spacing={2} className="navigation">
      <Grid item xs={10}>
        <ButtonGroup
          className="btn-group"
          variant="text"
          aria-label="string primary group"
        >
          <Button
            {...(props.active === 0
              ? { className: "menu-active btn" }
              : { className: "btn" })}
            onClick={resourcesHandler}
          >
            Resources
          </Button>
          <span className="space"></span>
          <Button
            {...(props.active === 1
              ? { className: "menu-active btn" }
              : { className: "btn" })}
            onClick={cTHandler}
          >
            Customer Types
          </Button>
          <span className="space"></span>
          <Button
            {...(props.active === 2
              ? { className: "menu-active btn" }
              : { className: "btn" })}
            onClick={cDHandler}
          >
            Customer Distribution
          </Button>
          <span className="space"></span>
          <Button
            {...(props.active === 3
              ? { className: "menu-active btn" }
              : { className: "btn" })}
            onClick={simulationHandler}
          >
            Simulation
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={2}>
        <Button className="item-space" variant="contained" onClick={clearStorageHandler}>
          Clear storage
        </Button>
      </Grid>
    </Grid>
  );
};

export default Navbar;
