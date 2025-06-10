const express = require("express");
const { DbConnection, sequelize } = require("./config/database");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.use(express.json());


// Test DB and sync model
sequelize.authenticate()
    .then(() => {
        console.log('✅ Database connected...');
        return sequelize.sync(); // syncs all models
    })
    .then(() => {
        console.log('📦 Models synchronized...');
    })
    .catch(err => console.error('❌ Error: ' + err));



app.get("/", (req, res) => {
  res.send("WELCOME TO FREEMIUM");
});

app.listen(PORT, async () => {
  console.log(`Server is running on ${PORT} `);

  try {
    await DbConnection();
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
});
