const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const userRoutes = require("./routes/userRoutes");
const walletRoutes = require("./routes/walletRoutes")
const app = express();
const { swaggerUi, swaggerDocs } = require('./swaggers/swagger');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", userRoutes);
app.use("/", walletRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
