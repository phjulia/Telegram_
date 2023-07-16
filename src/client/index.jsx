import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css";
// import App from './App';
import Activity from "./Activity.jsx";
// import { Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("in the index js");
root.render(
  // <React.StrictMode>
  //   <Switch>
  <BrowserRouter>
    <Routes>
      <Route exact path="/telegram" component={Activity}></Route>
    </Routes>
  </BrowserRouter>
  /* </Switch>
    <Activity />
  </React.StrictMode> */
);
