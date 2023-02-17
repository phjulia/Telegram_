import React, { Component } from "react";
import Textarea from "@salesforce/design-system-react/components/textarea";
import PropTypes from "prop-types";
import Icon from "@salesforce/design-system-react/components/icon";
import { Card } from "@salesforce/design-system-react";

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
    };
    // this.buttonHandler = this.buttonHandler.bind(this);
    props.config.message = props.config.message || "";
    this.handleChange = this.handleChange.bind(this);
    //this.handleTextClick = this.handleTextClick.bind(this);
  }
  onClick() {
    console.log("in onclick");
  }
  handleChange(e) {
    console.log("in handleChange");
    console.log("this.props.config", this.props.config);
    console.log("e.target.value", e.target.value);
    this.props.config.message = e.target.value;
    //this.props.configured = true;
  }
  render() {
    return (
      <>
        <section className="slds-grid slds-grid_vertical-align-center">
          <div className="slds-col">
            <div className="slds-grid slds-gutters">
              <div className="slds-col slds-size_1-of-3">
                <Card
                  heading="Personalization"
                  icon={<Icon category="action" name="user" size="small" />}
                  bodyClassName="dataPickerCard"
                >
                  <DataModelPicker />
                </Card>
              </div>
              <div className="slds-col slds-size_2-of-3">
                <h1 className="slds-text-title_caps slds-p-vertical_medium">
                  Add the text message:
                </h1>
                <Textarea
                  required
                  onChange={this.handleChange}
                  // onClick={this.handleTextClick}
                  value={this.props.message}
                />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
Step1.PropTypes = {
  config: PropTypes.object,
};
export default Step1;
