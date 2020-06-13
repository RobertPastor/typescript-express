
import { log } from "../helpers/log";
import request, { Response } from "request";

interface SonarCloudResponse {
    err?: string,
    statusCode?: number,
    responseArray: Array<any>
}

export interface SonarOptions {
    token: string,
    api: string,
    organization?: string,
    login?: string,
    projectKey?: string
    return: string
}

export class SonarCloudController {

    private getPages(options: SonarOptions, pageIndex: number, pageSize: number): Promise<SonarCloudResponse> {

        return new Promise((resolve, reject) => {

            let sonarResponse = <SonarCloudResponse>{};
            sonarResponse.responseArray = [];
            function nextPage(pageIndex: number) {

                let auth: string = "Basic " + Buffer.from(options.token + ":").toString("base64");
                let uri = "https://sonarcloud.io/api/" + options.api + "?p=" + String(pageIndex) + "&ps=" + String(pageSize);

                if (options.organization) {
                    uri += "&organization=" + options.organization;
                }
                if (options.projectKey) {
                    uri += "&componentKeys=" + options.projectKey;
                }
                let requestOptions = {
                    uri: uri,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Accept-Charset': 'utf-8',
                        'Authorization': auth
                    }
                };
                request(requestOptions, (err: any, res: Response, body: any) => {
                    if (err) {
                        log(err)
                        sonarResponse.err = err;
                        reject(sonarResponse);

                    } else {
                        log("Response status code= " + JSON.stringify(res.statusCode))
                        if (res.statusCode === 200) {
                            //log(JSON.stringify(body));
                            // body is a string => convert to an object
                            body = JSON.parse(body)
                            if (options.return && body.hasOwnProperty(options.return)) {
                                sonarResponse.responseArray = sonarResponse.responseArray.concat(body[options.return])
                            }
                            sonarResponse.statusCode = res.statusCode;
                            let currentTotal = pageIndex * pageSize;
                            if (body.hasOwnProperty("paging")) {
                                log("response body has property paging = " + JSON.stringify(body.paging));
                                let total = body.paging.total;
                                if (currentTotal < total) {
                                    pageIndex = pageIndex + 1;
                                    nextPage(pageIndex);
                                } else {
                                    log("it is finished");
                                    resolve(sonarResponse);
                                }
                            } else {
                                reject("Response Body has no property paging as expected")
                            }
                        } else {
                            reject("Status Code not 2XX as expected = " + String(res.statusCode))
                        }
                    }
                });
            }
            nextPage(pageIndex)
        })

    }

    private getPaginated(options: SonarOptions): Promise<SonarCloudResponse> {

        return new Promise((resolve, reject) => {

            //request.debug = true;
            let pageIndex: number = 1;
            let pageSize: number = 2;
            this.getPages(options, pageIndex, pageSize)
                .then(response => {
                    resolve(response)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }


    public getProjects(token: string, organization: string): Promise<SonarCloudResponse> {

        return new Promise((resolve, reject) => {
            // components is the name of the array returned by SonarCloud
            let options: SonarOptions = { token: token, api: "projects/search", organization: organization, return: "components" }
            this.getPaginated(options)
                .then(response => {
                    log(JSON.stringify(response));
                    resolve(response);
                })
                .catch(err => {
                    log(err);
                    reject(err);
                })
        })
    }

    public getIssues(token: string, organization: string, projectKey: string): Promise<SonarCloudResponse> {

        return new Promise((resolve, reject) => {

            let options: SonarOptions = { token: token, api: "issues/search", organization: organization, projectKey: projectKey, return: "issues" }
            this.getPaginated(options)
                .then(response => {
                    //log(JSON.stringify(response));
                    resolve(response);
                })
                .catch(err => {
                    log(err);
                    reject(err);
                })
        })
    }
}