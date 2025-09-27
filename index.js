import express from 'express';
import main from './database/database.js'
import authRouter from './routes/userAuth.routes.js';
import taskRouter from './routes/Task.routes.js';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(cookieParser());
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