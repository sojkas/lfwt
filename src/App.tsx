import React, { useState } from "react";
import "./App.css";
import CustomerDistribution from "./components/CustomerDistribution";
import CustomerTypes from "./components/CustomerTypes";
import Navbar from "./components/Navbar";
import Resources from "./components/Resources";
import Simulation from "./components/Simulation";
import Settings from "./models/settings";

function App() {
  const settings = new Settings();
  const [menuItem, setMenuItem] = useState<number>(0);

  const selectedItemHandler = (selectedItem: number) => {
    setMenuItem(selectedItem);
  };

  return (
    <div className="app">
      <Navbar selectedItem={selectedItemHandler} active={menuItem} />
      <div className="section">
        {menuItem === 0 && <Resources settings={settings} />}
        {menuItem === 1 && <CustomerTypes />}
        {menuItem === 2 && <CustomerDistribution />}
        {menuItem === 3 && <Simulation />}
      </div>
    </div>
  );
}

export default App;
