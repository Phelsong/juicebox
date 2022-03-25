require("dotenv").config();
const LOGIN = process.env.DB_login;

// inside db/index.js
const { Client } = require("pg"); // imports the pg module
const { rows } = require("pg/lib/defaults");

// supply the db name and location of the database
const client = new Client(`postgres://${LOGIN}@localhost:5432/juicebox-dev`);

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username, password, name, location
    FROM users;
  `
  );

  return rows;
}

async function createUser({ username, password, name, location }) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO users(username, password, name, location) 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `,
      [username, password, name, location]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }
    const user = id - 1
    
  try {
    const {rows: [user] } = await client.query(
      `
      UPDATE users ${user}
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `, []);
      Object.values(fields)
    

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  getAllUsers,
  createUser,
  updateUser,
};
