import express , {Request, Response} from "express";

export const authenticateRouter = express.Router({

    strict: true

});

/**
 * authenticate a user
 */
authenticateRouter.get('/', (req: Request, res: Response) => {

    console.log("authenticate router");
    res.render("./authenticate/authenticate.ejs");

});

authenticateRouter.post('/file', (req: Request, res: Response) => {

    console.log("authenticate router");
    console.log(req.files);
    console.log(req.hasOwnProperty("files"));
    res.render("./authenticate/authenticate.ejs");

});