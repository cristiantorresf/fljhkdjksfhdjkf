import {IResponses, ResponsesModel} from "../db/colections/respuestasCollection";
import {IQuestions, QuestionModel} from "../db/colections/preguntasCollection";
import { Request, Response } from 'express';
import mongoose from "mongoose";


export type FrontendPublishResponse = {
    questionId: | 'Person' | 'Resources' | 'SystemsAndProcess',
    userId: string;
    questions: IResponses['answers'],
}

export class ResponsesController {
    transformarQuestionsResponse(questions: IQuestions['questions']) {
        return questions.map(cadaElemento => {
                return {
                    question: cadaElemento.name,
                    answer: 'NO',
                    score: 0,
                    observation: 'Sin observacion',
                    _id: cadaElemento._id,
                };
            },
        )
    }

    transformarResponse(responses: IResponses['answers']) {
        return responses.map(cadaElemento => {
            const {answer, score, observation, question, _id} = cadaElemento;
                return {
                    question,
                    answer,
                    score,
                    observation,
                    _id
                };
            },
        )
    }
    async resolverEstadoTablas(req: Request, res: Response) {
        const userId = req.body.userId;
        const questionTypeRequest = req.body.questionId;
        // mirar si ya hay respuesta
        const questionResponse = await QuestionModel.findOne({type: questionTypeRequest})
        if (!questionResponse) return res.status(404).send("Bad Request");
        try {
            const response = await ResponsesModel.findOne({userId, questionId: questionResponse._id});
            if (response) {
                return res.json({
                    questions: this.transformarResponse(response.answers),
                    questionId: questionTypeRequest,
                    userId,
                });
            }
            if (!response) {
               return this.noHayRespuestaEnviarPreguntas(res, questionResponse._id, userId)
            }
            return res.json({message: 'testing'})
        } catch (error) {
            return this.noHayRespuestaEnviarPreguntas(res, questionResponse._id, userId)
        }
    }

    static async getResponses(req, res) {
        try {
            const responses = await ResponsesModel.find({});
            res.json(responses);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async getResponseById(req, res) {
        try {
            const response = await ResponsesModel.findById(req.params.id);
            if (!response) return res.status(404).json({message: 'Response not found'});
            res.json(response);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async createResponse(req, res) {
        try {
            const newResponse = new ResponsesModel(req.body);
            const savedResponse = await newResponse.save();
            res.status(201).json(savedResponse);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    static async updateResponse(req, res) {
        try {
            const response = await ResponsesModel.findByIdAndUpdate(req.params.id, req.body);
            if (!response) return res.status(404).json({message: 'Response not found'});
            res.json(response);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    static async deleteResponse(req, res) {
        try {
            const response = await ResponsesModel.findByIdAndDelete(req.params.id);
            if (!response) return res.status(404).json({message: 'Response not found'});
            res.status(204).json();
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async getUserResponses(req, res) {
        try {
            const response = await ResponsesModel.findOne({userId: req.params.id}).populate('questionId') as any;
            if (!response) return res.status(404).json({message: 'Response not found'});
            const goodStructure = {
                questions: response.answers.map(e => {
                    const name = e.question
                    const {score, _id, answer} = e
                    return {name, score, observation: e?.observation || '', _id, answer}
                }),
                questionId: response.questionId._id,
                questionType: response.questionId.type,
                userId: response.userId,
                id: response._id
            }
            res.json(goodStructure);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    private async noHayRespuestaEnviarPreguntas(res: Response, questionId: mongoose.Types.ObjectId, userId: String) {
        if (!questionId) return res.status(404).json({message: 'Question not found'});
        const questionsResponse = await QuestionModel.findById(questionId).exec()
        return res.json({
            questions: this.transformarQuestionsResponse(questionsResponse.questions),
            questionId: questionsResponse._id,
            userId,
        });
    }

    async tranformPublishReponseData(data: FrontendPublishResponse){
        const { questions, userId} = data
        const questionId = await QuestionModel.findOne({type: data.questionId}) || data.questionId
        return {
            questionId,
            userId,
            answers: questions,
        }
    }

    async publicarRespuestas(req:Request, res: Response) {
        const {userId, questionId, answers} = await this.tranformPublishReponseData(req.body);

        if (!userId || !questionId || !answers) {
            return res.json({error:"🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬 mande la data bien ijuemadre vida como quiere que consulte la base de datos sin la data bien"})
        }
        // Find a response with the given userId and questionId
        const response = await ResponsesModel.findOne({userId, questionId});
        try {
            if (response) {
                // update the document given the userId and questionId
                response.answers = answers;
                await response.save();
                return res.status(200).json(response);
            } else {
                // create a brand new document with the given userId, questionId and answers
                const newResponse = new ResponsesModel({userId, questionId, answers});
                const savedResponse = await newResponse.save();
                return res.status(200).json(savedResponse);
            }
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
}


