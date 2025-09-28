import express from 'express';
import middle from '../middlewares/middleware.js';
import create from '../controllers/create.js'
import addmember, { accept } from '../controllers/addmember.js';
import addtask from '../controllers/addtask.js';
const taskRouter = express.Router();
taskRouter.post('/create', middle, create);
taskRouter.post('/addmember', middle, addmember);
taskRouter.post('/accept', middle, accept);
taskRouter.post('/addtask', addtask)
export default taskRouter;