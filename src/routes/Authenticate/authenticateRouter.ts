import express , {Request, Response} from "express";
import fileUpload from "express-fileupload";

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
    //console.log(req.files);
    console.log("req has own property named files = " + req.hasOwnProperty("files"));
      
    if (req.files ){
    
            let uploadedFiles : fileUpload.FileArray  = req.files ;
            let uploadedFile : fileUpload.UploadedFile = req.files.file as fileUpload.UploadedFile;
            if ( uploadedFile.hasOwnProperty("data") &&
                uploadedFile.hasOwnProperty("mimetype") &&
                (uploadedFile.mimetype === "application/json")) {
    
                console.log("req.files.file own property named mimetype = " + uploadedFile.hasOwnProperty("mimetype"))
                console.log("typeof mimetype = " + typeof uploadedFile.mimetype)
                //console.log(typeof uploadedFile.data)
                let jsonString : string = uploadedFile.data.toString();
                console.log (jsonString);
                let jsonObject = JSON.parse(jsonString);
                if ( req.session ) {
                    console.log("req session is existing = "  + req.session);
                    if (req.session.userName) {
                        console.log("req session username = "  + req.session.userName)
                    } else {
                        console.log("req session userName is defined")
                        req.session!["userName"] = jsonObject.userName;
                    }
                } else {
                    console.log("req session userName is defined")
                    req.session!["userName"] = jsonObject.userName;
                }
            }
        }
    res.render("./authenticate/authenticate.ejs");

});