import express from 'express';
import mongoose from 'mongoose';
import User from "../model/User.js";

//creating a router instance to define routes
const router = express.Router(); 

//register route
router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password 

    });

    //saving the user to the database
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', (req, res) => {
    
});

export default router;


