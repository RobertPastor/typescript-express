import express , {Request, Response} from "express";
import poolConstants from "../../database/dbConfig";
import { Pool } from 'pg';

export const dbRouter = express.Router({

    strict: true

});

/**
 * GRANT usage on schema public to postgres;
 */
dbRouter.get('/', (req: Request, res: Response) => {

    let pool = new Pool ( poolConstants);

    console.log("main database router get / ");
    let query = 'SELECT Id, Name FROM public."Projects" '
    query = " SELECT NOW() "
    query = "select rolcreatedb from pg_roles where rolname = current_user "
    query = 'SELECT * FROM public."Projects" '
    pool.query(query, (err , resp) => {
        console.log(err, resp)
        res.json({ message: 'GET /db request received' })
        pool.end()
      })
    

});