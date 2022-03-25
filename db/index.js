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

  // id = 1 

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }
  
   
    
  try {
    const { rows : [user]} = await client.query(`
      UPDATE users
      SET ${setString}
      WHERE id= ${id}
      RETURNING *;
    `, Object.values(fields));

// const {rows} = result
// console.log (rows)
console.log(user, 'my user var')
    return user;
  } catch (error) {
    throw error;
  }
}

async function createPost({
  authorId,
  title,
  content
}) {
  try {

  } catch (error) {
    throw error;
  }
}
async function updatePost(id, {
  title,
  content,
  active
}) {
  try {

  } catch (error) {
    throw error;
  }
}

async function getAllPosts() {
  try {

  } catch (error) {
    throw error;
  }
}
async function getPostsByUser(userId) {
  try {
    const { rows } = client.query(`
      SELECT * FROM posts
      WHERE "authorId"=${ userId };
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}
async function getUserById(userId) {
  // first get the user (NOTE: Remember the query returns 
    // (1) an object that contains 
    // (2) a `rows` array that (in this case) will contain 
    // (3) one object, which is our user.
  // if it doesn't exist (if there are no `rows` or `rows.length`), return null

  // if it does:
  // delete the 'password' key from the returned object
  // get their posts (use getPostsByUser)
  // then add the posts to the user object with key 'posts'
  // return the user object
}

module.exports = {
  client,
  getAllUsers,
  createUser,
  updateUser,
};
