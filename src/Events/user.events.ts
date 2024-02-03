import { Request, Response } from "express";
import { User } from "../DB/Schema/user.schema";
import { generateToken } from "./user.auth";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();


export const registerNewUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { email, password, isAdmin } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ email, password: hashedPassword, isAdmin });
        await newUser.save()
        res.status(201).json({
            message: "New user created successfully",
            newUser,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Email not found" });
            return;
        }
        const isValidPassword = await bcrypt.compare(password, user!.password)
        if (!isValidPassword) {
            res.status(400).json({ message: "Wrong Password" });
            return;
        }
        const expiresIn = 60 * 360;
        const jwtAccessToken = generateToken(user._id)
        res.cookie("jwtToken", jwtAccessToken, { 
            httpOnly: true,
            maxAge: expiresIn * 1000
        })

        
        res.status(200).json({ 
            message: "Login successful, JWT token set as cookie!",
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}