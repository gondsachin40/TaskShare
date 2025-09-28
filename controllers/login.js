import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function login(req, res) {
    console.log('hello');
    try {
        const { username, password } = req.body;
        console.log(username, password);

        if (!username || !password) {
            throw new Error('Username and password are required');
        }
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { _id: user._id, username: username },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 }
        );

        res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true, sameSite: 'lax' });
        res.status(200).json({ username: username, token: token });
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
}
