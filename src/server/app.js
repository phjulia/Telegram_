const express = require("express");
const app = express();
const path = require("path");
app.get("/", async (req, res) => {
  res.sendFile("index.html", { root: "./src/client" });
});

app.listen(8080, "0.0.0.0", (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server running on post: ", 8080);
});
