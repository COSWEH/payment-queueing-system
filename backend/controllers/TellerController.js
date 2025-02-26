const { sql, poolPromise } = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3h" });

  return token;
};

const signupTeller = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if username already exists
    const pool = await poolPromise;

    const existingUser = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM Teller WHERE username = @username");

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new teller record into the database
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashedPassword)

      .query(
        "INSERT INTO Teller (username, password) OUTPUT Inserted.id VALUES (@username, @password)"
      );

    res.status(201).json({
      message: "Signup Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

const loginTeller = async (req, res) => {
  const { username, password, window_no } = req.body;

  if (!username || !password || !window_no) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const pool = await poolPromise;
    const userResult = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM Teller WHERE username = @username");

    if (userResult.recordset.length === 0) {
      return res.status(400).json({ error: "Username does not exist" });
    }

    const user = userResult.recordset[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    if (String(user.window_no).trim() === String(window_no).trim()) {
      const token = createToken(user.id);

      return res.status(200).json({
        token,
        id: user.id,
        username: user.username,
        window_no: user.window_no,
      });
    }

    const windowCheckResult = await pool
      .request()
      .input("window_no", sql.Int, window_no)
      .query("SELECT * FROM Teller WHERE window_no = @window_no");

    if (windowCheckResult.recordset.length > 0) {
      return res
        .status(400)
        .json({ error: `Window No ${window_no} is already occupied` });
    }

    await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("window_no", sql.Int, window_no)
      .query(
        "UPDATE Teller SET window_no = @window_no WHERE username = @username"
      );

    const token = createToken(user.id);

    return res.status(200).json({
      token,
      id: user.id,
      username: user.username,
      window_no: user.window_no,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

const logoutTeller = async (req, res) => {
  const { id } = req.body;
  
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("UPDATE Teller SET window_no = NULL WHERE id = @id");

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred during logout" });
  }
};

const checkWindowNoAvailability = async (req, res) => {
  const { window_no } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("window_no", sql.Int, window_no)
      .query("SELECT * FROM Teller WHERE window_no = @window_no");

    const isAvailable = result.recordset.length === 0;

    res.status(200).json({
      isAvailable,
      message: isAvailable ? "Available" : "Occupied",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while checking window availability" });
  }
};

module.exports = {
  signupTeller,
  loginTeller,
  logoutTeller,
  checkWindowNoAvailability,
};
