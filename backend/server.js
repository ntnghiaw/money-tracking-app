// server.js

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// authenticateToken middleware
const {authenticateToken} = require('./middleware/authMiddleware.js');

const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.js');
const transactionRoutes = require('./routes/transaction.js')
const walletRoutes = require('./routes/wallet.js')
const userRoutes = require('./routes/user.js')

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.use(express.json())

app.use(cors());

app.use('/api/', authRoutes);
app.use('/api/', authenticateToken)
app.use('/api/transaction', transactionRoutes);
app.use('/api/wallets', walletRoutes)
app.use('/api/user', userRoutes)

app.listen(5000, ()=>{
  console.log('Node api app is running on port 5000')
})


// connect to mongodb
mongoose.connect(`mongodb+srv://${process.env.MONGODB_CONNECT_STRING}`)
.then(()=>{
  console.log('connected to MongoDB')
}).catch((error)=>{
  console.log(error)
})