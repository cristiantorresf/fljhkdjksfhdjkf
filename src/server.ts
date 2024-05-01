import express, { json, urlencoded } from 'express';
import cors from 'cors';
import http from 'http';

// Custom module imports.
import { connectMongoDB } from './db/mongoConfiguration';
import { populateDBWithQuestions } from './domain/questions/syncQuestions';
import routeController from "./controllers/routeController";


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
