const mongoose = require('mongoose')

// Validator kiểm tra mật khẩu
const passwordValidator = [
    // {
    //   validator: function(v) {
    //     return /[A-Z]/.test(v); // Ít nhất một chữ in hoa
    //   },
    //   message: 'Password must contain at least one uppercase letter',
    // },
    // {
    //   validator: function(v) {
    //     return /[a-z]/.test(v); // Ít nhất một chữ thường
    //   },
    //   message: 'Password must contain at least one lowercase letter',
    // },
    // {
    //   validator: function(v) {
    //     return /[0-9]/.test(v); // Ít nhất một số
    //   },
    //   message: 'Password must contain at least one digit',
    // },
    // {
    //   validator: function(v) {
    //     return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(v); // Ít nhất một ký tự đặc biệt
    //   },
    //   message: 'Password must contain at least one special character',
    // },
    {
        validator: function(v){
          return v.length >= 8;
        },
        message: "Password must contain at least 8 characters",
      },
  ];

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        // lowercase: true,
        // trim: true,
    },
    password:{
        type: String,
        require: true,
        validate: {
            validator: function(v) {
              return v.length >= 8;
            },
            message: 'Password must be at least 8 characters long',
          },
    },
    fullname: {
      type: String,
      require: true,
    },
    createAt:{
        type: Date,
        default: Date.now,
    },
    dateOfBirth: {
      type: Date,
      default: Date.now, 
    },
    avatarUrl: {
      type: String,
      default: 'https://i.imgur.com/B3Gg2Yj.png',
    },
    wallets: [],
    membership:{
      type: Boolean,
      default: false,
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;