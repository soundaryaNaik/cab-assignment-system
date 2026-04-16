const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// ✅ IMPORTANT: middleware (fixes most errors)
app.use(cors());
app.use(express.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "cab_system",
});

db.connect((err) => {
  if (err) {
    console.log("❌ MySQL Connection Failed:");
    console.log(err.message);
  } else {
    console.log("✅ MySQL Connected");
  }
});


// ===============================
// 🚗 ADD DRIVER API
// ===============================
app.post("/drivers", (req, res) => {
  const { name, location } = req.body;

  if (!name || location === undefined) {
    return res.status(400).json({ message: "Missing name or location" });
  }

  db.query(
    "INSERT INTO drivers (name, location, is_available) VALUES (?, ?, true)",
    [name, location],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      }

      res.json({
        message: "Driver added successfully",
        driverId: result.insertId,
      });
    }
  );
});


// ===============================
// 🚕 REQUEST RIDE API
// ===============================
app.post("/ride", (req, res) => {
  const { user_location } = req.body;

  if (user_location === undefined) {
    return res.status(400).json({ message: "Missing user_location" });
  }

  db.query(
    "SELECT * FROM drivers WHERE is_available = true",
    (err, drivers) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      }

      if (drivers.length === 0) {
        return res.json({ message: "No drivers available" });
      }

      let nearestDriver = null;
      let minDistance = Infinity;

      drivers.forEach((driver) => {
        const distance = Math.abs(driver.location - user_location);

        if (distance < minDistance) {
          minDistance = distance;
          nearestDriver = driver;
        }
      });

      // save ride
      db.query(
        "INSERT INTO rides (user_location, driver_id, status) VALUES (?, ?, 'assigned')",
        [user_location, nearestDriver.id]
      );

      // update driver
      db.query(
        "UPDATE drivers SET is_available = false WHERE id = ?",
        [nearestDriver.id]
      );

      res.json({
        message: "Driver assigned",
        driver: nearestDriver,
        distance: minDistance,
      });
    }
  );
});


// ===============================
// 🚀 START SERVER
// ===============================
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});