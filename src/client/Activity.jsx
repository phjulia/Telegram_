import React, { Component } from "react";
import Postmonger from "postmonger";
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
    return <div>Hello from aa </div>;
  }
}
export default Activity;
