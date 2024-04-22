const {QuestionModel} = require('../../db/colections/preguntasCollection')

class PopulateQuestionsData {
    async populatePersonsTable(){
        const personsQuestions = [
            {
                name: '¿Existe una política general en Gestión del Riesgo donde se indica la' +
                    'prevención y preparación para afrontar una emergencia?',
                questionType: 'gestion organizacional'
            },
            {
                name: '¿Se promueve y se practica activamente con los funcionarios y colaboradores' +
                    'el programa de preparación para emergencia?',
                questionType: 'gestion de colaboradores'
            },
            {
                name: '¿Existe un esquema organizacional para la respuesta a emergencias con' +
                    'funciones y responsables asignados (Brigadas, Sistema Comando de' +
                    'incidentes - SCI, entre otros) y se mantiene actualizado?',
                questionType: 'gestion de emergencias'
            },
            {
                name: '¿Existen instrumentos o formatos, folletos como material de difusión en temas' +
                    'de prevención y control de emergencias?',
                questionType: 'materiales de difusion'
            },
            {
                name: '¿Existe una brigada de emergencia o en su defecto algún integrante de la' +
                    'misma dentro de la sede?',
                questionType: 'existencia de brigada'
            }
        ]

        const document = {
            type:'Person',
            questions: personsQuestions
        }
        try {
            await new QuestionModel(document).save()
        } catch (e) {
            console.log("🚀TODO BIEN 😇",)

        }
    }

    async populateResourcesTable() {
        const questions = [
            {
                type:'Suministros',
                name:'¿Se cuenta con equipos de señalización y delimitación "señales de pare,' +
                    'cinta de acordonamiento o balizamiento, conos reflectivos, entre otros?',

            },

            {
                type:'Suministros',
                name:'¿Se cuentan con extintores portátiles seleccionados y distribuidos según y/o' +
                    'acordes a la norma NFPA 10 o las necesidades de la institución? SI'
            },

            {
                type:'Suministros',
                name: '¿Se cuenta con camillas e inmovilizadores cervicales en número suficiente y' +
                    'correctamente distribuidas acorde a las necesidades de la institución?'
            },

            {
                type:'Suministros',
                name:'¿Se cuenta con botiquines "portátiles o fijos" dotados y en un número' +
                    'suficiente acorde a las necesidades de las diferentes dependencias o' +
                    'instituciones?'
            }
        ].map(e => ({name:e.name, questionType:e.type}))
        try{
        const resourcesDocument = new QuestionModel({
            questions,
            type:'Resources'
        })

        await resourcesDocument.save();

        } catch (e) {
            console.log("🚀TODO BIEN 😇",)


        }
    }

    async populateSystemsProcess(){
        const questions = [
            {
                questionType:'Servicios',
                name:'¿Se cuenta con suministros de energía?'
            },
            {
                questionType:'Servicios',
                name:'¿Se cuenta con suministros de gas "natural - propano"?'
            },
            {
                questionType:'Servicios',
                name:'¿Se cuenta con suministros de agua?'
            },
            {
                questionType:'Servicios',
                name:'¿Se cuenta con programas de recolección de basuras y manejo de residuos?'
            },
            {
                questionType: 'Servicios',
                name:'¿Se cuenta con servicio de radio y comunicaciones?'
            },
            {
                questionType:'Sistemas Alternos',
                name:'¿Se cuenta con un tanque de reserva de agua?'
            },
            {
                questionType:'Sistemas Alternos',
                name:'¿Se cuenta con una planta eléctrica?'
            }
        ]
        try {

        const systemAndProcessDocument = new QuestionModel({
            questions,
            type:'SystemsAndProcess'
        })

        await systemAndProcessDocument.save()
        } catch (e) {
            console.log("🚀TODO BIEN 😇",)
        }
    }
}

module.exports = {
    PopulateQuestionsData
}
