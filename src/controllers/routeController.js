const express = require('express');
const AnalisisRiesgoEntity = require('../db/models/analisisRiesgoEntity'); // Replace './evaluationModel' with the actual path to your model

const router = express.Router();

// CREATE a new evaluation
router.post('/evaluations', async (req, res) => {
    try {
        const evaluation = new AnalisisRiesgoEntity(req.body);
        const savedEvaluation = await evaluation.save();
        res.status(201).json(savedEvaluation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all evaluations
router.get('/evaluations', async (req, res) => {
    try {
        const evaluations = await AnalisisRiesgoEntity.find();
        res.json(evaluations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single evaluation by ID
router.get('/evaluations/:id', async (req, res) => {
    try {
        const evaluation = await AnalisisRiesgoEntity.findById(req.params.id);
        if (evaluation) {
            res.json(evaluation);
        } else {
            res.status(404).json({ message: 'AnalisisRiesgoEntity not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE an evaluation by ID
router.put('/evaluations/:id', async (req, res) => {
    try {
        const evaluation = await AnalisisRiesgoEntity.findById(req.params.id);
        if (evaluation) {
            evaluation.set(req.body);
            const updatedEvaluation = await evaluation.save();
            res.json(updatedEvaluation);
        } else {
            res.status(404).json({ message: 'AnalisisRiesgoEntity not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE an evaluation by ID
router.delete('/evaluations/:id', async (req, res) => {
    try {
        const idRecibo = req.params.id
        console.log("🚀 idRecibo >>", idRecibo)
        const evaluation = await AnalisisRiesgoEntity.findByIdAndDelete(idRecibo)
        console.log("🚀 evaluation >>", evaluation)
        if (evaluation) {

            res.json({ message: 'AnalisisRiesgoEntity deleted', encontrado:evaluation });
        } else {
            res.status(404).json({ message: 'AnalisisRiesgoEntity not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
