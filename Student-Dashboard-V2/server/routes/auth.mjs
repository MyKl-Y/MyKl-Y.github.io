import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register a new user
router.post("/register", async (req,res) => {
    try {
        const { name, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if the user with the provided email already exists
        const collection = await db.collection("users");
        const existingUser = await collection.findOne({ email });

        if (existingUser) {
            res.status(400).send({ message: "User already exists" });
        } else {
            // Save the new user to the database
            const newUser = {
                name,
                displayName: name,
                email,
                password: hashedPassword,
                majors: [],
                minors: [],
                settings: {
                    gpaSettings: {
                        scale: 4.0,
                        gradeScale: 'plus-minus'
                    },
                    themeSettings: {
                        mode: "light",
                        style: "minimal",
                    },
                },
            };

            const insertedUserId = await collection.insertOne(newUser);

            res.status(201).send({ message: "Registration successful", userId: insertedUserId });
        }
    } catch (error) {
        console.error("Error while registering user:", error);
        res.status(500).send("Internal Server Error");
    }
}) 

// Check username availability
router.get('/check-username/:username', async (req, res) => {
    const collection = await db.collection("users");
    const { username } = req.params;

    try {
        const cursor = collection.find({});
        const usersArray = await cursor.toArray();

        const isUsernameTaken = usersArray.some(user => user.name === username);
        res.json({ taken: isUsernameTaken });
    } catch (error) {
        console.error('Error checking username availability:', error);
        res.status(500).json({ taken: false, error: 'Internal Server Error' });
    }
});

// Check email availability
router.get('/check-email/:email', async (req, res) => {
    const collection = await db.collection("users");
    const { email } = req.params;

    try {
        const cursor = collection.find({});
        const usersArray = await cursor.toArray();

        const isEmailTaken = usersArray.some(user => user.email === email);
        res.json({ taken: isEmailTaken });
    } catch (error) {
        console.error('Error checking email availability:', error);
        res.status(500).json({ taken: false, error: 'Internal Server Error' });
    }
});

// Define a function to find a user by email (similarly for login)
async function findUserByEmail(email) {
    const collection = await db.collection("users");
    const query = { email };
    return await collection.findOne(query);
}

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

// Read a user
router.get("/account", authenticateToken, async (req, res) => {
    const collection = await db.collection("users");
    const userId = req.user.userId;

    try {
        const query = { _id: new ObjectId(userId) };
        const result = await collection.findOne(query);

        if (!result) res.send("Not found").status(404);
        else res.status(200).json(result);
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Read a user based on username
router.get("/account/:userName", async (req, res) => {
    const collection = await db.collection("users");
    const userName = req.params["userName"];

    try {
        const query = { name: userName };
        const result = await collection.findOne(query);

        if (!result) res.send("Not found").status(404);
        else res.send(result).status(200);
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update a current user based on parameters of userName
router.patch("/account/:userName", async (req, res) => {
    let collection = await db.collection("users");

    try {
        const query = { name: req.params.userName };
        const update = { $set: { 
            displayName: req.body.displayName, 
            majors: req.body.majors, 
            minors: req.body.minors, 
        } };
        let result = await collection.updateOne(query, update);

        res.send(result).status(200);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/:userId/settings", async (req, res) => {
    let collection = await db.collection("users");
    let userId = req.params.userId;
    let query = await collection.findOne({ name: userId });
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result.settings).status(200);
});

router.post("/:userId/settings", async (req, res) => {
    let collection = await db.collection("users");
    let userId = req.params.userId;
    let newSettings = {
        gpaSettings: {
            scale: req.body.gpaSettings.scale,
            gradeScale: req.body.gpaSettings.gradeScale,
        },
        themeSettings: {
            mode: req.body.themeSettings.mode,
            style: req.body.themeSettings.style,
        },
    }

    let query = await collection.findOne({  name: userId });
    let result = await collection.updateOne(query, { $set: { settings: newSettings } });
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

router.patch("/:userId/settings", async (req, res) => {
    let collection = await db.collection("users");
    let userId = req.params.userId;
    let updatedSettings = {
        gpaSettings: {
            scale: req.body.gpaSettings.scale,
            gradeScale: req.body.gpaSettings.gradeScale,
        },
        themeSettings: {
            mode: req.body.themeSettings.mode,
            style: req.body.themeSettings.style,
        },
    }

    let query = await collection.findOne({ name: userId });
    let result = await collection.updateOne(query, { $set: { settings: updatedSettings } });
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

router.delete("/:userId/settings", async (req, res) => {
    let collection = await db.collection("users");
    let userId = req.params.userId;
    let query = await collection.findOne({ name: userId });
    let result = await collection.updateOne(query, { $unset: { settings: {} } });

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

router.post('/logout', (req, res) => {
    res.clearCookie('token').send('Logged out');
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h' 
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error while logging in:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;