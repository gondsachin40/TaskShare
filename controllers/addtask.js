import Task from '../models/task.js';
import Objective from '../models/objective.js'; // Make sure you import this
export default async function addtask(req, res) {
    try {
        const { taskTitle, taskDescription, links, tasksId } = req.body;

        // Create and save new task
        const currTask = new Task({
            taskTitle,
            taskDescription,
            links,
            tasksId
        });
        await currTask.save();

        // Push task into the corresponding Objective
        await Objective.findByIdAndUpdate(
            tasksId,
            { $push: { tasks: currTask._id } },
            { new: true }
        );

        res.status(200).json(currTask);
    } catch (err) {
        console.error("Error in addtask:", err);
        res.status(500).json({ error: "Failed to add task" });
    }
}
