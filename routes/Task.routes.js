import express from 'express';
import middle from '../middlewares/middleware.js';
import create from '../controllers/create.js'
import addmember, { accept } from '../controllers/addmember.js';
import addtask from '../controllers/addtask.js';
import alltask from '../controllers/alltask.js';
import gettask from '../controllers/gettask.js';
const taskRouter = express.Router();
taskRouter.post('/create', middle, create);
taskRouter.post('/addmember', middle, addmember);
taskRouter.post('/accept', middle, accept);
taskRouter.post('/addtask', addtask)
taskRouter.get('/all', middle, alltask)
taskRouter.get('/:id', middle, gettask);

export default taskRouter;