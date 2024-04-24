const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  fullname:{
    type: String,
    required: true,
  },
  date:{
    type: String,
    default:'none',
  },
  gender:{
    type: String,
    default:'none',

  },
  phone:{
    type: String,
    default:'none',

  },
  avatar:{
    type: String,
    default:'https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg',

  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
  // Thêm các trường thông tin khác cần thiết
});

// Hash mật khẩu trước khi lưu vào database


module.exports = mongoose.model('User', userSchema);
