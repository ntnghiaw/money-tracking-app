const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Đăng ký tài khoản
router.post('/register', async (req, res) => {
  const { fullname, email, password } = req.body;
  
  // Kiểm tra xem username đã được sử dụng chưa
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ error: 'Username is already taken' });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({fullname,email, password: hashedPassword });

  try {
    await user.save();
    res.status(201).json({ message: 'User registered successfully',user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Tạo và gửi token JWT khi đăng nhập thành công
    const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', { expiresIn: '1h' }); // Thay thế bằng secret key thực tế của bạn và thời hạn của token

    res.status(200).json({ message: 'Login successful', token,user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
