import Objective from '../models/objective.js';
import User from '../models/user.js';

export default async function getMembers(req, res) {
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
        const objectinfo = await Objective.findById(objectID);
        console.log(objectinfo.members[0].toString())
        const members = [];
        const x = objectinfo.members;
        for (let y of x) {
            members.push(y.toString())
        }
        console.log("Retrieved members:", members);
        res.status(200).json({ members });
    } catch (err) {
        console.error("Error in allmembers:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
