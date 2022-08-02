const express = require("express");
const postsRouter = express.Router();
<<<<<<< HEAD
const { getAllPosts } = require("../db");
const { requireUser } = require("./utils");

postsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

postsRouter.get("/", async (req, res) => {
  const posts = await getAllPosts();

  res.send({
    posts,
  });
=======
const {
  getAllPosts
} = require('../db');
const {
  requireUser
} = require('./utils');
//----------------------------------------------------------------
postsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
>>>>>>> 63b5f6ba90a7d4a5f69807b0bfc458f6cf9f385a
});
//----------------------------------------------------------------
postsRouter.get('/', async (req, res) => {
  try {
    const allPosts = await getAllPosts();

<<<<<<< HEAD
postsRouter.post("/", requireUser, async (req, res, next) => {
  res.send({ message: "under construction" });
});

postsRouter.post("/posts/route", requireUser, async (req, res, next) => {
  const { title, content, tags = "" } = req.body;

  const tagArr = tags.trim().split(/\s+/);
  const postData = { authorId, title, content };
=======
    const posts = allPosts.filter(post => {
      // the post is active, doesn't matter who it belongs to
      if (post.active) {
        return true;
      }
      // the post is not active, but it belogs to the current user
      if (req.user && post.author.id === req.user.id) {
        return true;
      }
      // none of the above are true
      return false;
    });
    //return***** 
    res.send({
      posts
    });
    //return^^
  } catch ({
    name,
    message
  }) {
    next({
      name,
      message
    });
  }
});
//----------------------------------------------------------------
postsRouter.post('/', requireUser, async (req, res, next) => {
  res.send({
    message: 'under construction'
  });

});
//----------------------------------------------------------------
postsRouter.post('/posts/route', requireUser, async (req, res, next) => {
  const {
    title,
    content,
    tags = ""
  } = req.body;

  const tagArr = tags.trim().split(/\s+/)
  const postData = {
    authorId,
    title,
    content
  };
>>>>>>> 63b5f6ba90a7d4a5f69807b0bfc458f6cf9f385a

  // only send the tags if there are some to send
  if (tagArr.length) {
    postData.tags = tagArr;
<<<<<<< HEAD
=======


>>>>>>> 63b5f6ba90a7d4a5f69807b0bfc458f6cf9f385a
  }

  try {
    const post = await createPost(postData);
<<<<<<< HEAD

    res.send({ post });
    // add authorId, title, content to postData object
    // const post = await createPost(postData);
    // this will create the post and the tags for us
    // if the post comes back, res.send({ post });
    // otherwise, next an appropriate error object
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = postsRouter;
=======
    res.send({
      post
    })

  } catch ({
    name,
    message
  }) {
    next({
      name,
      message
    });

  }
});
//----------------------------------------------------------------
postsRouter.delete('/:postId', requireUser, async (req, res, next) => {
  try {
    const post = await getPostById(req.params.postId);

    if (post && post.author.id === req.user.id) {
      const updatedPost = await updatePost(post.id, { active: false });

      res.send({ post: updatedPost });
    } else {
      // if there was a post, throw UnauthorizedUserError, otherwise throw PostNotFoundError
      next(post ? { 
        name: "UnauthorizedUserError",
        message: "You cannot delete a post which is not yours"
      } : {
        name: "PostNotFoundError",
        message: "That post does not exist"
      });
    }

  } catch ({ name, message }) {
    next({ name, message })
  }
});
// ----------------------------------------------------------------

// WILD CARD ************
postsRouter.patch('/:postId', requireUser, async (req, res, next) => {
  const {
    postId
  } = req.params;
  const {
    title,
    content,
    tags
  } = req.body;

  const updateFields = {};

  if (tags && tags.length > 0) {
    updateFields.tags = tags.trim().split(/\s+/);
  }

  if (title) {
    updateFields.title = title;
  }

  if (content) {
    updateFields.content = content;
  }

  try {
    const originalPost = await getPostById(postId);

    if (originalPost.author.id === req.user.id) {
      const updatedPost = await updatePost(postId, updateFields);
      res.send({
        post: updatedPost
      })
    } else {
      next({
        name: 'UnauthorizedUserError',
        message: 'You cannot update a post that is not yours'
      })
    }
  } catch ({
    name,
    message
  }) {
    next({
      name,
      message
    });
  }
});
//----------------------------------------------------------------



//----------------------------------------------------------------
module.exports = postsRouter;
>>>>>>> 63b5f6ba90a7d4a5f69807b0bfc458f6cf9f385a
