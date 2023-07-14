const express = require("express");
const handler = require("./handler");
const bodyParser = require("body-parser");
const ls = require("local-storage");
// const jsonParser = bodyParser.json();
const randomStr = require("randomstring");
const URL = require("url").URL;
const URLSearchParams = require("url").URLSearchParams;

module.exports = function (fastify, options, next) {
  fastify.get("/telegram/config.json", (req, res) => {
    console.log("test");
    const activityJSON = JSON.stringify(require("./config.json"));
    res.status(200).send(JSON.parse(activityJSON));
  });
  fastify.post("/telegram/save", (req, res) => {
    res.code(200).send({ success: true });
  });
  fastify.get("/telegram/test", (req, res) => {
    res.code(200).send({ success: true });
  });
  /**
   * @description A function that is called after journey has been validated
   */
  fastify.post("/telegram/publish", (req, res) => {
    console.log("In the publish");
    res.code(200).send({ success: true });
  });
  fastify.get("/telegram/login", async (req, res) => {
    console.log("*****************LOGIN******************");
    const tenant = "mcffrcsjyrj1cl3cgq5-96gnk041";
    const u = new URL(
      `https://${tenant}.auth.marketingcloudapis.com/v2/authorize`
    );
    const client_id = "m1babcd7qms023r8ngkt9mg2";
    const random = randomStr.generate();
    req.session.stateToken = random; //reduce the risk of cross-site forgery attack
    //ls.backend(sessionStorage);
    console.log("req session stateToken SESSION", req.session.stateToken);
    console.log("req session  random", random);
    u.search = new URLSearchParams({
      response_type: "code",
      client_id: client_id,
      redirect_uri: `https://${req.hostname}/telegram/response`,
      state: random,
    });
    console.log("u.toString: ", u.toString());
    res.redirect(u.toString()); //TOFIX
  });
  fastify.get("/telegram/response", async (req, res) => {
    const tenant = "mcffrcsjyrj1cl3cgq5-96gnk041";
    const client_id = "m1babcd7qms023r8ngkt9mg2";
    console.log("----------IN RESPONSE---------------");
    console.log("req.query.stateToken SESSION-->", req.session.stateToken);
    console.log("req.query.state-->", req.query.state);

    if (req.session.stateToken == req.query.state) {
      console.log("-------------inside IF");
      req.session.token = await getToken(
        req,
        `https://telegram-6-79bd05dd5fd2.herokuapp.com/response`,
        client_id,
        tenant
      );
      console.log("req.session.token", req.session.token);
      req.session.userInfo = await getUserInfo(req.session.token, tenant);
      //console.log("req.session.userInfo", req.session.userInfo);
    }
    //get user and mid etc
    res.redirect("https://telegram-6-79bd05dd5fd2.herokuapp.com/telegram");
  });
  fastify.get("/telegram", async (req, res) => {
    res.sendFile("/public/index.html");
  });

  /**
   * @description A function that is called on journey validation
   */
  fastify.post("/validate", (req, res) => {
    console.log("in validate");
    res.code(200).send({ success: true });
  });
  /**
   * @description A function that is called on journey activation
   */
  fastify.get("/edit", (req, res) => {
    console.log("----------------------EDIT-------------------");
    const u = new URL("https://telegram-6-79bd05dd5fd2.herokuapp.com/login");
    res.redirect(u.toString());
  });
  /**
   * @description A function that is called on journey activation
   */
  fastify.post("/execute", (req, res) => {
    console.log("in execute");
    console.log(req.body);
    handler.handleExecute(req, res);
  });
  fastify.post("/stop", (req, res) => {
    console.log("in stop");
    res.code(200).send({ success: true });
  });
  fastify.get("/", (req, res) => {
    console.log("-------------HOME----------------");
    //const u = new URL("https://young-dream-1041.fly.dev/auth/login/");
    const u = new URL("https://telegram-6-79bd05dd5fd2.herokuapp.com/login");

    res.redirect(u.toString());
  });
  fastify.get("/running", (req, res) => {
    console.log("in running");
    const u = new URL(
      "https://telegram-6-79bd05dd5fd2.herokuapp.com/auth/login/activityRunning"
    );
    res.redirect(u.toString());
  });

  next();
};
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
