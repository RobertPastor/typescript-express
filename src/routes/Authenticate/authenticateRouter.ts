import express, { Request, Response } from "express";
import fileUpload from "express-fileupload";
import { log } from "../../helpers/log"

export const authenticateRouter = express.Router({

    strict: true

});

interface intData {
    userName: string,
    toolName: string
}
/**
 * authenticate a user
 */
authenticateRouter.get('/main', (req: Request, res: Response) => {

    log("authenticate router main");
    let data: intData = { userName: "", toolName: "" };
    if (req.session && req.session.userName) {
        log("req session is existing = " + JSON.stringify(req.session));
        data.userName = req.session.userName;
        data.toolName = req.session.toolName;
    }
    res.render("authenticate/authenticate.ejs", data);

});
/**
 * drop a JSON file with login , password and tool name
 */
authenticateRouter.post('/file', (req: Request, res: Response) => {

    log("authenticate router file received");
    //log(req.files);
    let data: intData = { userName: "", toolName: "" };
    if (req.files) {

        //let uploadedFiles: fileUpload.FileArray = req.files;
        let uploadedFile: fileUpload.UploadedFile = req.files.file as fileUpload.UploadedFile;
        if (uploadedFile.hasOwnProperty("data") &&
            uploadedFile.hasOwnProperty("mimetype") &&
            (uploadedFile.mimetype === "application/json")) {

            log("uploadedFile own property named mimetype = " + uploadedFile.hasOwnProperty("mimetype"))
            log("typeof mimetype = " + typeof uploadedFile.mimetype)
            //log(typeof uploadedFile.data)

            let jsonString: string = uploadedFile.data.toString();
            //log(jsonString);
            let jsonObject = JSON.parse(jsonString);
            if (req.session) {
                log("req session is existing = " + JSON.stringify(req.session));
                if (req.session.userName & req.session.toolName) {
                    log("req session username = " + req.session.userName);
                    data.userName = jsonObject.userName;
                    data.toolName = jsonObject.toolName;
                } else {
                    log("req session userName is defined")
                    req.session!["userName"] = jsonObject.userName;
                    req.session!["toolName"] = jsonObject.toolName;
                    data.userName = jsonObject.userName;
                    data.toolName = jsonObject.toolName;
                }
            } else {
                log("req session userName is defined")
                req.session!["userName"] = jsonObject.userName;
                req.session!["toolName"] = jsonObject.toolName;
            }
        }
    }
    log("authenticate file : json response is returned")
    res.json(data);

});

