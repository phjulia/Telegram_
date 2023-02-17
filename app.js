const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "./build")));
app.use(express.static("public"));
// app.get("/", function (req, res, next) {
//   res.render("public/index.html");
// });
// app.get("/", async (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, "../build"), "index.html");
// });
app.use(bodyParser.json());
app.use(require("./src/server/routes"));
app.use(require("./src/server/api"));
app.listen(8080, "0.0.0.0", (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server running on post: ", 8080);
});
