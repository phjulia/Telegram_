import React, { Component } from "react";
import Postmonger from "postmonger";
import PropTypes from "prop-types";
var connection = new Postmonger.Session();

export class StepManager extends Component {
  constructor(props) {
    super(props);
    console.log("children", this.props.children);
    this.state = {
      data: {},
      config: {},
    };
    //this.buttonHandler = this.buttonHandler.bind(this);
    this.readyHandler = this.readyHandler.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }
  /**
   * @description set state after the component has been updated
   */
  readyHandler() {
    console.log("in readyHandler");
    this.setState(
      (prevState) => {
        console.log("setting state in readyHandler");
      },
      () => connection.trigger("ready")
    );
  }
  componentDidUpdate() {
    console.log("in componentDidUpdate");
    this.readyHandler();
  }
  componentDidMount() {
    //connection.on("initActivity", (data) => this.setState({ payload: data }));
    //connection.on("clickedNext", (data) => this.handleDone());
    //connection.on("clickedBack"..);
    //connection.trigger("ready");
    console.log("in componentDIdMount");
    /**----------------------------------------- */
    connection.on("requestedTokens", (data) => this.setState({ tokens: data }));
    connection.on("requestedCulture", (data) =>
      this.setState({ culture: data })
    );
    connection.on("requestedEndpoints", (data) =>
      this.setState({ endpoints: data })
    );
    connection.on("initActivity", (data) =>
      this.setState({ payload: data, type: "activity" })
    );
    connection.on("initActivityRunningHover", (data) =>
      this.setState({ payload: data, type: "activityHover" })
    );
    connection.on("initActivityRunningModal", (data) =>
      this.setState({ payload: data, type: "activityModal" })
    );
    connection.on("requestedSchema", (data) =>
      this.setState({ schema: data.schema })
    );
    connection.on("clickedNext", (data) => this.handleDone());
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
    console.log("in done");
    this.setState(
      (prevState) => {
        prevState.payload.metaData.isConfigured = true;
        prevState.payload = this.props.onSubmit(prevState);

        // prevState.configured =
        //   prevState.payload.arguments.execute.inArguments[0].configured;
        connection.trigger("updateActivity", prevState.payload);
      },
      () => connection.trigger("ready")
    );
  }
  render() {
    console.log("this.props.Children", this.props.children);
    console.log(React.Children.toArray(this.props.children)[0]);
    const renderThis = React.cloneElement(
      React.Children.toArray(this.props.children)[0],
      {
        config: this.state.config,
      }
    );
    return (
      <div
        style={{ padding: "1.5rem 1rem 0px", background: "rgb(244, 246, 249)" }}
      >
        <div className="Activity">{renderThis}</div>
      </div>
    );
  }
}
StepManager.propTypes = {
  children: PropTypes.object,
  onSubmit: PropTypes.func,
};
export default StepManager;
