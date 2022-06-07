import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Settings from "../models/settings";

const Navbar: React.FC<{
  selectedItem: (number: number) => void;
  active: number;
  settings: Settings | undefined;
  updatedSettings: (updatedSettingsValues: Settings) => void;
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

  const downloadHandler = () => {
    var dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(props.settings!));
    var dlAnchorElem = document.createElement("a");
    document.body.append(dlAnchorElem);
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "nimbee-configuration.json");
    dlAnchorElem.click();
    dlAnchorElem.remove();
  }

  const loadSettingsFromFile = () => {
    const fin = (document.getElementById("jsonfileinput")! as HTMLInputElement);
    var file_to_read = fin.files![0];
    console.log("Will read "+file_to_read);
    var fileread = new FileReader();
    fileread.onload = function(e:ProgressEvent<FileReader>) {
      console.log("Finished reading "+file_to_read);
      var content = e!.target!.result;
      var newSettings = JSON.parse(content!.toString()); // parse json
      console.log("Finished reading "+newSettings);
      props.updatedSettings(newSettings);
      fin.files = null;
    };
    fileread.readAsText(file_to_read);
  }

  return (
      <Grid container direction="row" spacing={2} className="navigation">
        <Grid item xs={8}>
          <ButtonGroup
              className="btn-group"
              variant="text"
              aria-label="string primary group"
          >
            <Button
                {...(props.active === 0
                    ? { className: "menu-active btn" }
                    : { className: "btn" })}
                onClick={resourcesHandler} >
              Resources
            </Button>
            <Button
                {...(props.active === 1
                    ? { className: "menu-active btn" }
                    : { className: "btn" })}
                onClick={cTHandler}
            >
              Customer Types
            </Button>
            <Button
                {...(props.active === 2
                    ? { className: "menu-active btn" }
                    : { className: "btn" })}
                onClick={cDHandler}
            >
              Customer Distribution
            </Button>
            <Button
                {...(props.active === 3
                    ? { className: "menu-active btn" }
                    : { className: "btn" })}
                onClick={simulationHandler} >
              Simulation
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={4}>
          <input type="file" id="jsonfileinput" onChange={loadSettingsFromFile} placeholder="Upload"/>
          &nbsp;
          <Button className="item-space" variant="contained" onClick={downloadHandler}>
            Download
          </Button>
          &nbsp;
          <Button className="item-space" variant="outlined" onClick={clearStorageHandler}>
            Delete
          </Button>
        </Grid>
      </Grid>
  );
};

export default Navbar;
