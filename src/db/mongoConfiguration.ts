import dotenv from "dotenv";

import mongoose from "mongoose";

dotenv.config();

async function connectLocally() {
    const dbName = 'planemerg' // solo cambiar este string si se requiere cambiar base de datos
    const connectionString = `mongodb://localhost:27017/${dbName}`;
    try {
        await mongoose.connect(connectionString);
        console.log('💾 Conectado a la base de datos EXITOSAMENTE 📚📚📚📚📚📚📚📚📚📚');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

export async function connectMongoDB() {
    const username = process.env.DB_USERNAME
    if (!username) {
        console.log("🚀 intentando conectarse localmente a la bae de datos 😽 >>")
        await connectLocally()
        return
    }
    const password = process.env.DB_PASSWORD
    const mongoHost = process.env.DB_HOST
    const connectionString = `mongodb+srv://${username}:${password}@${mongoHost}/SAGNIRIB`
    const configuration = {
        authMechanism: 'DEFAULT',
        authSource: 'admin'
    } as any
    await mongoose.connect(connectionString, configuration)
    console.log('💾 Connected to MongoDB 📚📚📚📚📚📚📚📚📚📚')
}
