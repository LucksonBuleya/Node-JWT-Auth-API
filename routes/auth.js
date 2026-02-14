import express from 'express';
const router = express.Router();

router.post('/register', (req, res) => {
    // Registration logic here
    res.send('User registered successfully');
});

router.post('/login', (req, res) => {
    
});

export default router;


