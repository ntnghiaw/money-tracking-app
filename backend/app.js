const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");
const walletRoutes = require("./routes/walletRoutes")
const transactionRoutes = require("./routes/transaction");
const categoryRoutes = require('./routes/category');

const app = express();
const { swaggerUi, swaggerDocs } = require('./swaggers/swagger');

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", userRoutes);
app.use("/", walletRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/transaction", transactionRoutes);
app.use("/category", categoryRoutes)


// Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    });
});

module.exports = app;
