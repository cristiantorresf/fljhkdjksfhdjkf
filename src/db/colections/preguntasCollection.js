
const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    // Questions array to store each question and its respective answer, rating, and observation
    type:{type:String, unique:true},
    questions: [
        {
            questionType: String,
            name:String
        }
    ],
});

const QuestionModel = mongoose.model('Preguntas', questionSchema);

module.exports = { QuestionModel};
