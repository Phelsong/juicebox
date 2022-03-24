require("dotenv").config();
const LOGIN = process.env.DB_login;
console.log(LOGIN);
// inside db/index.js
const { Client } = require("pg"); // imports the pg module

// supply the db name and location of the database
const client = new Client(`postgres://${LOGIN}@localhost:5432/juicebox-dev`);

module.exports = {
  client,
};
