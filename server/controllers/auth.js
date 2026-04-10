import User from './../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';

dotenv.config();

const getSignUp = async(req, res) => {
    const { name, email, password, mobile, city, country } = req.body;


    if(!name) {
    return res.json({
        success: false,
        message: 'Name is required',
        data: null
    });
}

if(!email) {
    return res.json({
        success: false,
        message: 'Email is required',
        data: null
    });
}

if(!password) {
    return res.json({
        success: false,
        message: 'Password is required',
        data: null
    });
}

const existingUser = await User.findOne({email});

if(existingUser) {
    return res.json({
        success: false,
        message: 'User with this email already exists',
        data: null
    });
}

    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt); 

    const newUser = new User({
        name,
        email,
        password:encryptedPassword,
        mobile,
        city,
        country,
    });
 

    try {
        const savedUser = await newUser.save();
        return res.json({
            success: true,
            message: 'User registered successfully', 
            data: savedUser 
        });
    } catch (error) {
        return res.json({
            success: false,
            message: `user registration failed : ${error.message}`,
            data: null
        });
    }               
};

const getLogin = async(req, res) => {
    const {email,password} = req.body;

    if(!email) {
        return res.json({
            success: false,
            message: 'Email is required',
            data: null
        });
    }

    if(!password) {
        return res.json({
            success: false,
            message: 'Password is required',
            data: null
        });
    }

    const existingUser = await User.findOne({email});

    if(!existingUser) {
        return res.json({
            success: false,
            message: 'user with this email does not exist, please sign up',
            data: null
        });
    }

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);

    existingUser.password = undefined;

    if(isPasswordValid) {
        const jwtToken = jwt.sign(
            {   id: existingUser._id,
                email: existingUser.email
            }, 
            process.env.JWT_SECRET, 
            {expiresIn: '1h'}
        );
        return res.json({
            success: true,
            message: 'Login successful',
            data: existingUser,
            jwttoken: jwtToken  
        });
    }else {
        return res.json({
            success: false,
            message: 'Invalid email or password',
            data: null
        });
    }


};

export { getSignUp, getLogin };