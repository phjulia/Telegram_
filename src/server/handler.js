// const bodyParser = require("body-parser");
// const jsonParser = bodyParser.json();
const mysql = require("../helpers/db.js");
const utils = require("../helpers/utils.js");
const fetch = require("node-fetch");

// const { subscribe } = require("./routes");f

module.exports = {
  async handleExecute(req, res) {
    const sf_id = req.body.keyValue;
    const payload = await utils.preparePayload(req);
    console.log("** in handleExecute ", payload);
    await this.sendOutboundMessage(payload);
    this.sendSuccessfullResponse(req, res);
  },
  async sendOutboundMessage(payload) {
    const [user_id, message] = payload;
    try {
      console.log(user_id);
      const response = await this.sendMessage(user_id, message);
      //insert in db etc data extension
      return response;
    } catch (err) {
      console.error(err.message);
    }
  },
  async sendSuccessfullResponse(req, res) {
    res.status(200).send({ success: true });
  },
  async subscribeUser(req, res) {
    let userId;
    let firstName;
    let salesforceId;
    let bu;
    try {
      console.log("req.body", req.body);
      userId = req.body.message.from.id;
      firstName = req.body.message.from.first_name;
      salesforceId = "test1";
      bu = "test2";
      const user = createNewUser(userId, firstName, salesforceId, bu);
      console.log(user);
      //await mysql.addAppUser(user);
      const message = `Dear ${firstName}, welcome to Marketing Cloud bot ❤️!`;
      await this.sendMessage(userId, message);
      this.sendSuccessfullResponse(req, res); //?
    } catch (err) {
      console.error(err); //TODO improve error logging
    }
  },
  /**
   * @description Send a message
   * @param {String} client_id id of the person who should receive the message
   * @param {String} message text message
   */
  async sendMessage(user_id, message) {
    const bodyPayload = {
      chat_id: user_id,
      text: message,
    };
    try {
      const response = await fetch(
        "https://api.telegram.org/bot5967919707:AAF8va9pvxwpS7n3orQcNhiK0yV7EGa_5bw/sendMessage",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyPayload),
        }
      );
      const responseJson = await response.json();
      if (responseJson.status != 0) throw new Error(response.message);
      else return responseJson;
    } catch (ex) {
      console.log(ex);
      //log error
    }

    // https://api.telegram.org/bot5967919707:AAF8va9pvxwpS7n3orQcNhiK0yV7EGa_5bw/sendMessage?chat_id=-1001820657988&text=hello%20friend
    //https://api.telegram.org/bot5967919707:AAF8va9pvxwpS7n3orQcNhiK0yV7EGa_5bw/sendMessage
    //chat_id=12345&text=hello%20friend
  },

  async getPayload(request) {
    //request.body.inArguments[0].config.message
    //console.log(request.)
  },
};
/**
 *
 * @param {String} userId User ID
 * @param {String} firstName First Name
 * @param {String} salesforceId Contact Salesforce ID
 * @param {String} bu Business Unit
 * @returns {Object} User account json
 */
function createNewUser(userId, firstName, salesforceId, bu) {
  return {
    id: userId,
    first_name: firstName,
    salesforce_id: salesforceId,
    business_unit: bu,
  };
}
