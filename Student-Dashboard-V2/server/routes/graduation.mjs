import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Create a new degree
router.post("/degree", async (req, res) => {
    try {
        const newDegree = {
            name: req.body.name,
            credits: req.body.credits,
            concentrations: [
                {
                    _id: new ObjectId(),
                    name: "General Education",
                    requirements: [],
                    is_complete: false,
                },
                {
                    _id: new ObjectId(),
                    name: "Major Specific",
                    requirements: [],
                    is_complete: false,
                }
            ],
            type: req.body.type,
            user: req.body.user,
        };
        let collection = await db.collection("graduationRequirements");
        let result = await collection.insertOne(newDegree);
        res.send(result).status(201); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Create a new concentrations within a degree
router.post("/concentration/:degreeId", async (req, res) => {
    try {
        let query = {_id: new ObjectId(req.params["degreeId"])};
        const newConcentration = {
            _id: new ObjectId(),
            name: req.body.name,
            requirements: [],
            is_complete: false,
        };
        let collection = await db.collection("graduationRequirements");
        let result = await collection.updateOne(query, {$push: {"concentrations": newConcentration}});
        res.send(result).status(201); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Create a new requirement within a concentration
router.post("/requirement/:degreeId/:concentrationId", async (req, res) => {
    try {
        const newRequirement = {
            _id: new ObjectId(),
            name: req.body.name,
            credits: req.body.credits,
            courses: [],
            is_complete: false,
        };
        let collection = await db.collection("graduationRequirements");
        let result = await collection.updateOne(
            { 
                "_id": new ObjectId(req.params["degreeId"]), 
                "concentrations._id": new ObjectId(req.params["concentrationId"]) 
            },
            {$push: {"concentrations.$[conElem].requirements": newRequirement}},
            { arrayFilters: [{ "conElem._id": new ObjectId(req.params.concentrationId) }] }
        );
        res.send(result).status(201); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Create a new course within a requirement
router.post("/course/:degreeId/:concentrationId/:requirementId", async (req, res) => {
    try {
        const newCourse = {
            _id: new ObjectId(),
            code: req.body.code,
            name: req.body.name,
            credits: req.body.credits,
            is_complete: false,
            prerequisites: req.body.prerequisites || [],
        };
        let collection = await db.collection("graduationRequirements");
        let result = await collection.updateOne(
            { 
                "_id": new ObjectId(req.params["degreeId"]),
                "concentrations._id": new ObjectId(req.params["concentrationId"]),
                "concentrations.requirements._id": new ObjectId(req.params["requirementId"]) 
            },
            { $push: { "concentrations.$[conElem].requirements.$[reqElem].courses": newCourse } },
            { arrayFilters: 
                [
                    { "conElem._id": new ObjectId(req.params.concentrationId) },
                    { "reqElem._id": new ObjectId(req.params.requirementId) }
                ] 
            }
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

// Read a lits of all concentrations by degree Id
router.get("/concentration/:degreeId", async (req, res) => {
    try {
        let collection = await db.collection("graduationRequirements");
        let filter = {_id: new ObjectId(req.params["degreeId"])};
        const projection = { concentrations: 1, _id: 0 };
        let result = await collection.find(filter, { projection }).toArray();
        res.send(result).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Read a lits of all requirements by concentration Id
router.get("/requirement/:degreeId/:concentrationId", async (req, res) => {
    try {
        let collection = await db.collection("graduationRequirements");
        let filter1  = {_id: new ObjectId(req.params["degreeId"])};
        let filter2 = {"concentrations._id": new ObjectId(req.params["concentrationId"])};
        const pipeline = [
            { $match: filter1 },
            { $unwind: "$concentrations" },
            { $match: filter2 },
            { $project: { requirements: "$concentrations.requirements", _id: 0 } },
        ];
        let result = await collection.aggregate(pipeline).toArray();
        res.send(result).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Read a list of all courses for a degree
router.get("/courses/:degreeId", async (req, res) => {
    try {
        let collection = await db.collection("graduationRequirements");
        let filter = { _id: new ObjectId(req.params["degreeId"]) };

        const pipeline = [
            { $match: filter },
            { $unwind: "$concentrations" },
            { $unwind: "$concentrations.requirements" },
            { $unwind: "$concentrations.requirements.courses" },
            {
                $project: {
                    _id: "$concentrations.requirements.courses._id",
                    code: "$concentrations.requirements.courses.code",
                    name: "$concentrations.requirements.courses.name",
                    credits: "$concentrations.requirements.courses.credits",
                    is_complete: "$concentrations.requirements.courses.is_complete",
                },
            },
        ];

        let result = await collection.aggregate(pipeline).toArray();
        res.send(result).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": error });
    }
});


// Read a list of all courses by degree Id and requirementId
router.get("/course/:degreeId/:concentrationId/:requirementId", async (req, res) => {
    try {
        let collection = await db.collection("graduationRequirements");
        let filter1  = {_id: new ObjectId(req.params["degreeId"])};
        let filter2 = {"concentrations._id": new ObjectId(req.params["concentrationId"])};
        let filter3 = {"concentrations.requirements._id": new ObjectId(req.params["requirementId"])};
        const pipeline = [
            { 
                $match: filter1,
            },
            { 
                $unwind: "$concentrations" 
            },
            {
                $match: filter2,
            },
            {
                $unwind: "$concentrations.requirements",
            },
            { 
                $match: filter3, 
            },
            { 
                $project: { courses: "$concentrations.requirements.courses", _id: 0 },
            },
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
            { _id: new ObjectId(req.params["degreeId"]) },
            { $set: { "degree.$[elem]": updates } },
            { arrayFilters: [{ "elem._id": new ObjectId(req.params["degreeId"]) }] }
        );
        res.send(updateResult).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Update a concentration within a degree
router.put("/concentration/:degreeId/:concentrationId", async (req, res) => {
    try {
        let collection = await db.collection("graduationRequirements");

        const degreeId = new ObjectId(req.params["degreeId"]);
        const concentrationId = new ObjectId(req.params["concentrationId"]);

        const filter = {
            _id: degreeId,
            "concentrations._id": concentrationId,
        };

        const updates = {
            $set: {
                "concentrations.$": {
                    _id: courseId,
                    requirements: req.body.courses,
                    name: req.body.name,
                    is_complete: req.body.is_complete,
                }
            }
        };

        const arrayFilters = [
            /*{ "degreeElem._id": degreeId },
            { "concElem._id": concentrationId },*/
        ];

        const updateResult = await collection.updateOne(
            filter,
            updates,
            {
            }
        );
        
        res.send(updateResult).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Update a requirement within a concentration
router.put("/requirement/:degreeId/:concentrationId/:requirementId", async (req, res) => {
    try {
        let collection = await db.collection("graduationRequirements");

        const degreeId = new ObjectId(req.params["degreeId"]);
        const concentrationId = new ObjectId(req.params["concentrationId"]);
        const requirementId = new ObjectId(req.params["requirementId"]);

        const filter = {
            _id: degreeId,
            "concentrations._id": concentrationId,
            "concentrations.requirements._id": requirementId,
        };

        const updates = {
            $set: {
                "concentrations.$.requirements.$[reqElem]": {
                    _id: courseId,
                    courses: req.body.courses,
                    name: req.body.name,
                    credits: req.body.credits,
                    is_complete: req.body.is_complete,
                }
            }
        };

        const arrayFilters = [
            /*{ "degreeElem._id": degreeId },
            { "concElem._id": concentrationId },*/
            { "reqElem._id": requirementId },
        ];

        const updateResult = await collection.updateOne(
            filter,
            updates,
            {
                arrayFilters
            }
        );
        
        res.send(updateResult).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Update a course within a requirement
router.put("/course/:degreeId/:concentrationId/:requirementId/:courseId", async (req, res) => {
    try {
        let collection = await db.collection("graduationRequirements");

        const degreeId = new ObjectId(req.params["degreeId"]);
        const concentrationId = new ObjectId(req.params["concentrationId"]);
        const requirementId = new ObjectId(req.params["requirementId"]);
        const courseId = new ObjectId(req.params["courseId"]);

        const filter = {
            _id: degreeId,
            "concentrations._id": concentrationId,
            "concentrations.requirements._id": requirementId,
            "concentrations.requirements.courses._id": courseId
        };

        const updates = {
            $set: {
                "concentrations.$.requirements.$[reqElem].courses.$[courseElem]": {
                    _id: courseId,
                    code: req.body.code,
                    name: req.body.name,
                    credits: req.body.credits,
                    is_complete: req.body.is_complete,
                }
            }
        };

        const arrayFilters = [
            /*{ "degreeElem._id": degreeId },
            { "concElem._id": concentrationId },*/
            { "reqElem._id": requirementId },
            { "courseElem._id": courseId }
        ];

        const updateResult = await collection.updateOne(
            filter,
            updates,
            {
                arrayFilters
            }
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

// Delete a concentration within a degree
router.delete("/concentration/:degreeId/:concentrationId", async (req, res) => {
    try {
        let collection = await db.collection("graduationRequirements");
        const deleteResult = await collection.updateOne(
            { "_id": req.params.degreeId },
            { $pull: { "degree.$[degreeElem].concentrations": { _id: req.params.concentrationId } } },
            { arrayFilters: [{ "degreeElem._id": req.params.degreeId }] }
        );
        res.send(deleteResult).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Delete a requirement within a degree
router.delete("/requirement/:degreeId/:concentrationId/:requirementId", async (req, res) => {
    try {
        let collection = await db.collection("graduationRequirements");
        const deleteResult = await collection.updateOne(
            { "_id": req.params.degreeId, "degree.concentrations._id": req.params.concentrationId },
            { $pull: { "degree.$[degreeElem].concentrations.$[concElem].concentrations": { _id: req.params.requirementId } } },
            { arrayFilters: [{ "degreeElem._id": req.params.degreeId }, { "concElem._id": req.params.concentrationId }] }
        );
        res.send(deleteResult).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

// Delete a course within a requirement
router.delete("/course/:degreeId/:concentrationId/:requirementId/:courseId", async (req, res) => {
    try {
        let collection = await db.collection("graduationRequirements");
        const deleteResult = await collection.updateOne(
            { "_id": req.params.degreeId, "degree.concentrations._id": req.params.concentrationId, "degree.concentrations.requirements._id": req.params.requirementId },
            { $pull: { "degree.$[degreeElem].concentrations.$[concElem].requirements.$[reqElem].courses": { _id: req.params.courseId } } },
            { arrayFilters: [{ "degreeElem._id": req.params.degreeId }, { "concElem._id": req.params.concentrationId }, { "reqElem._id": req.params.requirementId }] }
        );
        res.send(deleteResult).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({"message": error})
    }
});

export default router;
