import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
            return;
        }

        const secret = process.env.JWT_SECRET || 'fallback_secret_key';
        const decoded = jwt.verify(token, secret);


        req.user = { userId: decoded.userId };

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid token.'
        });
        return;
    }
};

export default authenticate;