const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

async function connectMongoDB() {
    const username = process.env.DB_USERNAME
    const password = process.env.DB_PASSWORD
    const mongoHost = process.env.DB_HOST
    const connectionString = `mongodb+srv://${username}:${password}@${mongoHost}/SAGNIRIB`
    const configuration = {
        authMechanism: 'DEFAULT',
        authSource: 'admin'
    }
    await mongoose.connect(connectionString, configuration)
    console.log('💾 Connected to MongoDB 📚📚📚📚📚📚📚📚📚📚')
}

module.exports = {
    connectMongoDB
}
