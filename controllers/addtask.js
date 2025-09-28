import Task from '../models/task.js'
export default async function addtask(req, res) {
    try {
        const { taskTitle, taskDescription, links, taskID } = req.body;
        const currTask = new Task({
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            links: links,
            tasksId: taskID
        });
        await currTask.save();
        res.status(200).json(currTask);
    } catch (err) {
        console.log(err);
    }
}