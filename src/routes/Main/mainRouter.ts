import express , {Request, Response} from "express";


export const mainRouter = express.Router({

    strict: true

});


mainRouter.get('/', (req: Request, res: Response) => {

    console.log("main router get / ");
    let data = {
        "title": "Main Site Page",
        "contents": "text."
    }
    res.render("./main.ejs", data);

});