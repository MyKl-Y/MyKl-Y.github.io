// updateField.mjs
import express from 'express';
import db from '../db/conn.mjs';

const router = express.Router();

router.post('/add-field', async (req, res) => {
    const { fieldName, defaultValue } = req.body;

    if (!fieldName) {
        return res.status(400).send({ message: 'Field name is required' });
    }

    try {
        //const collections = await db.listCollections().toArray();
        
        //for (const collectionInfo of collections) {
            //const collection = db.collection(collectionInfo.name);
            const collection = db.collection('jobs');
            await collection.updateMany(
                { [fieldName]: { $exists: false } },
                { $set: { [fieldName]: defaultValue } }
            );
        //}

        res.send({ message: 'Field added to all collections' });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'An error occurred' });
    }
});

export default router;
