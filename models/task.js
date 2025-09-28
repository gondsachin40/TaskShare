import mongoose from "mongoose";
import Objective from "./objective";
const { Schema } = mongoose;

const taskSchema = new Schema({
    taskTitle: {
        type: String,
        required:true,
    },
    taskDescription: {
        type: String,
        required: true,
    },
    links:{
       type: [String],
    },
    tasksId: {
        type: Schema.Types.ObjectId,
        required:true,
    
    }
    ,
}, { timestamps: true },{_id:false});
const task = mongoose.model("tasks", taskSchema);
export default task;