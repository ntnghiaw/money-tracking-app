// server.js

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const dotenv = require('dotenv');
const authRoutes = require('./routes/user.js');
const transactionRoutes = require('./routes/transaction.js')

// dotenv.config();
const app = express();
app.use(bodyParser.json());

app.use(express.json())

app.use(cors());

app.use('/', authRoutes);
app.use('/transaction', transactionRoutes);

app.listen(5000, ()=>{
  console.log('Node api app is running on port 5000')
})


// connect to mongodb
mongoose.connect('mongodb+srv://phanhoangphuc03111:phuc1755@cluster0.b576f71.mongodb.net/DO-AN?retryWrites=true&w=majority')
.then(()=>{
  console.log('connected to MongoDB')
}).catch((error)=>{
  console.log(error)
})