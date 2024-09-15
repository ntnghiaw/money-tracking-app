'use strict'
require('dotenv').config(); 
// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

console.log(process.env.CLOUDINARY_CLOUD_NAME);
// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

// Log the configuration
// console.log(cloudinary.config());

module.exports = cloudinary;