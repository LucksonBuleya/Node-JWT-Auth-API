import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

//define the port
const PORT = process.env.PORT || 3000;

//instantiate the express app
const app = express();

//import the auth routes
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';

// middleware
app.use(express.json());

//route middleware
app.use('/api/user', authRoutes);
app.use('/api/posts', postRoutes);

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






