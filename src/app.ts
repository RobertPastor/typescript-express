//console.log('Hello');
import express from 'express';
import { loggerMiddleware} from './middleware/loggerMiddleware';
/**
 * https://medium.com/better-programming/create-an-express-server-using-typescript-dec8a51e7f8d
 */
import { PORT } from './config/constants';
import { userRouter } from './routes';
import { mainRouter } from './routes';
import { dbRouter } from "./routes";

const app = express();
app.set('view engine', 'ejs')

app.use(loggerMiddleware);
app.use(express.json());
app.use('/users', userRouter);
app.use('/db', dbRouter);
app.use('/', mainRouter);

app.listen(PORT, () => {

    console.log(`Server is listening on port ${PORT}`);

});