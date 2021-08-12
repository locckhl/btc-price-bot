const express = require("express");
const server = express();

server.all("/", (req, res) => {
  res.send("ok");
});

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is ready!!" + Date.now());
  });
}

module.exports = keepAlive;
