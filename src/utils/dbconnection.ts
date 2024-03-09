import mysql from "mysql2/promise";

// Create the connection pool. The pool-specific settings are the defaults
export const pool = mysql.createPool({
  host: process.env.DB_URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "coffees",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export async function test() {
  try {
    const result = await pool.query("SELECT * from `Coffees`");
    console.log("result", result);
  } catch (error) {
    console.log("error", error);
  }
}
