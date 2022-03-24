// inside db/index.js
const { Client } = require('pg'); // imports the pg module

// supply the db name and location of the database
const client = new Client('//localhost:5433/juicebox-dev');

module.exports = {
  client,
}