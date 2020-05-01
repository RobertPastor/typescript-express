import express , {Request, Response, json} from "express";
import fileUpload from "express-fileupload";

export const authenticateRouter = express.Router({

    strict: true

});

/**
 * authenticate a user
 */
authenticateRouter.get('/main', (req: Request, res: Response) => {

    console.log("authenticate router");
    let data = { "userName" : undefined};
    if ( req.session && req.session.userName ) {
        console.log("req session is existing = "  + JSON.stringify(req.session));
        data.userName = req.session.userName;
    }
    res.render("authenticate/authenticate.ejs" , data);

});

authenticateRouter.post('/file', (req: Request, res: Response) => {

    console.log("authenticate router");
    //console.log(req.files);
    let data = { "userName" : undefined};
    if ( req.files ){
    
            let uploadedFiles : fileUpload.FileArray  = req.files ;
            let uploadedFile : fileUpload.UploadedFile = req.files.file as fileUpload.UploadedFile;
            if ( uploadedFile.hasOwnProperty("data") &&
                uploadedFile.hasOwnProperty("mimetype") &&
                (uploadedFile.mimetype === "application/json")) {
    
                console.log("uploadedFile own property named mimetype = " + uploadedFile.hasOwnProperty("mimetype"))
                console.log("typeof mimetype = " + typeof uploadedFile.mimetype)
                //console.log(typeof uploadedFile.data)
                let jsonString : string = uploadedFile.data.toString();
                console.log (jsonString);
                let jsonObject = JSON.parse(jsonString);
                if ( req.session ) {
                    console.log("req session is existing = "  + JSON.stringify(req.session));
                    if (req.session.userName) {
                        console.log("req session username = "  + req.session.userName);
                        data.userName = jsonObject.userName;
                    } else {
                        console.log("req session userName is defined")
                        req.session!["userName"] = jsonObject.userName;
                        data.userName = jsonObject.userName;
                    }
                } else {
                    console.log("req session userName is defined")
                    req.session!["userName"] = jsonObject.userName;
                }
            }
        }
    console.log("response is rendering")
    res.json( data );

});

