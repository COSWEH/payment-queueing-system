const { sql, poolPromise } = require("../config/db");

const getLatestQueueNumber = async (req, res) => {
  // console.log("latest foo");
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "SELECT TOP 1 queue_number, name FROM Queue ORDER BY queue_number DESC"
      );

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.json({ queue_number: null });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
};

const getAllQueues = async (req, res) => {
  // console.log("Fetching all queues...");
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
        SELECT q.*, t.window_no
        FROM Queue q
        LEFT JOIN Teller t ON q.teller_id = t.id
        ORDER BY q.queue_number
      `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
};

const createQueue = async (req, res) => {
  console.log("create queue");
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" });
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("queue_number", sql.Int, number)
      .input("name", sql.VarChar, name)
      .input("status", sql.VarChar, "waiting") // Default status
      .query(
        "INSERT INTO Queue (queue_number, name, status, created_at) OUTPUT Inserted.id VALUES (@queue_number, @name, @status, GETDATE())"
      );

    const newQueue = {
      id: result.recordset[0].id,
      queue_number: number,
      name,
      status: "waiting",
    };

    res.status(201).json({
      message: "Queue number created successfully",
      id: newQueue.id,
    });

    const wss = req.app.get("wss");
    if (wss) {
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({ event: "new_queue", data: newQueue }));
        }
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

const updateQueue = async (req, res) => {
  // console.log("update queue");
  const { queue_number, status, teller_id } = req.body;

  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("queue_number", sql.Int, queue_number)
      .input("status", sql.NVarChar, status)
      .input("teller_id", sql.Int, teller_id)
      .query(
        "UPDATE Queue SET status = @status, teller_id = @teller_id  WHERE queue_number = @queue_number"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Queue not found" });
    }

    res.status(200).json({ message: "Queue updated successfully" });
  } catch (err) {
    console.error("Error updating queue:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteQueue = async (req, res) => {
  console.log("delete queue");
};

module.exports = {
  getLatestQueueNumber,
  getAllQueues,
  createQueue,
  updateQueue,
  deleteQueue,
};
