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

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        // find User
        const user = await User.findOne({email});

        // user not found

        if(!user) {
            return res.send("User not found");
        }

        // compare pass
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch) {
            return res.send("Invalid Credentials");
        }
        // 

        req.session.user = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
        }
        res.redirect("/dashboard.html");

    } catch(err) {
        console.log(err);
        res.send("Login Failed");
    }
});

export default router;  