import React from "react";
//import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css";
// import App from './App';
import Activity from "./Activity";
import { Route, Routes, Switch, BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("in the index js");
root.render(
  // <Switch>
  //   <Route exact path="/telegram" element={<Activity />}></Route>
  //   <Route exact path="/" element={<Activity />}></Route>
  // </Switch>
  <Routes>
    <Route path="/" element={<Activity />} />
    <Route path="/telegram" element={<Activity />} />
  </Routes>
);
