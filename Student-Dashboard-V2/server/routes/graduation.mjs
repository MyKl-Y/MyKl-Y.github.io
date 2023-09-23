import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of all degrees
router.get("/", async (req, res) => {
    let collection = await db.collection("graduationRequirements");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// Get a single course by ID
router.get("/:id", async (req, res) => {
    let collection = await db.collection("courses");
    let id = req.params.id;
    let query = await collection.findOne({ _id: new ObjectId(id) });
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Create a new course
router.post("/", async (req, res) => {
    let newDocument = {
        courseNumber: req.body.courseNumber,
        tag: req.body.tag,
        professor: req.body.professor,
        professorContact: req.body.professorContact,
        links: req.body.links,
        courseName: req.body.courseName,
        semester: req.body.semester,
        meetingTimes: req.body.meetingTimes,
        assignments: [], // Initialize assignments as an empty array
        user: req.body.user,
    };

    let collection = await db.collection("courses");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(201); // 201 Created
});

// Update a course by ID
router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
        $set: {
            courseNumber: req.body.courseNumber,
            tag: req.body.tag,
            professor: req.body.professor,
            professorContact: req.body.professorContact,
            links: req.body.links,
            courseName: req.body.courseName,
            semester: req.body.semester,
            meetingTimes: req.body.meetingTimes,
            user: req.body.user,
        },
    };

    let collection = await db.collection("courses");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});

// Delete a course
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("courses");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

export default router;
