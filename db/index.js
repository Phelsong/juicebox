require("dotenv").config();
const LOGIN = process.env.DB_login;

// inside db/index.js
const { Client } = require("pg"); // imports the pg module
const { rows, password, user } = require("pg/lib/defaults");

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
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id= ${id}
      RETURNING *;
    `,
      Object.values(fields)
    
    )

    return user;
  } catch (error) {
    throw error;
  }
}

async function createPost({ authorId, title, content }) {
  
  try {
    const { rows } = await client.query(
      `
      INSERT INTO posts ( "authorId",
        title,
        content) 
      VALUES($1, $2, $3) 
        
    `,
      [authorId, title, content]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function updatePost(id, fields = { }) {
  
  const setString = Object.keys(fields).map((key, contentQuery) => `"${key}"=$${contentQuery + 1}`).join(", ");

// return early if this is called without fields
if (setString.length === 0) {
  return;
}

  try {
    const { rows } = await client.query(`
      UPDATE posts
      SET ${setString}
      WHERE "authorId"= ${ id }
      RETURNING *;
        `,
        Object.values(fields)
        );
        return rows
      }
      catch (error) {
        throw error;
      }
            
    }
  
    
  
  async function getAllPosts() {
      const {rows : posts} = await client.query (
      `SELECT * FROM posts`
      )
      return posts 
       
    }
        
       
       
 async function getPostsByUser(userId) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM posts
      WHERE "authorId"=${ userId };
    `);

    return rows;
  } catch (error) {
    throw error;
  }
 }

async function getUserById(userId) {


  try {
    const { rows : user } = await client.query(`
    SELECT (username, name, location, active) FROM users
    WHERE id=${ userId };
    `)
                
    user[0].posts = await getPostsByUser(userId)
  
return user
  } catch (error) { return null;}


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
  createPost,
  updatePost, 
  getAllPosts,
  getPostsByUser,
  getUserById,
};
