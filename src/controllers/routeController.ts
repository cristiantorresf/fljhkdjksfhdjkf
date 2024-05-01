import express from "express";

import {ResponsesController} from "./responsesController";

import {PreguntasController} from "./preguntasController";

import {UsersController} from "./userController";

const router = express.Router();

router.get('/healthcheck', (req,res,next) => res.send('OK').status(200))
// Get all responses
router.get('/respuestas', ResponsesController.getResponses);

// Get a single response by id
router.get('/respuestas/:id', ResponsesController.getResponseById);

// obtener respuestas del usuario 🤪🤪
router.get('/respuesta/usuario/:id', ResponsesController.getUserResponses);

// Create a new response
router.post('/respuestas', ResponsesController.createResponse);

// Update an existing response
router.put('/respuestas/:id', ResponsesController.updateResponse);

// Delete a response
router.delete('/respuestas/:id', ResponsesController.deleteResponse);

// Obtener Preguntas
router.get('/preguntas', PreguntasController.getAllQuestions )

router.get('/preguntas/person', PreguntasController.getPersonQuestions )
router.get('/preguntas/resource', PreguntasController.getResourcesQuestion )
router.get('/preguntas/syspros', PreguntasController.getSystemProcessQuestions )

// el frontend solo usara estos dos endpoints

//El estado del respuesta 🥸🥸🥸🥸🥸🥸🥸🥸
router.post('/respuestas/state', (req,res) => new ResponsesController().resolverEstadoTablas(req, res))

// publicar la respuesta actualizar o crear si corresponde 😍😍😍😍
router.post('/respuestas/publicar', (req, res) => new ResponsesController().publicarRespuestas(req, res))



router.post('/users/register', UsersController.registerUser)
router.post('/users/login', UsersController.loginUser)

router.get('/users/', UsersController.getAllUsers)
router.get('/users/:id', UsersController.getUserById)

router.delete('/users/:id', UsersController.deleteUser)

export default router
