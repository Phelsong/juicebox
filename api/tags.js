const express = require('express');
const tagsRouter = express.Router();
const { getAllTags } = require('../db');
const {requireUser} = require('./utils');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();   
});

tagsRouter.get('/', async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags
  });
});

tagsRouter.post('/tags/route', requireUser, async (req, res, next) => {

});

module.exports = tagsRouter;