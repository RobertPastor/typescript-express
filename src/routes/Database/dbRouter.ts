import express, { Request, Response } from "express";
import poolConstants from "../../database/dbConfig";
import { Pool } from 'pg';
import { log } from "../../helpers/log";

export const dbRouter = express.Router({

    strict: true

});

interface intData {
    userName: string,
    title: string,
    nbItems: number,
    rows: any
}

/**
 * GRANT usage on schema public to postgres;
 */
dbRouter.get('/projects', (req: Request, res: Response) => {

    let userName: string;
    if (req.session && req.session.userName) {
        log("req session user name = " + req.session.userName);
        userName = req.session.userName;
    }

    let pool = new Pool(poolConstants);

    log("main database router get /projects ");

    let query = 'SELECT Id, Name FROM public."Projects" '
    query = " SELECT NOW() "
    query = "select rolcreatedb from pg_roles where rolname = current_user "
    query = ' SELECT "Id", "Name" FROM public."Projects" '
    pool.query(query, (err, resp) => {
        if (err) {
            log(err.message);
            pool.end();
        } else {
            //log( resp)
            log("row count = " + resp.rowCount)
            //res.json({ message: 'GET /db request received' })
            let data: intData = {
                "userName": userName,
                "title": "Database projects",
                "nbItems": resp.rowCount,
                "rows": resp.rows
            }
            res.render("./db/projects.ejs", data);
            pool.end();
        }
    })
});

dbRouter.get('/projects/:id', (req: Request, res: Response) => {

    let userName: string;
    if (req.session && req.session.userName) {
        log("req session user name = " + req.session.userName);
        userName = req.session.userName;
    }
    log('selected project id = ' + req.params.id)
    res.json({ projectId: req.params.id });

})

dbRouter.get('/tools', (req: Request, res: Response) => {

    log("dbRouter get tools");
    let userName: string;
    if (req.session && req.session.userName) {
        log("req session user name = " + req.session.userName);
        userName = req.session.userName;
    }

    let pool = new Pool(poolConstants);

    log("main database router get /tools ");

    let query = 'SELECT Id, Name FROM public."Tools" '
    query = " SELECT NOW() "
    query = "select rolcreatedb from pg_roles where rolname = current_user "
    query = 'SELECT "Id", "Name" FROM public."Tools" '
    pool.query(query, (err, resp) => {
        if (err) {
            log(err.message);
            pool.end();
        } else {
            //log( resp)
            log("row count = " + resp.rowCount)
            //res.json({ message: 'GET /db request received' })

            let data = {
                "userName": userName,
                "title": "Database Tools",
                "nbItems": resp.rowCount,
                "rows": resp.rows
            }
            res.render("./db/tools.ejs", data);
            pool.end();
        }
    })

});

dbRouter.get('/violations', (req: Request, res: Response) => {

    log("dbRouter get violations");
    let userName: string;
    if (req.session && req.session.userName) {
        log("req session user name = " + req.session.userName);
        userName = req.session.userName;
    }

    let pool = new Pool(poolConstants);

    log("main database router get /violations ");

    let query = ' SELECT h1."Id", "ViolationId", "RuleId" , "ViolationTitle" , h2."Severity", h3."IssueType" , '
    query += ' h4."Status", "ComputerSwUnit" ';
    query += ' FROM public."Violations" h1 ';
    query += ' INNER JOIN public."ATMSeverity" h2 on h1."Severity" = h2."Id" ';
    query += ' INNER JOIN public."IssueType" h3 on h1."IssueType" = h3."Id" ';
    query += ' INNER JOIN public."Status" h4 on h1."Status" = h4."Id" ';
    pool.query(query, (err, results) => {
        if (err) {
            log(err.message);
            pool.end();
        } else {
            //log( resp)
            log("row count = " + results.rowCount);

            let data = {
                "userName": userName,
                "title": "Violations",
                "nbItems": results.rowCount,
                "rows": results.rows
            }
            res.render("./db/violations.ejs", data);
            pool.end();
        }
    })

});