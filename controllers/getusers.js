import User from "../models/user.js";
export default async function getusers(req, res) {
    try {
        console.log(req.body);
        let array = req.body;

        let users = []; 
        for(let i = 0; i < array.length;i++){
            let k = await User.findById(array[i], 'username');
            users.push(k);
        }
        res.send(users)
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
}
