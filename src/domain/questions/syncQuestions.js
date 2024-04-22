// que se encargue de popular la base de datos de las preguntas si no las tiene
// asi todo el que tenga este proyecto se sincroniza con las preguntas comunes
const {QuestionModels} = require('../../db/colections/preguntasCollection')
const {PopulateQuestionsData} = require('./populateQuestionsData')
const {populate} = require("dotenv");

async function populateDBWithQuestions() {
    const populate = new PopulateQuestionsData()
    await populate.populatePersonsTable()
    await populate.populateResourcesTable()
    await populate.populateSystemsProcess()
}


module.exports = {
    populateDBWithQuestions
}
