const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/config.json", (req, res) => {
  res.status(200).sendFile(__dirname + "/config.json");
  console.log("Sent file config");
  console.log(__dirname);
});
module.exports = router;
