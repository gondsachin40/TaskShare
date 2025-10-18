import User from "../models/user.js";
import Objective from "../models/objective.js";

export default async function getusers(req, res) {
    try {
        const invitationIds = req.user.invitations;

        const invitations = await Objective.find({
            _id: { $in: invitationIds }
        })
        .select('title createdby') 
        .populate('createdby', 'username'); 

        res.status(200).json(invitations);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
}
