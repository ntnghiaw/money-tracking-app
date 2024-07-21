const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const connectDatabase = require('./config/database');

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});