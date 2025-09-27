import User from "../models/user.js";
import Objective from "../models/objective.js";

export default async function addmember(req, res) {
    try {
        const { username, objectiveId } = req.body;

        if (!objectiveId || !objectiveId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ msg: "Invalid objective ID format" });
        }

        const objectiveExists = await Objective.findById(objectiveId);
        if (!objectiveExists) {
            return res.status(404).json({ msg: "Objective not found" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: "User doesn't exist" });
        }

        const alreadyInvited = user.invitations.some(invId => invId.toString() === objectiveId);
        if (alreadyInvited) {
            return res.status(400).json({ msg: "Invitation already sent" });
        }

        user.invitations.push(objectiveId);

        await user.save();

        res.status(200).json({ msg: "Invitation sent successfully", user });
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
}

export async function accept(req, res) {
    try {
        const { objectiveId } = req.body;
        const userId = req.user._id;

        if (!objectiveId || !objectiveId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ msg: "Invalid objective ID format" });
        }

        const objectiveExists = await Objective.findById(objectiveId);
        if (!objectiveExists) {
            return res.status(404).json({ msg: "Objective not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isInvited = user.invitations.some(invId => invId.toString() === objectiveId);
        if (!isInvited) {
            return res.status(400).json({ msg: "No pending invitation for this objective" });
        }

        if (!user.tasks.some(taskId => taskId.toString() === objectiveId)) {
            user.tasks.push(objectiveId);
        }

        user.invitations = user.invitations.filter(invId => invId.toString() !== objectiveId);

        await user.save();

        res.status(200).json({ msg: "Accepted successfully", user });
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
}
