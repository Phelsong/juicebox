const PORT = process.env.PORT || 3000;
const express = require("express");
const server = express();
const apiRouter = require("./api");
const morgan = require("morgan");
const { client } = require("./db");
require("dotenv").config();

client.connect();
server.use(morgan("dev"));
server.use(express.json());
server.use("/api", apiRouter);

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});

// //--------------

// //------------------

// //four parameter needs error, request, response and next, in that order
// //--------------------------------------------------------
// server.use((req, res, next) => {
//   console.log("<____Body Logger START____>");
//   console.log(req.body);
//   console.log("<_____Body Logger END_____>");

//   next();
// });
// //--------------------------------------------------------
// server.get("/background/:color", (req, res, next) => {
//   res.send(`
//     <body style="background: ${req.params.color};">
//       <h1>Hello World</h1>
//     </body>
//   `);
// });

// //--
// // app.use('/api', (req, res, next) => {
// //     console.log("A request was made to /api");
// //     next();
// //   });
// // //---
// // app.get('/api', (req, res, next) => {
// //     console.log("A get request was made to /api");
// //     res.send({ message: "success" });
// // });
