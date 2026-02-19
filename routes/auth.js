import express from 'express';
import mongoose from 'mongoose';
import User from "../model/User.js";
import { registerValidation } from '../validation.js';

//creating a router instance to define routes
const router = express.Router(); 
 
//register route
router.post('/register', async (req, res) => {
    //validating the request body using the registerValidation function
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //Creating a new user instance with the request body data
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password 

    });

    //checking if the email already exists in the database
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists');
    
    //saving the user to the database
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
    if (err.code === 11000) { //incase of duplicate key error
        const field = Object.keys(err.keyValue)[0]; // gets the field name
        return res.status(400).json({message: `${field} already exists`});
    }
        res.status(500).send("Something went wrong");
    }
});

//router.post('/login', (req, res) => {
// 
//});

export default router;
