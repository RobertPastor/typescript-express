import express , {Request, Response} from "express";
import poolConstants from "../../database/dbConfig";
import { Pool } from 'pg';

export const dbRouter = express.Router({

    strict: true

});

/**
 * GRANT usage on schema public to postgres;
 */
dbRouter.get('/projects', (req: Request, res: Response) => {

    let pool = new Pool ( poolConstants);

    console.log("main database router get /projects ");

    let query = 'SELECT Id, Name FROM public."Projects" '
    query = " SELECT NOW() "
    query = "select rolcreatedb from pg_roles where rolname = current_user "
    query = 'SELECT * FROM public."Projects" '
    pool.query(query, (err , resp) => {
        console.log(err, resp)
        console.log ( "row count = " + resp.rowCount )
        //res.json({ message: 'GET /db request received' })

        let data = {
            "title": "Database projects",
            "nuProjects": resp.rowCount,
            "rows": resp.rows
        }
        res.render("./db/projects.ejs", data);
        pool.end()
      })
    
});

dbRouter.get('/tools', (req: Request, res: Response) => {

    let pool = new Pool ( poolConstants);

    console.log("main database router get /tools ");

    let query = 'SELECT Id, Name FROM public."Tools" '
    query = " SELECT NOW() "
    query = "select rolcreatedb from pg_roles where rolname = current_user "
    query = 'SELECT * FROM public."Tools" '
    pool.query(query, (err , resp) => {
        console.log(err, resp)
        console.log ( "row count = " + resp.rowCount )
        //res.json({ message: 'GET /db request received' })

        let data = {
            "title": "Database Tools",
            "nbTools": resp.rowCount,
            "rows": resp.rows
        }
        res.render("./db/tools.ejs", data);
        pool.end()
      })
    
});