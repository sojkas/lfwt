import React, { useState } from "react";
import "./App.css";
import CustomerDistribution from "./components/CustomerDistribution";
import CustomerTypes from "./components/CustomerTypes";
import Navbar from "./components/Navbar";
import Resources from "./components/Resources";
import Simulation from "./components/Simulation";

function App() {
  const [menuItem, setMenuItem] = useState<number>(0);
  
  
  const selectedItemHandler = (selectedItem:number) => {
    setMenuItem(selectedItem);
  }

  return (
    <React.Fragment>
      <Navbar selectedItem={selectedItemHandler}/>
      {menuItem===0 && <Resources />}
      {menuItem===1 && <CustomerTypes/>}
      {menuItem===2 && <CustomerDistribution/>}
      {menuItem===3 && <Simulation/>}
    </React.Fragment>
  );
}

export default App;
