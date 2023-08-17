import React, { Component } from "react";
import Postmonger from "postmonger";
import PropTypes from "prop-types";
import Step1 from "./steps/Step1.jsx";
var connection = new Postmonger.Session();
export class StepManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: {
        metadata: {
          isConfigured: false,
        },
        arguments: {
          execute: {
            inArguments: [
              {
                isConfigured: false,
              },
            ],
          },
        },
      },
      data: { message: "" },
      config: {},
    };
    //this.buttonHandler = this.buttonHandler.bind(this);
    this.saveState = this.saveState.bind(this);
    this.readyHandler = this.readyHandler.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }
  saveState(m) {
    this.setState({
      data: {
        message: m,
      },
    });
  }
  /**
   * @description set state after the component has been updated
   */
  readyHandler() {
    this.setState(
      (prevState) => {},
      () => connection.trigger("ready") //called any time there is a load betwene JB and Cust App(on IFrame load)
    );
  }
  componentDidUpdate() {
    this.readyHandler();
  }
  componentDidMount() {
    //connection.on("initActivity", (data) => this.setState({ payload: data }));
    //connection.on("clickedNext", (data) => this.handleDone());
    //connection.on("clickedBack"..);
    connection.trigger("ready");
    /**----------------------------------------- */
    connection.on("requestedTokens", (data) => this.setState({ tokens: data }));
    connection.on("requestedCulture", (data) =>
      this.setState({ culture: data })
    );
    connection.on("requestedEndpoints", (data) =>
      this.setState({ endpoints: data })
    );
    connection.on("initActivity", (data) => {
      if (data) {
        this.setState({
          payload: data,
          type: "activity",
        });
      }
      this.setState({
        payload: {
          metaData: {
            isConfigured: false,
          },
          arguments: {
            execute: {
              inArguments: [],
            },
          },
        },
        type: "activity",
      });
    });
    connection.on("initActivityRunningHover", (data) =>
      this.setState({ payload: data, type: "activityHover" })
    );
    connection.on("initActivityRunningModal", (data) =>
      this.setState({ payload: data, type: "activityModal" })
    );
    connection.on("requestedSchema", (data) =>
      this.setState({ schema: data.schema })
    );
    //connection.on("clickedNext", (data) => this.setState({data:}));
    connection.on("clickedNext", (data) => this.handleDone(data));
    connection.on("requestedInteraction", (data) =>
      this.setState({ interaction: data })
    );
    connection.on("requestedTriggerEventDefinition", (data) =>
      this.setState({ eventDefinition: data })
    );
    connection.trigger("ready");
    connection.trigger("requestTokens");
    connection.trigger("requestCulture");
    connection.trigger("requestEndpoints");
    connection.trigger("requestTriggerEventDefinition");
    connection.trigger("requestSchema");
    connection.trigger("requestInteraction");
  }
  handleDone(data) {
    this.setState(
      (prevState) => {
        prevState.payload.metaData.isConfigured = true;
        prevState.payload.arguments.inArguments = [
          { message: this.state.data.message },
        ];
        connection.trigger("updateActivity", prevState.payload);
      },
      () => connection.trigger("ready")
    );
    console.log("this.state.payload", this.state.payload);
    //payload.metaData.isConfigured=true;

    //connection.trigger("updateActivity",payload);
    // this.setState(
    //   (prevState) => {
    //     prevState.payload.metaData.isConfigured = true;
    //     prevState.payload = this.props.onSubmit(prevState);

    //     // prevState.configured =
    //     //   prevState.payload.arguments.execute.inArguments[0].configured;
    //     connection.trigger("updateActivity", prevState.payload);
    //   },
    //   () => connection.trigger("ready")
    // );
  }
  render() {
    return (
      <div
        style={{ padding: "1.5rem 1rem 0px", background: "rgb(244, 246, 249)" }}
      >
        <Step1 saveState={this.saveState}></Step1>
      </div>
    );
  }
}
StepManager.propTypes = {
  children: PropTypes.object,
  onSubmit: PropTypes.func,
};
export default StepManager;
