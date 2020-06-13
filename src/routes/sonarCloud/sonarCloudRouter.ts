import express, { Request, Response } from "express";
import { log } from "../../helpers/log";
import { SonarCloudController } from "../../sonarCloud/sonarCloud";

export const sonarCloudRouter = express.Router({

    strict: true

});

/**
 * query sonar Cloud to return the list of projects
 */
sonarCloudRouter.get('/projects', (req: Request, res: Response) => {

    log("sonar Cloud router get projects received");

    let sonarCloud = new SonarCloudController()
    let token: string = "c410aa98569fd6a31f67473c4c6a941246ec8fa8";
    let organization = "robertpastor";
    sonarCloud.getProjects(token, organization)
        .then(response => {
            log(JSON.stringify(response));
            //res.json({ response: response });
            res.render("./sonarCloud/projects.ejs", response)

        })
        .catch(err => {
            log(err);
            res.render("./error.ejs", err);
        })

});