import express, { Request, Response, json } from "express";
import fileUpload from "express-fileupload";
import { log } from "../../helpers/log"

export const authenticateRouter = express.Router({

    strict: true

});

/**
 * authenticate a user
 */
authenticateRouter.get('/main', (req: Request, res: Response) => {

    log("authenticate router");
    let data = { "userName": undefined };
    if (req.session && req.session.userName) {
        log("req session is existing = " + JSON.stringify(req.session));
        data.userName = req.session.userName;
    }
    res.render("authenticate/authenticate.ejs", data);

});

authenticateRouter.post('/file', (req: Request, res: Response) => {

    log("authenticate router");
    //log(req.files);
    let data = { "userName": undefined };
    if (req.files) {

        let uploadedFiles: fileUpload.FileArray = req.files;
        let uploadedFile: fileUpload.UploadedFile = req.files.file as fileUpload.UploadedFile;
        if (uploadedFile.hasOwnProperty("data") &&
            uploadedFile.hasOwnProperty("mimetype") &&
            (uploadedFile.mimetype === "application/json")) {

            log("uploadedFile own property named mimetype = " + uploadedFile.hasOwnProperty("mimetype"))
            log("typeof mimetype = " + typeof uploadedFile.mimetype)
            //log(typeof uploadedFile.data)

            let jsonString: string = uploadedFile.data.toString();
            log(jsonString);
            let jsonObject = JSON.parse(jsonString);
            if (req.session) {
                log("req session is existing = " + JSON.stringify(req.session));
                if (req.session.userName) {
                    log("req session username = " + req.session.userName);
                    data.userName = jsonObject.userName;
                } else {
                    log("req session userName is defined")
                    req.session!["userName"] = jsonObject.userName;
                    data.userName = jsonObject.userName;
                }
            } else {
                log("req session userName is defined")
                req.session!["userName"] = jsonObject.userName;
            }
        }
    }
    log("response is rendering")
    res.json(data);

});

