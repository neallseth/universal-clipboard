const { Client } = require("pg");
const requestIp = require("request-ip");

const clientConfig = {
  user: "jezchcpq",
  host: "drona.db.elephantsql.com",
  database: "jezchcpq",
  password: "Itq0PC8O3DZVIC6dxdEcZDai8dkC5LkT",
  port: 5432,
};

export default async (req, res) => {
  const client = new Client(clientConfig);
  await client.connect();

  console.log("req.method: ", req.method);
  const clientIp = requestIp.getClientIp(req);
  console.log("clientIP: ", clientIp);

  let response = {};

  if (req.method === "POST") {
    console.log("post received with the body: ", req.body);
    response = await createRecord(client, req.body.clip_entry, clientIp);
  } else if (req.query.id) {
    response = await getEntryByID(client, req.query.id);
  } else {
    response = await getAllRecords(client);
  }

  await client.end();

  res.statusCode = 200;
  res.json(response);
};

async function getAllRecords(client) {
  const queryRes = await client.query("SELECT * FROM clips");
  return queryRes.rows;
}

async function getEntryByID(client, id) {
  const sql = "SELECT id,clip_entry FROM clips WHERE id = $1";
  const params = [id];

  try {
    const res = await client.query(sql, params);
    return res.rows[0];
  } catch (err) {
    return err.stack;
  }
}

async function createRecord(client, entry, ip) {
  const sql =
    "INSERT INTO clips(clip_entry, created_date, user_ip) VALUES($1, $2, $3)";
  const params = [entry, 123, ip];

  try {
    const res = await client.query(sql, params);
    return { result: "success!" };
  } catch (err) {
    return err.stack;
  }
}
