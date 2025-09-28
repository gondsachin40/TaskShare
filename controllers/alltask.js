import Objective from '../models/objective.js';
import User from '../models/user.js';

export default async function alltask(req, res) {
    try {
        const userInfo = req.user;
        console.log("User Info:", userInfo);

        if (!userInfo || !userInfo._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(userInfo._id).lean();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const objectiveIds = user.tasks;
        const objectives = await Objective.find({
            _id: { $in: objectiveIds }
        });

        res.status(200).json({ objectives });

    } catch (err) {
        console.error("Error in alltask:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
