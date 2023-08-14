import React, { Component } from "react";
import Textarea from "@salesforce/design-system-react/components/textarea";
import PropTypes from "prop-types";
import Icon from "@salesforce/design-system-react/components/icon";
import { Card } from "@salesforce/design-system-react";
import DataModelPicker from "../components/DataModelPicker";
import Postmonger from "postmonger";
var connection = new Postmonger.Session();

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:{},
      config:{},
      error: {},
    };
    // this.buttonHandler = this.buttonHandler.bind(this);
    //this.props.saveState=this.saveState.bind(this);
    props.message = props.message || "";
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
    this.props.message = e.target.value;
    console.log("1:",this.props);
    console.log("2:",this.props.message);
    this.props.saveState(e.target.value);
    //this.props.configured = true;
  }
/**
 * @description set state after the component has been updated
 */
readyHandler() {
  console.log("in readyHandler Step1");
  connection.trigger("ready");
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
                ></Card>
                <DataModelPicker journeyData={this.props.schema} />
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
