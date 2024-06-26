import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Help get a list of all the tasks.
router.get("/", async (req, res) => {
    let collection = await db.collection("tasks");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// Help get a list of all the tasks by user.
router.get("/user/:user", async (req, res) => {
    let collection = await db.collection("tasks");
    let results = await collection.find({ user: req.params.user }).toArray();
    res.send(results).status(200);
});

// Help get a single task by id.
router.get("/:id", async (req, res) => {
    let collection = await db.collection("tasks");
    let id = req.params.id;
    let query = await collection.findOne({ _id: new ObjectId(id) });
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Help create a new task.
router.post("/", async (req, res) => {
    let newDocument = {
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        dueDate: req.body.dueDate,
        isComplete: req.body.isComplete,
        priority: req.body.priority,
        isArchived: req.body.isArchived,
        isDeleted: req.body.isDeleted,
        isRecurring: req.body.isRecurring,
        recurrence: req.body.recurrence,
        recurrenceInterval: req.body.recurrenceInterval,
        recurrenceCount: req.body.recurrenceCount,
        user: req.body.user,
    };
    let collection = await db.collection("tasks");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

// Help update task by id.
router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
        $set: {
            category: req.body.category,
            name: req.body.name,
            description: req.body.description,
            startDate: req.body.startDate,
            dueDate: req.body.dueDate,
            isComplete: req.body.isComplete,
            priority: req.body.priority,
            isArchived: req.body.isArchived,
            isDeleted: req.body.isDeleted,
            isRecurring: req.body.isRecurring,
            recurrence: req.body.recurrence,
            recurrenceInterval: req.body.recurrenceInterval,
            recurrenceCount: req.body.recurrenceCount,
        }
    };

    let collection = await db.collection("tasks");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});

// Help delete a task.
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("tasks");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

export default router;