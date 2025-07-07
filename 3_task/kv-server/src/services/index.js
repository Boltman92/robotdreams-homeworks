const { REDIS_URL } = process.env;

async function getData(req, res) {
  console.log("GET DATA");
  const k = req.url.split("/").pop();
  console.log(k, REDIS_URL, "REDISS");
  const v = await fetch(`${REDIS_URL}/get?key=${k}`).then((r) => r.json());

  console.log(v, k, "GET DATA");

  return res.end(JSON.stringify(v));
}

async function setData(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    const { key, value } = JSON.parse(body);
    const r = await fetch(`${REDIS_URL}/set`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    if (!r.ok) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ error: "Failed to set value" }));
    }
    res.end(JSON.stringify({ ok: true }));
  });
  return;
}

module.exports = { getData, setData };
