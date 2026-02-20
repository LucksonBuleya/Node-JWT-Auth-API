import express from 'express';
import verifyToken from '../verifyToken.js';

//creating a router instance to define routes
const router = express.Router();

router.get('/', verifyToken, (req, res) => {
    res.json({
        posts: {
            title: 'my first post',
            description: 'Hello world! This is my first post'
        }
    });
});

export default router;