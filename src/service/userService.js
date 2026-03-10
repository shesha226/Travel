import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userRepository from '../repositories/userRepository.js';

dotenv.config();

class UserService {

    generateToken(userId) {
        const secret = process.env.JWT_SECRET || 'fallback_secret_key';
        return jwt.sign({ userId }, secret, { expiresIn: '7d' });
    }


    async register(userData) {
        const { name, email, contact_number, password, nic } = userData;

        const existingUser = await userRepository.checkUserExists(email, nic, contact_number);
        if (existingUser) {
            throw new Error('User with this email, NIC, or contact number already exists');
        }

        const user = await userRepository.create({ name, email, contact_number, password, nic });

        return {
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                contact_number: user.contact_number,
                nic: user.nic
            },
            token: this.generateToken(user._id.toString())
        };
    }


    async login(credentials) {
        const { email, password } = credentials;

        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        return {
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                contact_number: user.contact_number,
                nic: user.nic
            },
            token: this.generateToken(user._id.toString())
        };
    }


    async getUserById(userId) {
        return userRepository.findById(userId);
    }
}

export default new UserService();