// db.js
const sql = require("mssql");

const config = {
  user: "test",
  password: "1234",
  server: "OOAP\\SQLEXPRESS",
  database: "PaymentQueueDB",
  options: {
    instanceName: "SQLEXPRESS",
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  port: 1433,
  connectionTimeout: 15000,
  requestTimeout: 15000,
};

const poolPromise = sql
  .connect(config)
  .then((pool) => {
    console.log("Connected to the database");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });

module.exports = {
  sql,
  poolPromise,
};
