import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const {
            fullName,
            mobileNo,
            email,
            password
        } = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.send("user already exist");
        }

        // hashed password
        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            fullName,
            mobileNo,
            email,
            password:hashedPassword
        });

        await newUser.save();

        res.send("Registration Successful");
    } catch(err) {
        console.log(err);
        res.send("Registration Failed");
    }
});

export default router;  