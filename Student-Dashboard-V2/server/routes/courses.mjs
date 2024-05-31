import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of all courses
router.get("/", async (req, res) => {
    let collection = await db.collection("courses");
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

// Add an assignment to a course
router.post("/:id/assignments", async (req, res) => {
    const courseId = new ObjectId(req.params.id);
    const newAssignment = {
        _id: new ObjectId(),
        name: req.body.name,
        grade: req.body.grade,
        weight: req.body.weight,
    };

    let collection = await db.collection("courses");
    let result = await collection.updateOne(
        { _id: courseId },
        { $push: { assignments: newAssignment } }
    );

    res.status(200).send(result);
});

// Update an assignment in a course
router.patch("/:id/assignments/:assignmentId", async (req, res) => {
    const courseId = new ObjectId(req.params.id);
    const assignmentId = new ObjectId(req.params.assignmentId);
    const updates = {
        "assignments.$.name": req.body.name,
        "assignments.$.grade": req.body.grade,
        "assignments.$.weight": req.body.weight,
    };

    let collection = await db.collection("courses");
    let result = await collection.updateOne(
        { _id: courseId, "assignments.id": assignmentId },
        { $set: updates }
    );

    res.status(200).send(result);
});

// Delete an assignment from a course
router.delete("/:id/assignments/:assignmentId", async (req, res) => {
    const courseId = new ObjectId(req.params.id);
    const assignmentId = new ObjectId(req.params.assignmentId);

    let collection = await db.collection("courses");
    let result = await collection.updateOne(
        { _id: courseId },
        { $pull: { assignments: { id: assignmentId } } }
    );

    res.status(200).send(result);
});

// Get assignments for a course
router.get("/:id/assignments", async (req, res) => {
    const courseId = new ObjectId(req.params.id);

    let collection = await db.collection("courses");
    let course = await collection.findOne({ _id: courseId }, { projection: { assignments: 1 } });

    if (!course) res.send("Not found").status(404);
    else res.send(course.assignments).status(200);
});

export default router;
