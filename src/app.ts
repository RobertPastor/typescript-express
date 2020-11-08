//console.log('Hello');
import express, { Request, Response, NextFunction } from 'express';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import fileUpload from "express-fileupload";
import session from "express-session";
import sessionOptions from "./models/database/dbSessions";
import bodyParser from 'body-parser';

/**
 * https://medium.com/better-programming/create-an-express-server-using-typescript-dec8a51e7f8d
 */
import { PORT } from './config/constants';
import { userRouter } from './routes';
import { mainRouter } from './routes';
import { dbRouter } from "./routes";
import { authenticateRouter } from "./routes";
import { sonarCloudRouter } from "./routes";

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(loggerMiddleware);
//app.use(express.json());
app.use(fileUpload());
app.use(session(sessionOptions));

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req: Request, res: Response, next: NextFunction) => {
  // purpose is to set locals for presenting the data read in the authentication file
  if (req && req.hasOwnProperty("session") && req.session.hasOwnProperty("userName") &&
    req.session.hasOwnProperty("toolName")) {
    res.locals.userName = req.session.userName;
    res.locals.toolName = req.session.toolName;
  }
  next();
});

app.use('/users', userRouter);
app.use('/db', dbRouter);
app.use('/sonar', sonarCloudRouter);
app.use('/authenticate', authenticateRouter);
app.use('/favicon.ico', express.static('/images/favicon.ico'));
app.use('/', mainRouter);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});