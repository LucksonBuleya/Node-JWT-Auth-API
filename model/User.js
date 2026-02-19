import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        min: [3, "Name must be at least 3 characters long"],
        max: 255 
    },
    email: {
         type: String, 
         required: true, 
         unique: true,
         max: 255,
         min: 6 
    },
    password: { 
        type: String, 
        required: true,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });


//export the User model
export default mongoose.model('User', userSchema);