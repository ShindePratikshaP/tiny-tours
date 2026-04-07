import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import User from './models/user.js';
import bcrypt from 'bcryptjs';    
import e from 'express';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Tiny Tours API'});
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.post('/signup', async(req, res) => {
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
});


app.post('/login', async(req, res) => {
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

    if(!isPasswordValid) {
        return res.json({
            success: false,
            message: 'Invalid email or password',
            data: null
        });
    }else {
        return res.json({
            success: true,
            message: 'Login successful',
            data: existingUser
        });
    }


});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  connectDB();
});