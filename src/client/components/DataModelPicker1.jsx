import React from "react";

import IconSettings from "@salesforce/design-system-react/components/icon-settings";
import Tree from "@salesforce/design-system-react/components/tree";
import log from "@salesforce/design-system-react/utilities/log";

const sampleNodes = {
  0: {
    id: 0,
    nodes: [1, 2],
  },
  1: {
    label: "Grains",
    type: "item",
    id: 1,
  },
  2: {
    label: "Fruits",
    type: "item",
    id: 2,
  },
};

class DataModelPicker1 extends React.Component {
  static displayName = "DemoTree";

  static defaultProps = {
    heading: "Miscellaneous Foods",
    id: "example-tree",
  };

  state = {
    nodes: this.props.nodes || sampleNodes,
    //  searchTerm: this.props.searchable ? "fruit" : undefined,
  };

  getNodes = (node) =>
    node.nodes ? node.nodes.map((id) => this.state.nodes[id]) : [];

  // By default Tree can have multiple selected nodes and folders/branches can be selected. To disable either of these, you can use the following logic. However, `props` are immutable. The node passed in shouldn't be modified. Object and arrays are reference variables.
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

  handleClick = (event, data) => {
    log({
      action: this.props.action,
      customLog: this.props.log,
      event,
      eventName: "Node Selected",
      data,
    });
    if (this.props.multipleSelection) {
      if (
        !this.props.noBranchSelection ||
        (this.props.noBranchSelection && data.node.type !== "branch")
      ) {
        // Take the previous state, expand it, overwrite the `nodes` key with the previous state's `nodes` key expanded with the id of the node just clicked selected
        this.setState((prevState) => ({
          ...prevState,
          nodes: {
            ...prevState.nodes,
            ...{
              [data.node.id]: { ...data.node, selected: data.select },
            },
          },
        }));
      }
    } else if (this.props.noBranchSelection && data.node.type === "branch") {
      // OPEN BRANCH/FOLDER WHEN CLICKED
      // Although not codified in SLDS, this takes the click callback and turns it into the expand callback, and should be used for item only selection.
      this.setState((prevState) => ({
        ...prevState,
        nodes: {
          ...prevState.nodes,
          ...{
            [data.node.id]: { ...data.node, expanded: !data.node.expanded },
          },
        },
      }));
    } else {
      // SINGLE SELECTION
      // Take the previous state, expand it, overwrite the `nodes` key with the previous state's `nodes` key expanded with the id of the node just clicked selected and the previously selected node unselected.
      this.setState((prevState) => {
        // Gaurd against no selection with the following. `selectedNode`
        // is the previously selected "current state" that is about to
        // be updated
        const selectedNode = prevState.selectedNode
          ? {
              [prevState.selectedNode.id]: {
                ...prevState.nodes[prevState.selectedNode.id],
                selected: false,
              },
            }
          : {};
        return {
          ...prevState,
          nodes: {
            ...prevState.nodes,
            ...{
              [data.node.id]: { ...data.node, selected: data.select },
              ...selectedNode,
            },
          },
          selectedNode: data.node,
        };
      });
    }
  };

  handleScroll = (event, data) => {
    log({
      action: this.props.action,
      event,
      eventName: "Tree scrolled",
      data,
    });
  };

  render() {
    return (
      <Tree
        assistiveText={this.props.assistiveText}
        className={this.props.className}
        getNodes={this.props.getNodes || this.getNodes}
        heading={!this.props.noHeading && this.props.heading}
        id={this.props.id}
        listStyle={this.props.listStyle}
        listClassName={this.props.listClassName}
        nodes={this.state.nodes["0"].nodes}
        onExpandClick={this.props.onExpandClick || this.handleExpandClick}
        onClick={this.props.onClick || this.handleClick}
        onScroll={this.props.onScroll || this.handleScroll}
        // searchTerm={this.props.searchTerm || this.state.searchTerm}
      />
    );
  }
}
export default DataModelPicker1;
