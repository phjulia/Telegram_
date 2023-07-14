import React from "react";
import ReactDOM from "react-dom/client";
import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css";
// import App from './App';
import Activity from "./Activity.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("in the index js");
root.render(
  <React.StrictMode>
    <Switch>
      <Route exact path="/telegram" component={Activity}></Route>
    </Switch>
    <Activity />
  </React.StrictMode>
);
