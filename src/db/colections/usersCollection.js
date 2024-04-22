
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    type: {
        type: String,
        enum: ['User', 'Admin'],
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});

const UsersModel = mongoose.model('Usuarios', userSchema);

module.exports = { UsersModel};
