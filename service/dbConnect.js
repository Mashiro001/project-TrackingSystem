const { Client } = require("pg");
const client = new Client({
  user: "postgres",
    host: "203.151.70.147",
    database: "demo_track",
    password: "db@devbackground01",
    port: 5432,
});
client.connect(function (err) {
  if (err) throw err;
});
exports.connection = function () {
  return client;
};
