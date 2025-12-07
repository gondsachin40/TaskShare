import Task from '../models/task.js';

export default async function updateTaskStatus(req, res) {
    try {
        const taskId = req.params.id;
        const { completed } = req.body;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.completed = completed;
        await task.save();

        res.status(200).json({ message: "Task status updated successfully", task });

    } catch (err) {
        console.error("Error in updateTaskStatus:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}



