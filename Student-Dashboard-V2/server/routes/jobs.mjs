import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Help get a list of all the jobs.
router.get("/", async (req, res) => {
    let collection = await db.collection("jobs");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// Help get a single job by id.
router.get("/:id", async (req, res) => {
    let collection = await db.collection("jobs");
    let id = req.params.id;
    let query = await collection.findOne({ _id: new ObjectId(id) });
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Help create a new job.
router.post("/", async (req, res) => {
    let newDocument = {
        type: req.body.type,
        role: req.body.role,
        company: req.body.company,
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        location: req.body.location,
        format: req.body.format,
        appliedDate: req.body.appliedDate,
        status: req.body.status,
        response: req.body.response,
        notes: req.body.notes,
        source: req.body.source,
        contact: req.body.contact,
        benefits: req.body.benefits,
        salary: req.body.salary,
        hours: req.body.hours,
        requirements: req.body.requirements,
        startDate: req.body.startDate,
    };
    let collection = await db.collection("jobs");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

// Help update job by id.
router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
        $set: {
            type: req.body.type,
            role: req.body.role,
            company: req.body.company,
            name: req.body.name,
            description: req.body.description,
            deadline: req.body.deadline,
            location: req.body.location,
            format: req.body.format,
            appliedDate: req.body.appliedDate,
            status: req.body.status,
            response: req.body.response,
            notes: req.body.notes,
            source: req.body.source,
            contact: req.body.contact,
            benefits: req.body.benefits,
            salary: req.body.salary,
            hours: req.body.hours,
            requirements: req.body.requirements,
            startDate: req.body.startDate,
        }
    };

    let collection = await db.collection("jobs");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});

// Help delete a job.
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("jobs");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

export default router;
