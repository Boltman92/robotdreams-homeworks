const { getData, setData } = require("../services");

async function controller(req, res) {
  console.log("CONTROLLER", req.method, req.url, "url");
  if (req.method === "POST" && req.url.startsWith("/kv/")) {
    setData(req, res);
  }

  if (req.method === "GET" && req.url.startsWith("/kv/")) {
    getData(req, res);
    return;
  }
}

module.exports = { controller };
