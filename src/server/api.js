const express = require("express");
const router = express.Router();
const handler = require("./handler.js");

/**
 * Get Schema definition from Marketing Cloud
 */
router.get("/getSchema", async (req, res) => {
  const schema = await fetch("/hub/v1/contacts/schema/", {
    method: "GET",
    headers: {
      Autorization: `Bearer ${req.session.userInfo.Bea}`,
      "Content-Type": "application/json",
    },
  });
  console.log("Request session user INFO", req.session.userInfo);
  return "test";
});
/**
 * @description A webhook to get bot updates
 */
router.post("/getUpdates", (req, res) => {
  // "my_chat_member","message"
  console.log("----------------------------------------------");
  console.log("in /start req.body", req.body);
  const messageType = req.body.message !== undefined ? "message" : "status";
  if (messageType === "message") {
    const messageText = req.body.message.text;
    console.log("*****************messageText", messageText);
    if (messageText === "/start") {
      handler.subscribeUser(req, res);
    }
  } else {
    const status = req.body.my_chat_member.new_chat_member.status;
    if (status === "kicked") {
      console.log("------------New status: ", status);
    }
  }
  console.log("----------------------------------------------");
});

module.exports = router;
