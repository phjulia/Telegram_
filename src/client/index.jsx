import React from "react";
//import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css";
// import App from './App';
const Activity = import("./Activity");
import { Route, Switch } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("in the index js");
root.render(
  <Switch>
    <Route exact path="/telegram" component={Activity}></Route>
    <Route exact path="/" component={Activity}></Route>
    {/* <BrowserRouter>
    <Routes>
<      Route exact path="/telegram" component={Activity}></Route>
    </Routes>
  </BrowserRouter> */}
  </Switch>
);
