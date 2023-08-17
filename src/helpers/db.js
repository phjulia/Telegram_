//var mysql = require("mysql2");
// var db = mysql
//   .createPool({
//     host: "sql8.freemysqlhosting.net",
//     user: "sql8597753",
//     password: "EwUeCRkCHr",
//     port: 3306,
//     database: "sql8597753",
//   })
//   .promise();
// const appUsersColumns = ["id", "first_name", "salesforce_id", "business_unit"];

// module.exports = {
//   /**
//    * @description A function to retrieve user id from the database using SF Id
//    * @param {String} salesforce_id
//    */
//   async getUserId(salesforce_id) {
//     const [row] = await db.query(
//       "SELECT id FROM appusers WHERE salesforce_id=?",
//       [salesforce_id]
//     );
//     return row[0].id;
//   },

//   /**
//    * @description A function to add a new user to the database
//    * @param {Object} userData
//    */
//   async addAppUser(userData) {
//     await db
//       .promise()
//       .execute(
//         `INSERT INTO appusers(${appUsersColumns}) VALUES(?,?,?,?)`,
//         unpackUser(userData)
//       )
//       .then(() => console.log("Success!"))
//       .catch((err) => {});
//     //.then(db.end());
//   },
// };
// /**
//  * @description A function to unpack user and prepare payload
//  * @param {Object} userAccount
//  * @returns {userAccount} user payload
//  */
// function unpackUser(userAccount) {
//   const userPayload = [];
//   userPayload.push(userAccount.id);
//   userPayload.push(userAccount.first_name);
//   userPayload.push(userAccount.salesforce_id);
//   userPayload.push(userAccount.business_unit);
//   return userPayload;
// }
