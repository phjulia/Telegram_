import React, { Component } from "react";
import Step1 from "./steps/Step1";
import esd from "../client/components/entrySourceDispatcher.js";
import StepManager from "../client/StepManager";
import DataModelPicker from "./components/DataModelPicker";

export class Activity extends Component {
  constructor(props) {
    super(props);
    this.esd = esd.bind(this);
  }
  render() {
    return (
      <DataModelPicker/>
      <StepManager onSubmit={this.esd}>
        <Step1></Step1>
      </StepManager>
    );
  }
}
export default Activity;
