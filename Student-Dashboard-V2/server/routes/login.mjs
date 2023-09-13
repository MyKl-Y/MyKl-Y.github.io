import express from "express";
import db from "../db/conn.mjs";
import { findUserByEmail } from './register.mjs';

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await findUserByEmail(email);

        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // Check if the provided password matches the stored password
        if (user.password === password) {
            // Authentication successful
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error while logging in:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
