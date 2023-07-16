import React, { Component } from "react";
import Step1 from "./steps/Step1.jsx";
import esd from "../client/components/entrySourceDispatcher.js";
import StepManager from "../client/StepManager.jsx";

const connection = new Postmonger.Session();
export class Activity extends Component {
  constructor(props) {
    super(props);
    this.esd = esd.bind(this);
  }
  componentDidMount() {
    connection.trigger("ready"); //called any time there is a load betwene JB and Cust App(on IFrame load)
  }
  render() {
    return (
      <h1>Activity component</h1>
      // <StepManager onSubmit={this.esd}>
      //   <Step1></Step1>
      // </StepManager>
    );
  }
}
export default Activity;
