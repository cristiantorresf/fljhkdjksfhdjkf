const http = require('http');
const { connectMongoDB } = require('./src/db/mongoConfiguration');
const express = require('express');
const cors = require('cors');
const {json, urlencoded} = require("express");
const routeController = require("./src/controllers/routeController")


async function createServer() {
    const app = express();
    app.use(json());
    app.use(urlencoded({ extended: true }));
    // Set up CORS if needed
    app.use(cors());
    // Set up your API endpoints here
    app.use('/api', routeController); // Make sure your routeController is properly set up for REST API endpoints
    const port = process.env.PORT || 4400;
    const server = http.createServer(app);
    server.listen(port, () => {
        console.log(`🚀 Server ready at http://localhost:${port}/api`);
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
