const express = require("express");
const router = express.Router();
const handler = require("./handler");
const bodyParser = require("body-parser");
const ls = require("local-storage");
const jsonParser = bodyParser.json();
const randomStr = require("randomstring");
const URL = require("url").URL;
const URLSearchParams = require("url").URLSearchParams;

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
router.get("/login", (req, res) => {
  console.log("*****************LOGIN******************");
  const tenant = "mcffrcsjyrj1cl3cgq5-96gnk041";
  const u = new URL(
    `https://${tenant}.auth.marketingcloudapis.com/v2/authorize`
  );
  const client_id = "m1babcd7qms023r8ngkt9mg2";
  const random = randomStr.generate();
  req.session.stateToken = random; //reduce the risk of cross-site forgery attack
  //ls.backend(sessionStorage);
  ls.set("stateToken", random);
  console.log("req session stateToken SESSION", req.session.stateToken);
  u.search = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    redirect_uri: `https://${req.hostname}/response`,
    state: random,
  });
  res.redirect(u.toString()); //TOFIX
});
router.get("/response", async (req, res) => {
  const tenant = "mcffrcsjyrj1cl3cgq5-96gnk041";
  const client_id = "m1babcd7qms023r8ngkt9mg2";
  console.log("local storage stateToken-->", ls.get("stateToken"));
  console.log("req.query.stateToken SESSION-->", req.session.stateToken);
  console.log("req.query.state-->", req.query.state);
  console.log("----------IN RESPONSE---------------");
  if (ls.get("stateToken") == req.query.state) {
    console.log("-------------inside IF");
    req.session.token = await getToken(
      req.query.state,
      `https://young-dream-1041.fly.dev/response`,
      client_id,
      tenant
    );
    console.log("req.session.token", req.session.token);
    req.session.userInfo = await getUserInfo(req.session.token, tenant);
    console.log("req.session.userInfo", req.session.userInfo);
  }
  //get user and mid etc
  res.redirect("https://young-dream-1041.fly.dev/");
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
router.get("/edit", (req, res) => {
  console.log("----------------------EDIT-------------------");
  console.log("req.session.dummy--->", req.session.dummy);
  const u = new URL("https://young-dream-1041.fly.dev/login");
  res.redirect(u.toString());
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
  console.log("-------------HOME----------------");
  //const u = new URL("https://young-dream-1041.fly.dev/auth/login/");
  const u = new URL("https://young-dream-1041.fly.dev/login");

  res.redirect(u.toString());
});
router.get("/running", jsonParser, (req, res) => {
  console.log("in running");
  const u = new URL(
    "https://young-dream-1041.fly.dev/auth/login/activityRunning"
  );
  res.redirect(u.toString());
});
const getUserInfo = async (token, tenant) => {
  try {
    return await fetch(
      `https://${tenant}.auth.marketingcloudapis.com/v2/userinfo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((result) => result.json());
  } catch (ex) {
    console.error("auth/getToken Failed to get user info from MC", ex);
  }
};
const getToken = async (request, redirect_uri, client_id, tenant) => {
  console.log("in getToken request:", request.query.code);
  console.log("in getToken redirect: ", redirect_uri);
  console.log("in getToken client_id: ", client_id);
  console.log("in getToken tenant: ", tenant);
  try {
    const token = await fetch(
      `https://${tenant}.auth.marketingcloudapis.com/v2/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "authorization_code",
          client_id: client_id,
          code: request.query.code,
          redirect_uri: redirect_uri,
        }),
      }
    );
    console.log("token-->", token);
    const json = await token.json();
    console.log("json-->", json);
    return json.access_token;
  } catch (ex) {
    console.error(ex.message);
  }
};
module.exports = router;
