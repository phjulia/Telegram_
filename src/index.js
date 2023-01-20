import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Activity from "./Activity";

// class Hello extends React.Component {
//   render() {
//     return (
//       <div>
//         <div>Hello dumb</div>
//         <Activity />
//       </div>
//     );
//   }
// }

ReactDOM.render(<Activity />, document.getElementById("root"));

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<Hello />);

//ReactDOM.render(<Activity />, document.getElementById("test"));
