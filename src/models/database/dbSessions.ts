
import connectPgSimple from 'connect-pg-simple';
import { Pool } from "pg";
import poolConstants from "./dbConfig";
import session from "express-session";

let pgStoreOptions: connectPgSimple.PGStoreOptions = {
    pool: new Pool(poolConstants),
    schemaName: "public",
    tableName: "session",
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

let sessionOptions: session.SessionOptions = {
    secret: "azertyuiopqsdfghjklmwxcvbn",
    resave: true,
    saveUninitialized: false,
    store: storeOne
};

export = sessionOptions;