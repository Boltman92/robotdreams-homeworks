const http = require("node:http");
const { controller } = require("./controllers");

http
  .createServer(async (req, res) => {
    controller(req, res);
    res.statusCode = 404;
    res.end("nf");
  })
  .listen(3000, () => console.log("api :3000"));
