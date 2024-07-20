const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/userModel')


dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

// crete a function to get token
const generateToken = (user) =>{
    const payload = {
        userId: user._id,
        email: user.email,
    };
    return jwt.sign(payload, JWT_KEY, {expiresIn:'1h'});
}

const checkEmailFormat = (email) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const register = async(req, res) =>{
    try{
        const {fullname, email, password} = req.body; // take email and password from body
        const existUser = await User.findOne({email: email});
        if(existUser)
        {
            return res.status(400).json({message: 'User already exist'});
        }
        if (!checkEmailFormat(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        const saltRound = await bcrypt.genSalt(10); //generate salt
        const hashedPassword = await bcrypt.hash(password, saltRound);

        const user = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword,
        })
        console.log(user);
        const newUser = await user.save()
        const token = generateToken(user);
        res.status(201).json({newUser, token: token});
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

const login = async(req, res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({message: "User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Password not match"})
        }

        const token = generateToken(user)
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({message: "Login success", user: user, token: token, userId: user._id})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports ={
    register,
    login,
}