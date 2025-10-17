import Task from '../models/task.js';

export default async function editTask(req, res) {
    try {
        const taskID = req.params.id;
        console.log(taskID);
        const task = await Task.findById(taskID);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const { taskTitle, taskDescription, links } = req.body;

        if (taskTitle !== undefined) task.taskTitle = taskTitle;
        if (taskDescription !== undefined) task.taskDescription = taskDescription;
        if (links !== undefined) task.links = links;

        await task.save();

        res.status(200).json({ message: "Task updated successfully", task });

    } catch (err) {
        console.error("Error in editTask:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
