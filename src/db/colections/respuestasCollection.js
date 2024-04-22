
const mongoose = require('mongoose');
const { Schema } = mongoose;

const responseSchema = new Schema({
    questionId: { type: Schema.Types.ObjectId, ref:'Preguntas' },
    userId:{type:Schema.Types.ObjectId, ref:'Usuarios'},
    answers: [
        {
            question:String,
            answer:String,
            score:Number,
            observation:String
        }
    ]

});

const ResponsesModel = mongoose.model('Respuestas', responseSchema);

module.exports = {ResponsesModel};
