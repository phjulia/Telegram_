import React, { Component } from "react";
import PropTypes from "prop-types";
import Tree from "@salesforce/design-system-react/components/tree";
import log from "@salesforce/design-system-react/utilities/log";

const elements = {
  0: {
    id: 0,
    nodes: [1, 2],
  },
  1: {
    label: "Journey Data",
    type: "item",
    id: 1,
  },
  2: {
    label: "Contact Data",
    type: "item",
    id: 2,
  },
};
class DataModelPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: this.props.nodes || elements,
    };
    this.getSchema = this.getSchema.bind(this);
  }
  async componentDidMount() {
    const schema = await this.getSchema();
  }
  async getSchema() {
    console.log("---------------IN GET SCHEMA-------------");
    const schema = await fetch("/getSchema");
    console.log(schema);
    return schema;
  }
  getNodes = (node) =>
    node.nodes ? node.nodes.map((id) => this.state.nodes[id]) : [];

  handleExpandClick = (event, data) => {
    log({
      action: this.props.action,
      customLog: this.props.log,
      event,
      eventName: "Expand Branch",
      data,
    });
    const selected = data.select ? true : data.node.selected;
    this.setState((prevState) => ({
      ...prevState,
      nodes: {
        ...prevState.nodes,
        ...{
          [data.node.id]: {
            ...data.node,
            expanded: data.expand,
            selected,
          },
        },
      },
    }));
  };
  handleClick = (event, data) => {};
  render() {
    return (
      <div>
        <Tree
          assistiveText="testtt"
          className={this.props.className}
          getNodes={this.props.getNodes || this.getNodes}
          heading="heading"
          id="example-tree"
          listStyle={this.props.listStyle}
          listClassName={this.props.listClassName}
          nodes={this.state.nodes["0"].nodes}
          onExpandClick={this.handleExpandClick}
          onClick={this.props.onClick || this.handleClick}
        />
      </div>
    );
  }
}
DataModelPicker.propTypes = {
  getNodes: PropTypes.func,
  onExpandClick: PropTypes.func,
  onClick: PropTypes.func,
  listStyle: PropTypes.object,
  listClassName: PropTypes.object,
  className: PropTypes.object,
};
export default DataModelPicker;
