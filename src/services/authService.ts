import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

export class AuthService {
    async login(dbPassword, requestPassword, email, username) {
        console.log("🚀 {dbPassword,requestPassword,email,username} >>", {dbPassword,requestPassword,email,username})
        const isCorrectCredentials = await this.comparePasswords(requestPassword, dbPassword);
        if (!isCorrectCredentials) {
            throw new Error('Password incorrect')
        }
        return this.generateToken({email, username})

    }
    verifyToken(token) {
        const secretKey = process.env.JWT_SECRET || 'defaultSecret'
        return jwt.verify(token, secretKey)
    }
    async comparePasswords(plain, hashed) {
        return bcrypt.compare(plain, hashed)
    }
    async hashPassword(password) {
        const saltRounds = 10
        return bcrypt.hash(password, saltRounds)
    }
    generateToken(payload) {
        const secretKey = process.env.JWT_SECRET || 'defaultSecret'
        return jwt.sign(payload, secretKey, { expiresIn: '1h' })
    }
}
