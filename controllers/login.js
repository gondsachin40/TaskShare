import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function login(req, res) {
    console.log('Login attempt received');
    try {
        let { username, password } = req.body;
        console.log('Received username:', username, 'password length:', password?.length);

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Trim username to match registration behavior
        username = username.trim();

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined in environment variables');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        const user = await User.findOne({ username });
        console.log('User found:', user ? 'Yes' : 'No');

        if (!user) {
            console.log('User not found for username:', username);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Comparing password...');
        const match = await bcrypt.compare(password, user.password);
        console.log('Password match:', match);

        if (!match) {
            console.log('Password does not match for username:', username);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { _id: user._id, username: username },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 10000}
        );

        res.cookie('token', token, { maxAge: 60 * 60 * 10000, httpOnly: true, sameSite: 'lax' });
        console.log('Login successful for username:', username);
        res.status(200).json({ username: username, token: token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Error: ' + err.message });
    }
}
