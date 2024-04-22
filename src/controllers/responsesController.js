
const {ResponsesModel} = require("../db/colections/respuestasCollection");

class ResponsesController {
    static async getResponses(req, res) {
        try {
            const responses = await ResponsesModel.find({});
            res.json(responses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getResponseById(req, res) {
        try {
            const response = await ResponsesModel.findById(req.params.id);
            if (!response) return res.status(404).json({ message: 'Response not found' });
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async createResponse(req, res) {
        try {
            const newResponse = new ResponsesModel(req.body);
            const savedResponse = await newResponse.save();
            res.status(201).json(savedResponse);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateResponse(req, res) {
        try {
            const response = await ResponsesModel.findByIdAndUpdate(req.params.id, req.body);
            if (!response) return res.status(404).json({ message: 'Response not found' });
            res.json(response);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteResponse(req, res) {
        try {
            const response = await ResponsesModel.findByIdAndDelete(req.params.id);
            if (!response) return res.status(404).json({ message: 'Response not found' });
            res.status(204).json();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getUserResponses(req, res) {
        try {
            const response = await ResponsesModel.findOne({userId:req.params.id}).populate('questionId');
            if (!response) return res.status(404).json({ message: 'Response not found' });
            const mapped = response.answers.map(e => {
                return {
                    questions:e.answers,
                }
            })
            const goodStructure = {
                questions: response.answers.map(e => {
                    const name = e.question
                    const {score, _id, answer} = e
                    return {name,score, observation:e?.observation || '', _id, answer}
                }),
                questionId: response.questionId._id,
                questionType: response.questionId.type,
                userId: response.userId,
                id:response._id
            }
            res.json(goodStructure);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = ResponsesController;
