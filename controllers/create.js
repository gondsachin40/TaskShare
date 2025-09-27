import Objective from "../models/objective.js";
import { default as userModel } from "../models/user.js";
export default async function create(req, res) {
    try {
        const { title } = req.body;
        const user = req.user;
        if (!title) {
            return res.status(400).send('Title is required');
        }
        console.log(user);
        const task = new Objective({
            title: title,
            createdby: user._id,
            members: [user._id]
        })
        await task.save();
        await userModel.findByIdAndUpdate(
            user._id,
            { $addToSet: { tasks: task._id } },
            { new: true }
        );
        res.status(201).json(task);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
}
