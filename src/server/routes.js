const express = require("express");
const router = express.Router();

router.get("/config.json", (req, res) => {
  res.sendFile("./config.json");
});
module.exports = router;
