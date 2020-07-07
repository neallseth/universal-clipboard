const { Client } = require("pg");

const clientConfig = {
  user: "jezchcpq",
  host: "drona.db.elephantsql.com",
  database: "jezchcpq",
  password: "Itq0PC8O3DZVIC6dxdEcZDai8dkC5LkT",
  port: 5432,
};

export default async (req, res) => {
  const client = new Client(clientConfig);

  let response;
  if (req.method === "POST") {
    console.log("post received with the body: ", req.body);
  } else if (req.query.id) {
    response = await getEntryByID(client, req.query.id);
  } else {
    response = await getAllRecords(client);
  }
  res.statusCode = 200;
  res.json(response);
};

async function getAllRecords(client) {
  await client.connect();
  const queryRes = await client.query("SELECT * FROM clips");
  await client.end();

  return queryRes.rows;
}

async function getEntryByID(client, id) {
  await client.connect();

  const sql = "SELECT id,clip_entry FROM clips WHERE id = $1";
  const params = [id];

  console.log("id: ", id);

  try {
    const res = await client.query(sql, params);
    console.log(res.rows);
    await client.end();
    return res.rows[0];
  } catch (err) {
    await client.end();
    console.log(err.stack);
    return err.stack;
  }
}
