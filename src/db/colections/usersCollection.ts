
import mongoose from "mongoose";
const { Schema } = mongoose;

interface IUser {
    type: string;
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
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

export const UsersModel = mongoose.model<IUser>('Usuarios', userSchema);


