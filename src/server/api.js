const handler = require("./handler.js");

module.exports = function (fastify, options, next) {
  /**
   * Get Schema definition from Marketing Cloud
   */
  fastify.get("/getSchema", async (req, res) => {
    const schemaReq = await fetch(
      "https://mcdlk9gw05l2xf8vc9l95hqttky4.rest.marketingcloudapis.com/hub/v1/contacts/schema/",
      {
        method: "GET",
        headers: {
          Autorization: `Bearer ${req.session.userInfo.Bearer}`,
          "Content-Type": "application/json",
        },
      }
    );
    const schema = await schemaReq.json();
    if (schemaReq.status != 200) {
      return "An error occured while getting schema";
    }
    return schema;
  });

  /**
   * @description A webhook to get bot updates
   */
  fastify.post("/getUpdates", (req, res) => {
    // "my_chat_member","message"
    const messageType = req.body.message !== undefined ? "message" : "status";
    if (messageType === "message") {
      const messageText = req.body.message.text;
      if (messageText === "/start") {
        handler.subscribeUser(req, res);
      }
    } else {
      const status = req.body.my_chat_member.new_chat_member.status;
      if (status === "kicked") {
      }
    }
  });
  next();
};
