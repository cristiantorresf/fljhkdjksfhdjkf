
import mongoose from "mongoose";
const { Schema } = mongoose;

type SingleAnswer = {
    question: string;
    answer: string;
    score: number;
    observation: string;
    _id: string;
}
export interface IResponses {
    questionId: typeof mongoose.Schema.Types.ObjectId;
    userId: typeof mongoose.Schema.Types.ObjectId;
    answers: SingleAnswer[];
    tableType?: String;
    userName?: String;
}
const responseSchema = new Schema<IResponses>({
    questionId: { type: Schema.Types.ObjectId, ref:'Preguntas' },
    userId:{type:Schema.Types.ObjectId, ref:'Usuarios'},
    userName:String,
    tableType:String,
    answers: [
        {
            question:String,
            answer:String,
            score:Number,
            observation:String
        }
    ]

});

export const ResponsesModel = mongoose.model<IResponses>('Respuestas', responseSchema);


