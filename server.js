const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

const authRoutes = require('./routes/authApi');

app.use('/', authRoutes);

app.listen(5000, ()=>{
  console.log('Node api app is running on port 5000' )
})


