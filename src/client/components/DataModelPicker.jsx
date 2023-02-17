import React, { Component } from "react";
import Tree from "@salesforce/design-system-react/components/tree";

class DataModelPicker extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  getElements() {
    const elements = {
      //   0: {
      //     id: 0,
      //     nodes: [1, 2, 3, 5],
      //   },
      1: {
        label: "Journey Data",
        type: "branch",
      },
      2: {
        label: "Contact Data",
        type: "branch",
      },
    };
    return elements;
  }
  render() {
    return <Tree nodes={this.getElements()} />;
  }
}
export default DataModelPicker;
