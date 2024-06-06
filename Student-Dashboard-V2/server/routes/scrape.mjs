import express from 'express';
import fs from 'fs';
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";


const router = express.Router();

const collection = db.collection("scrape");

const saveCoursesToDb = () => {
    /*
    fs.readFile('courses.json', 'utf8', async (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const courses = JSON.parse(data);

        try {
            const existingCourses = await collection.find().toArray();
            const existingCoursesMap = existingCourses.reduce((map, course) => {
                map[course.name] = course; // assuming `name` is a unique field, change if needed
                return map;
            }, {});

            for (const course of courses) {
                if (existingCoursesMap[course.name]) {
                    await collection.updateOne(
                        { _id: existingCoursesMap[course.name]._id },
                        { $set: course }
                    );
                } else {
                    await collection.insertOne({
                        _id: new ObjectId(),
                        ...course
                    });
                }
            }
            console.log("Courses saved to database.");
        } catch (e) {
            console.error(e);
        }
    });
    */
    if (new Date() === new Date(datetime.date.today().year + '-12-31T23:59:59.999Z')) {
        const spawn = require('child_process').spawn;
        const pythonProcess = spawn('python', ['scrape.py', 'all']);

        pythonProcess.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(data.toString());
        });

        pythonProcess.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }
};

// CRUD Routes
router.get('/courses', async (req, res) => {
    try {
        const courses = await collection.find().toArray();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/courses/:id', async (req, res) => {
    try {
        const course = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!course) return res.status(404).json({ message: 'Cannot find course' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/courses', async (req, res) => {
    try {
        const newCourse = { ...req.body, _id: new ObjectId() };
        const result = await collection.insertOne(newCourse);
        res.status(201).json(result.ops[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/courses/:id', async (req, res) => {
    try {
        const updatedCourse = await collection.findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body },
            { returnOriginal: false }
        );
        if (!updatedCourse.value) return res.status(404).json({ message: 'Cannot find course' });
        res.json(updatedCourse.value);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/courses/:id', async (req, res) => {
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Cannot find course' });
        res.json({ message: 'Deleted Course' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Save courses to DB on server start
//saveCoursesToDb();

export default router;