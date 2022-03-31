const PORT = 3000;
const express = require('express');
const server = express();
const apiRouter = require('./api');
server.use('/api', apiRouter);
const morgana = require('morgan');
server.use(morgana('dev'));
server.use(express.json())
const { client } = require('./db');
const jwt = require('jsonwebtoken');


client.connect();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});

//--------------

//------------------










//four parameter needs error, request, response and next, in that order
//--
server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });
//--
// app.use('/api', (req, res, next) => {
//     console.log("A request was made to /api");
//     next();
//   });
// //---
// app.get('/api', (req, res, next) => {
//     console.log("A get request was made to /api");
//     res.send({ message: "success" });
// });

