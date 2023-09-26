import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Create a new degree
router.post("/degree", async (req, res) => {
    try {
        const newDegree = {
            name: req.body.name,
            requirements: [],
        };
        let collection = await db.collection("graduationRequirements");
        let result = await collection.insertOne(newDegree);
        res.send(result).status(201); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Create a new requirement within a degree
router.post("/requirement/:degreeId", async (req, res) => {
    try {
        let query = {_id: new ObjectId(req.params["degreeId"])};
        const newRequirement = {
            _id: new ObjectId(),
            name: req.body.name,
            credits: req.body.credits,
            courses: [],
            is_complete: false,
        };
        let collection = await db.collection("graduationRequirements");
        //let result = await collection.updateOne(
        //    { _id: req.params.degreeId },
        //    { $push: { "requirements": newRequirement } },
        //);
        let result = await collection.updateOne(query, {$push: {"requirements": newRequirement}});
        res.send(result).status(201); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Create a new course within a requirement
router.post("/course/:degreeId/:requirementId", async (req, res) => {
    try {
        const newCourse = {
            _id: new ObjectId(),
            code: req.body.code,
            name: req.body.name,
            credits: req.body.credits,
            is_complete: false,
        };
        let collection = await db.collection("graduationRequirements");
        let result = await collection.updateOne(
            { 
                "_id": new ObjectId(req.params["degreeId"]), 
                "requirements._id": new ObjectId(req.params["requirementId"]) 
            },
            { $push: { "requirements.$[reqElem].courses": newCourse } },
            { arrayFilters: [{ "reqElem._id": new ObjectId(req.params.requirementId) }] }
        );
        res.send(result).status(201); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Read a list of all degrees
router.get("/degree", async (req, res) => {
    let collection = await db.collection("graduationRequirements");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// Read a lits of all requirements by degree Id
router.get("/requirement/:degreeId", async (req, res) => {
    try {
        let collection = await db.collection("graduationRequirements");
        let filter = {_id: new ObjectId(req.params["degreeId"])};
        const projection = { requirements: 1, _id: 0 };
        let result = await collection.find(filter, { projection }).toArray();
        res.send(result).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Read a list of all courses by degree Id and requirementId
router.get("/course/:degreeId/:requirementId", async (req, res) => {
    try {
        let collection = await db.collection("graduationRequirements");
        let filter1  = {_id: new ObjectId(req.params["degreeId"])};
        let filter2 = {"requirements._id": new ObjectId(req.params["requirementId"])};
        const pipeline = [
            { $match: filter1 },
            { $unwind: "$requirements" },
            { $match: filter2 },
            { $project: { courses: "$requirements.courses", _id: 0 } },
        ];
        let result = await collection.aggregate(pipeline).toArray();
        res.send(result).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});    

// Update a degree
router.put("/degree/:degreeId", async (req, res) => {
    try {
        const updates = req.body;
        let collection = await db.collection("graduationRequirements");
        const updateResult = await collection.updateOne(
            { _id: req.params.degreeId },
            { $set: { "degree.$[elem]": updates } },
            { arrayFilters: [{ "elem._id": req.params.degreeId }] }
        );
        res.send(updateResult).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Update a requirement within a degree
router.put("/requirement/:degreeId/:requirementId", async (req, res) => {
    try {
        const updates = req.body;
        let collection = await db.collection("graduationRequirements");
        const updateResult = await collection.updateOne(
            { "_id": req.params.degreeId, "degree.requirements._id": req.params.requirementId },
            { $set: { "degree.$[degreeElem].requirements.$[reqElem]": updates } },
            { arrayFilters: [{ "degreeElem._id": req.params.degreeId }, { "reqElem._id": req.params.requirementId }] }
        );
        res.send(updateResult).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Update a course within a requirement
router.put("/course/:degreeId/:requirementId/:courseId", async (req, res) => {
    try {
        const updates = req.body;
        let collection = await db.collection("graduationRequirements");
        const updateResult = await collection.updateOne(
            { "_id": req.params.degreeId, "degree.requirements._id": req.params.requirementId, "degree.requirements.courses._id": req.params.courseId },
            { $set: { "degree.$[degreeElem].requirements.$[reqElem].courses.$[courseElem]": updates } },
            { arrayFilters: [{ "degreeElem._id": req.params.degreeId }, { "reqElem._id": req.params.requirementId }, { "courseElem._id": req.params.courseId }] }
        );
        res.send(updateResult).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Delete a degree
router.delete("/degree/:degreeId", async (req, res) => {
    try {
        let collection = await db.collection("graduationRequirements");
        const deleteResult = await collection.deleteOne(
            { _id: req.params.degreeId }
        );
        res.send(deleteResult).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Delete a requirement within a degree
router.delete("/requirement/:degreeId/:requirementId", async (req, res) => {
    try {
        let collection = await db.collection("graduationRequirements");
        const deleteResult = await collection.updateOne(
            { "_id": req.params.degreeId },
            { $pull: { "degree.$[degreeElem].requirements": { _id: req.params.requirementId } } },
            { arrayFilters: [{ "degreeElem._id": req.params.degreeId }] }
        );
        res.send(deleteResult).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Delete a course within a requirement
router.delete("/course/:degreeId/:requirementId/:courseId", async (req, res) => {
    try {
        let collection = await db.collection("graduationRequirements");
        const deleteResult = await collection.updateOne(
            { "_id": req.params.degreeId, "degree.requirements._id": req.params.requirementId },
            { $pull: { "degree.$[degreeElem].requirements.$[reqElem].courses": { _id: req.params.courseId } } },
            { arrayFilters: [{ "degreeElem._id": req.params.degreeId }, { "reqElem._id": req.params.requirementId }] }
        );
        res.send(deleteResult).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

export default router;
