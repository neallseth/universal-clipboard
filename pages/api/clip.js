const { Client } = require("pg");
const requestIp = require("request-ip");
require("dotenv").config();

const clientConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
};

export default async (req, res) => {
  const client = new Client(clientConfig);
  await client.connect();

  const clientIp = requestIp.getClientIp(req);
  console.log("clientIP: ", clientIp);

  let response = {};

  if (req.method === "POST" && req.body.clip_entry) {
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
  const d = new Date();
  const date = d.toDateString();
  const time = d.toLocaleTimeString();
  const creationDate = date + " - " + time;

  const sql =
    "INSERT INTO clips(clip_entry, created_date, user_ip) VALUES($1, $2, $3) RETURNING *";
  const params = [entry, creationDate, ip];

  try {
    const res = await client.query(sql, params);
    return res.rows;
  } catch (err) {
    return err.stack;
  }
}
