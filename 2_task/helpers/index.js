export function json(res, status, data = null) {
  res.writeHead(status, { "Content-Type": "application/json" });
  if (data) res.end(JSON.stringify(data));
  else res.end();
}

export function bodyJSON(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      try {
        resolve(JSON.parse(raw || "{}"));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}
