const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');
const {requireUser} = require('./utils');


//----------------------------------------------------------------
tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();   
});
//----------------------------------------------------------------
tagsRouter.get('/', async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags
  });
});

tagsRouter.post('/tags/route', requireUser, async (req, res, next) => {

});
//----------------------------------------------------------------





//----------------------------------------------------------------
tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  // read the tagname from the params
  const {tagName} = req.params

console.log(tagName)
  try {
    const postsWithTag = await getPostsByTagName(tagName);
    res.send({posts: postsWithTag});
    // use our method to get posts by tag name from the db
    // send out an object to the client { posts: // the posts }
  } catch ({ name, message }) {
    next({ name, message });
  }
});
//----------------------------------------------------------------

module.exports = tagsRouter;