import React, { Component } from "react";
import Textarea from "@salesforce/design-system-react/components/textarea";
class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
    };
    //props.config.message = props.config.message || "";
  }
  render() {
    return (
      <section className="slds-grid slds-grid_vertical-align-center">
        <div className="slds-col">
          <div className="slds-grid slds-gutters">
            <div className="slds-col slds-size_1-of-3"></div>
            <div className="slds-col slds-size_2-of-3">
              <h1 className="slds-text-title_caps slds-p-vertical_medium">
                Add the text message:
              </h1>
              <Textarea required onChange onClick value></Textarea>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Step1;
