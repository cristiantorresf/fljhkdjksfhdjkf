import mongoose from "mongoose";

const { Schema } = mongoose;

const evaluationSchema = new Schema({
    // Assuming each evaluation can be identified by a date or a unique identifier
    evaluationDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    // Questions array to store each question and its respective answer, rating, and observation
    questions: [{
        questionText: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            enum: ['SI', 'NO', 'TALVEZ'],
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 1,
        },
        observation: {
            type: String,
            required: false,
        },
    }],
});

export const Evaluation = mongoose.model('Evaluation', evaluationSchema);
