import Objective from '../models/objective.js';
import User from '../models/user.js';
import Task from '../models/task.js'

export default async function gettask(req, res) {
    try {
        const userInfo = req.user;
        const objectID = req.params.id;
        if (!userInfo || !userInfo._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User.findById(userInfo._id).lean();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const otjectinfo = await Objective.findById(objectID);
        const tasks = [];
        const x = otjectinfo.tasks;
        for (let y of x) {
            const curr = await Task.findById(y).lean();
            tasks.push(curr)
        }
        res.status(200).json({ tasks });
    } catch (err) {
        console.error("Error in alltask:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
