import "dotenv/config";
import http from "node:http";
import { router } from "./lib/router.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  router(req, res);
});

server.listen(PORT, () => {
  console.log(`http server listening on http://localhost:${PORT}`);
});
