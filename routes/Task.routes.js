import express from 'express';
import middle from '../middlewares/middleware.js';
import create from '../controllers/create.js'
import addmember, { accept } from '../controllers/addmember.js';
import addtask from '../controllers/addtask.js';
import alltask from '../controllers/alltask.js';
import getObjective from '../controllers/getobjective.js';
import getTask from '../controllers/getTask.js';
import editTask from '../controllers/editTask.js';

import deleteTask from '../controllers/deleteTask.js';
const taskRouter = express.Router();

//Create Objective
taskRouter.post('/create', middle, create);
taskRouter.post('/addmember', middle, addmember);
taskRouter.post('/accept', middle, accept);
taskRouter.post('/addtask', addtask)
taskRouter.get('/all', middle, alltask)
taskRouter.get('/getObjective/:id', middle, getObjective);
taskRouter.get('/getTask/:id', middle, getTask);
taskRouter.post('/editTask/:id', middle, editTask);

taskRouter.post('/deleteTask/:id', middle, deleteTask);

export default taskRouter;