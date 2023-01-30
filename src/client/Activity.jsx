import React, { Component } from "react";
import Postmonger from "postmonger";
import IconSettings from "@salesforce/design-system-react/components/icon-settings";
import Textarea from "@salesforce/design-system-react/components/textarea";
import Step1 from "./steps/Step1";
var connection = new Postmonger.Session();

export class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    connection.on("initActivity", (data) => this.setState({ payload: data }));
    connection.trigger("ready");
    console.log("in componentDIdMount");
    // connection.trigger('updateButton',{
    //     button
    // })
  }
  render() {
    return <Step1 />;
  }
}
export default Activity;
