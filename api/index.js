const express = require("express");
const apiRouter = express.Router();
const postsRouter = require("./posts");
const tagsRouter = require("./tags");
const usersRouter = require("./users");
const { getUserById } = require("../db");
const { requireUser } = require("./utils");
console.log("This is owner by ID: ", getUserById);

//----------------------------------------------------------------
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env; // Never store your secret in a file
//----------------------------------------------------------------

//----------------------------------------------------------------
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});
//----------------------------------------------------------------
apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});
//-------------------------------------------
apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/tags", tagsRouter);
//----------------------------------------------------------------

apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

// Router.post('/some/route', requireUser, async (req, res, next) => {

// });

module.exports = apiRouter;
