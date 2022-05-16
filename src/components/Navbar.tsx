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

  return (
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
  );
};

export default Navbar;
