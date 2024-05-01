const {QuestionModel} = require("../db/colections/preguntasCollection");

export class PreguntasController {
    static async getAllQuestions(req, res) {
        try {
            const questions = await QuestionModel.find({})
            if (questions) return res.send(questions)
            if (!questions) return res.send('No Hay preguntas 🐒')
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async getPersonQuestions(req, res) {
        try {
            const data = await QuestionModel.findOne({type: 'Person'})
            const {questions} = data
            if (questions) return res.json({questions, id: data._id})
            if (!questions) return res.send('No Hay preguntas 🐒')
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async getResourcesQuestion(req, res) {
        try {
            const {questions} = await QuestionModel.findOne({type: 'Resources'})
            if (questions) return res.send(questions)
            if (!questions) return res.send('No Hay preguntas 🐒')
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async getSystemProcessQuestions(req, res) {
        try {
            const {questions} = await QuestionModel.findOne({type: 'SystemsAndProcess'})
            if (questions) {
                const services = questions.filter(c => c.questionType === 'Servicios')
                const alternSystems = questions.filter(c => c.questionType === 'Sistemas Alternos')
                return res.json({servicios: services, sistemasAlternos: alternSystems}).status(200)
                // return res.send(questions)
            }
            if (!questions) return res.send('No Hay preguntas 🐒')
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}


