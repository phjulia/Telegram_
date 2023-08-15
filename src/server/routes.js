const express = require("express");
const handler = require("./handler");
const bodyParser = require("body-parser");
const ls = require("local-storage");
const fetch = require("node-fetch");
// const jsonParser = bodyParser.json();
const randomStr = require("randomstring");
const URL = require("url").URL;
const URLSearchParams = require("url").URLSearchParams;

module.exports = function (fastify, options, next) {
  fastify.get("/config.json", (req, res) => {
    const activityJSON = JSON.stringify(require("./config.json"));
    res.status(200).send(JSON.parse(activityJSON));
  });
  fastify.post("/save", (req, res) => {
    res.code(200).send({ success: true });
  });
  /**
   * @description A function that is called after journey has been validated
   */
  fastify.post("/publish", (req, res) => {
    console.log("In the publish");
    res.code(200).send({ success: true });
  });
  fastify.get("/login", async (req, res) => {
    const tenant = "mcdlk9gw05l2xf8vc9l95hqttky4";
    const u = new URL(
      `https://${tenant}.auth.marketingcloudapis.com/v2/authorize`
    );
    const client_id = "chdjz4dmxn7upfelzxecyy6q";
    const random = randomStr.generate();
    req.session.stateToken = random; //reduce the risk of cross-site forgery attack
    //ls.backend(sessionStorage);
    u.search = new URLSearchParams({
      response_type: "code",
      client_id: client_id,
      redirect_uri: `https://${req.hostname}/response`,
      state: random,
    });
    res.redirect(u.toString());
  });
  fastify.get("/response", async (req, res) => {
    const tenant = "mcdlk9gw05l2xf8vc9l95hqttky4";
    const client_id = "chdjz4dmxn7upfelzxecyy6q";

    if (req.session.stateToken == req.query.state) {
      req.session.token = await getToken(
        req,
        `https://telegram-mn8c.onrender.com/response`,
        client_id,
        tenant
      );
      req.session.userInfo = await getUserInfo(req.session.token, tenant);
    }
    //get user and mid etc
    res.redirect("https://telegram-mn8c.onrender.com/");
  });
  fastify.get("/", (req, res) => {
    res.sendFile("index.html");
  });

  /**
   * @description A function that is called on journey validation
   */
  fastify.post("/validate", (req, res) => {
    handler.handleExecute(req, res);
    res.code(200).send({ success: true });
  });
  /**
   * @description A function that is called on journey activation
   */
  fastify.get("/edit", async (req, res) => {
    const u = new URL("https://telegram-mn8c.onrender.com/login");
    res.redirect(u.toString());
  });
  /**
   * @description A function that is called on journey activation
   */
  fastify.post("/execute", (req, res) => {
    console.log("*****************************************in execute");
    //handler.handleExecute(req, res);
    res.code(200).send({ success: true });
  });
  fastify.post("/stop", (req, res) => {
    res.code(200).send({ success: true });
  });
  fastify.get("/running", (req, res) => {
    const u = new URL(
      "https://telegram-mn8c.onrender.com/auth/login/activityRunning"
    );
    res.redirect(u.toString());
  });
  next();
};
const getUserInfo = async (token, tenant) => {
  try {
    const userInfoReq = await fetch(
      `https://${tenant}.auth.marketingcloudapis.com/v2/userinfo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userInfo = await userInfoReq.json();
    return userInfo;
  } catch (ex) {
    console.error("auth/getToken Failed to get user info from MC", ex);
  }
};
const getToken = async (request, redirect_uri, client_id, tenant) => {
  try {
    const token = await fetch(
      `https://mcdlk9gw05l2xf8vc9l95hqttky4.auth.marketingcloudapis.com/v2/token`,
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
    const json = await token.json();
    return json.access_token;
  } catch (ex) {
    console.error(ex.message);
  }
};
