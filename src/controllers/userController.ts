import {UsersModel} from "../db/colections/usersCollection";

import {AuthService} from "../services/authService";


export class UsersController {
    static async getAllUsers(req, res) {
        try {
            const users = await UsersModel.find({})
            if (users) return res.send(users)
            if (!users) return res.send('No Hay Usuarios 🐒')
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async getUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await UsersModel.findOne({id: id.req.params.id})
            if (user) return res.json(user)
            if (!user) return res.send('No Hay Usuario 🐒')
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async registerUser(req, res) {
        try {
            console.log("🚀 Attempting to register user >>")
            const {email} = req.body;
            const userFound = await UsersModel.findOne({email})
            console.log("🚀 userFound >>", userFound)
            if (userFound) return res.status(400).send('Usuario ya esta registrado')
            // register user
             console.log("🚀 User not found attempting to create a user >>")
            const authService = new AuthService();
            req.body.password = await authService.hashPassword(req.body.password)
            const newUser = new UsersModel(req.body);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async loginUser(req, res) {
        try {
            const {email, password: requestPassword, username} = req.body;
            if (!email && !username){
                 console.log("🚀 No se provio el email  ni el username >>")
                return res.status(400).send('Mal request no hay username ni email')
            }
            const authService = new AuthService();
            let userFound = null;
            if (email){
                userFound = await UsersModel.findOne({email})
                if (!userFound) {
                    userFound = await UsersModel.findOne({username:email})
                    userFound
                }
            }
            if (username){
                userFound = await UsersModel.findOne({username})
                if (!userFound) {
                    userFound = await UsersModel.findOne({email:username})
                }
            }
            if (!userFound) return res.status(400).send("Usuario no se encuentra ni con email o username")
            const dbPassword = userFound.password
            const userUsername = userFound.username
            const userEmail = userFound.email
            const token = await authService.login(dbPassword, requestPassword, userEmail, userUsername)
            return res.status(200).json({token, username:userUsername, email, id:userFound._id})

        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async deleteUser(req, res) {
        //delete user
        const { id } = req.params;
        await UsersModel.findByIdAndDelete(id);
        res.status(200).send("User deleted successfully");
    }
}


