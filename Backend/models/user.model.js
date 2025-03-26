import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema= new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique:true},
    password:{type: String, required: true},
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const salt= await bcrypt.genSalt(10); //A "salt" is a random value added to the password before hashing to make it different from other's pass
    this.password = await bcrypt.hash(this.password, salt);//Takes the user's password, adds the salt, and hashes it into a secure, unreadable format and moves for next one
    next();
});

const User= mongoose.model('User', userSchema);

export default User;

/*
Save users in the database.
Find users by their email or ID.
Update user details, like name or password.
*/