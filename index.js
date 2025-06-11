const express = require("express");
const { DbConnection, sequelize } = require("./config/database");
const app = express();
require("dotenv").config();
const cors = require('cors')
const bodyParser = require('body-parser');
const router = require("./routes/user");

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(express.json());
app.use(cors())

// Test DB and sync model
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected...");
    return sequelize.sync({ alter: true }); // syncs all models
  })
  .then(() => {
    console.log("📦 Models synchronized...");
  })
  .catch((err) => console.error("❌ Error: " + err));

  app.use('/', router)

app.listen(PORT, async () => {
  console.log(`Server is running on ${PORT} `);

  try {
    await DbConnection();
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
});
