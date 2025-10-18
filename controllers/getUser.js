import User from '../models/user.js'

export default async function getUser(req,res){
    try {
        const id = req.params.id
        const userInfo = req.user
        console.log("User Info:",userInfo)

        if (!userInfo || !userInfo._id){
            return  res.status(401).json({message:"Unauthorized"})
        }
        const data = await User.findById(id).lean();
        if (!data){
            return res.status(404).json({message: "User not found"})
        }
        const username = data.username
        console.log(username)
        res.status(200).json({username})
    }catch (err) {
        console.error("Error in alltask",err)
        res.status(500).json({message:"Internal server error"})
    }
}