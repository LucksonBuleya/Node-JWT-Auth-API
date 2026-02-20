import express from 'express';
import mongoose from 'mongoose';
import User from "../model/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginValidation, registerValidation } from '../validation.js';


//creating a router instance to define routes
const router = express.Router(); 
 
//register route
router.post('/register', async (req, res) => {
    //validating the request body using the registerValidation function
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    

    //checking if the email already exists in the database
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists');
    
    //Hashing the password before saving the user to the database
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Creating a new user instance with the request body data
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword 
    });


    //saving the user to the database
    try {
        const savedUser = await user.save();
        //in a real application, you wouldn't want to send the entire user object back to the client, 
        // especially not the password. 
        // You might want to send an id or a token instead. But for demonstration purposes, we'll send the saved user object back.
        res.send(savedUser);
    }catch(err){
    if (err.code === 11000) { //incase of duplicate key error
        const field = Object.keys(err.keyValue)[0]; // gets the field name
        return res.status(400).json({message: `${field} already exists`});
    }
        res.status(500).send("Something went wrong");
    }
});

//Login
router.post('/login', async (req, res) => {

    //validating the request body using the loginValidation function
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

        //checking if the email already exists in the database
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Email is not found');

        //Password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid password')

        //Create and assign a token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
});

export default router;
