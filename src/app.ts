//console.log('Hello');
import express from 'express';
import { loggerMiddleware} from './middleware/loggerMiddleware';
import fileUpload from "express-fileupload";
import session from "express-session";
import connectPgSimple from 'connect-pg-simple';
import { Pool, PoolConfig } from "pg";
import poolConstants from "./database/dbConfig";

/**
 * https://medium.com/better-programming/create-an-express-server-using-typescript-dec8a51e7f8d
 */
import { PORT } from './config/constants';
import { userRouter } from './routes';
import { mainRouter } from './routes';
import { dbRouter } from "./routes";
import { authenticateRouter } from "./routes";

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(loggerMiddleware);
app.use(express.json());
app.use(fileUpload());

let pgStoreOptions: connectPgSimple.PGStoreOptions = {
  pool : new Pool(poolConstants),
  schemaName : "public",
  tableName : "session",
    /*
    connection string is built by following the syntax:
    postgres://USERNAME:PASSWORD@HOST_NAME:PORT/DB_NAME
    */
   conString: "postgres://postgres:bobby1xx@localhost:5432/node-postgres"
}
/*
* sessions are used to store permanent data while changing the site tabs
*/
let pgStore = connectPgSimple(session);
const storeOne: session.Store = new pgStore(pgStoreOptions);

let sessionOptions : session.SessionOptions = {
    secret: "foo",
    resave : true,
    saveUninitialized : false,
    store : storeOne
  };
  
app.use(session(sessionOptions));

app.use('/users', userRouter);
app.use('/db', dbRouter);
app.use('/authenticate', authenticateRouter);
app.use('/', mainRouter);

app.listen(PORT, () => {

    console.log(`Server is listening on port ${PORT}`);

});