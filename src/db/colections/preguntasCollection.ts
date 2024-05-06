import mongoose from "mongoose";

const { Schema } = mongoose;

type SingleQuestion = {
    questionType:string;
    name:string;
    _id:string;
}
export interface IQuestions {
    type: string;
    questions: SingleQuestion[];
    _id?: string;
}

const questionSchema = new Schema<IQuestions>({
    // Questions array to store each question and its respective answer, rating, and observation
    type:{type:String, unique:true},
    questions: [
        {
            questionType: String,
            name:String
        }
    ],
});

export const QuestionModel = mongoose.model<IQuestions>('Preguntas', questionSchema);
