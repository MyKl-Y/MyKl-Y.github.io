import express from "express";
import db from "../db/conn.mjs";
import { findUserByEmail } from './register.mjs';

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);

        if (!user || user.password !== password) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const userData = {
            email: user.email,
            name: user.name,
            displayName: user.displayName,
            majors: user.majors,
            minors: user.minors,
            settings: user.settings,
        };
        res.status(200).json({ message: 'Login successful', userData });
    } catch (error) {
        console.error('Error while logging in:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
