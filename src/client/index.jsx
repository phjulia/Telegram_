import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App';
import Activity from "./Activity";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("in the index js");
root.render(
  <React.StrictMode>
    <Activity />
  </React.StrictMode>
);
