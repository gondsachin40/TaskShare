import User from "../models/user.js";
import bcrypt from "bcrypt";

export default async function register(req, res) {
    try {
        let { username, password } = req.body;

        username = username?.trim();

        if (!username || typeof username !== "string" || username.length < 3) {
            return res.status(400).json({ message: "Username is required and must be at least 3 characters." });
        }
        if (!password || typeof password !== "string" || password.length <= 4) {
            return res.status(400).json({ message: "Password must be more than 4 characters." });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ message: "Username already taken." });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "Registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error: " + err.message });
    }
}
