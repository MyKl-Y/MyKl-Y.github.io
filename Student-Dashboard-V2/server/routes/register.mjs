import express from "express";
import db from "../db/conn.mjs"

const router = express.Router();

// A simple array to store user data
const users = [];

// Register a new user
router.post("/", async (req,res) => {
    const { name, email, password } = req.body

    try {
        // Check if the user with the provided email already exists
        const collection = await db.collection("users");
        const existingUser = await collection.findOne({ email });

        if (existingUser) {
            res.status(400).send({ message: "User already exists" });
        } else {
            // Save the new user to the database
            const newUser = {
                name,
                email,
                password,
            };

            const insertedUserId = await collection.insertOne(newUser);

            res.status(201).send({ message: "Registration sunccessful", userId: insertedUserId });
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

export default router;
export { findUserByEmail };