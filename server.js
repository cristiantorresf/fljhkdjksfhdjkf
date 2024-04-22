const http = require('http');
const { connectMongoDB } = require('./src/db/mongoConfiguration');
const express = require('express');
const cors = require('cors');
const {json, urlencoded} = require("express");
const routeController = require("./src/controllers/routeController")
const {populateDBWithQuestions} = require("./src/domain/questions/syncQuestions");


async function createServer() {
    const app = express();
    app.use(json());
    app.use(urlencoded({ extended: true }));
    // Set up CORS if needed
    app.use(cors({}));
    // Set up your API endpoints here
    app.use('/api', routeController);
    const port = process.env.PORT || 4400;
    const server = http.createServer(app);
    server.listen(port, async () => {
        console.log(`🚀 Server ready at http://localhost:${port}/api`);
        await populateDBWithQuestions()

    });
}

async function main() {
    try {
        await connectMongoDB()
        await createServer()
    } catch (err) {
        console.error(`Error: ${err.message}`)
    }
}

main()
