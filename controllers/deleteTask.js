import Task from '../models/task.js';

export default async function deleteTask(req, res) {
    try {
        const taskID = req.params.id;
        console.log('Deleting Task ID:', taskID);
        console.log('hello')

        const task = await Task.findByIdAndDelete(taskID);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error in deleteTask:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
