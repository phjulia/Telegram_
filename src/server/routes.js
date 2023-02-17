const express = require("express");
const router = express.Router();
const handler = require("./handler");
const path = require("path");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.get("/config.json", (req, res) => {
  res.status(200).sendFile(__dirname + "/config.json");
});
router.post("/save", jsonParser, (req, res) => {
  console.log("in save");
  res.status(200).send({ success: true });
});
/**
 * @description A function that is called after journey has been validated
 */
router.post("/publish", jsonParser, (req, res) => {
  console.log("In the publish");
  res.status(200).send({ success: true });
});
/**
 * @description A function that is called on journey validation
 */
router.post("/validate", jsonParser, (req, res) => {
  console.log("in validate");
  res.status(200).send({ success: true });
});
/**
 * @description A function that is called on journey activation
 */
router.post("/execute", (req, res) => {
  console.log("in execute");
  console.log(req.body);
  handler.handleExecute(req, res);
});
router.post("/stop", jsonParser, (req, res) => {
  console.log("in stop");
  res.status(200).send({ success: true });
});
router.get("/", jsonParser, (req, res) => {
  console.log("home page /");
  //const u = new URL("https://young-dream-1041.fly.dev/auth/login/");
  const u = new URL("https://young-dream-1041.fly.dev");
  res.redirect(u.toString());
});
router.get("/login/index.html", (req, res) => {});
router.get("/running", jsonParser, (req, res) => {
  console.log("in running");
  const u = new URL(
    "https://young-dream-1041.fly.dev/auth/login/activityRunning"
  );
  res.redirect(u.toString());
});

module.exports = router;
