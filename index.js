import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

//instantiate the express app
const app = express();

//import the auth routes
import authRoutes from './routes/auth.js';

//route middleware
app.use('/api/user', authRoutes);


//define the port
const PORT = process.env.PORT || 3000;


//connecting to MongoDB using mongoose
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => {
        console.log(`It's alive! The server is running on http://localhost:${PORT}`)
    });
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});


