import express , {Request, Response} from "express";
import pool from "../../database/pool";

export const dbRouter = express.Router({

    strict: true

});

/**
 * GRANT usage on schema public to postgres;
 */
dbRouter.get('/', (req: Request, res: Response) => {

    console.log("main database router get / ");

    pool.query('SELECT Id, Name FROM Projects  ', (err , resp) => {
        console.log(err, resp)
        res.json({ message: 'GET /db request received' })
        //pool.end()
      })
    

});