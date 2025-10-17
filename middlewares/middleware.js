import jwt from "jsonwebtoken";
import user from "../models/user.js";

async function middle(req, res, next) {
    try {
        console.log('Middleware executed');
        console.log(req.cookies)
        let token = req.cookies?.token;

        if (!token) {
            const authHeader = req.headers['authorization'] || req.headers['Authorization'];
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.slice(7);
            }
        }

        console.log('middleware token:', token);

        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = payload;

        console.log('User ID from token:', _id);

        if (!_id) {
            return res.status(401).send('Invalid token.');
        }

        const result = await user.findById(_id);
        if (!result) {
            return res.status(401).send('User not found.');
        }

        req.user = result;
        console.log('middleware success');
        next();
    } catch (err) {
        console.error('Middleware error:', err);
        res.status(401).send('Invalid or expired token.');
    }
}

export default middle;
