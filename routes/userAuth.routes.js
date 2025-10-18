import express from 'express';
import register from '../controllers/register.js';
import login from '../controllers/login.js';
import middle from '../middlewares/middleware.js';
import getusers from '../controllers/getusers.js';
import getinvitations from '../controllers/getinvitations.js'
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.get('/hello', (req, res) => {
    res.send('Hello World');
});
authRouter.post('/login', login);
authRouter.post('/getusers', middle , getusers);
authRouter.get('/getinvitations' , middle , getinvitations);
export default authRouter;