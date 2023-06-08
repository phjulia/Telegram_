const { getUser } = require("../helpers/db.js");
const db = require("../helpers/db.js");

module.exports = {
  /**
   * @description A function to prepare message payload
   * @param {*} req
   * @returns
   */
  async preparePayload(req) {
    const sf_id = req.body.keyValue;
    const user_id = await db.getUserId(sf_id);
    const message = req.body.inArguments[0].config.message;
    return [user_id, message];
  },
  async getSchema() {
    const response = fetch("/hub/v1/contacts/schema/", (req, res) => {});
  },
};
