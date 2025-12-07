import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import main from './database/database.js'
import authRouter from './routes/userAuth.routes.js';
import taskRouter from './routes/Task.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'https://frontendoftaskshare.onrender.com/',  // Allow requests only from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],        // Allow common HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allow necessary headers
    credentials: true
}));
app.get('/', (req, res) => {
    console.log('hello there');
    res.send('hello there');
})
app.use('/auth', authRouter)
app.use('/task', taskRouter)
main().then(() => {
    app.listen(3000, () => {
        console.log('listening to 3000')
    })
}).catch((e) => {
    console.log(e);
})