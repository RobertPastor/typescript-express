
import request from 'request';
import { Response } from "request";
import { log } from '../helpers/log';

test('test request to sonar cloud', done => {

    log("===========================================================================")

    //request.debug = true;
    /**
     * in Powershell windows
     * curl.exe -v -basic RobertPastor:c410aa98569fd6a31f67473c4c6a941246ec8fa8 https://sonarcloud.io/api/webservices/list
     */

    let username: string = "RobertPastor";
    let token: string = "c410aa98569fd6a31f67473c4c6a941246ec8fa8";
    let auth: string = "Basic " + Buffer.from(username + ":" + token, "utf-8").toString("base64");
    //auth = "Basic " + username + ":" + token;
    auth = "Basic " + Buffer.from(token + ":").toString("base64");

    //log(auth)

    let url: string = 'https://sonarcloud.io/api/projects/search?p=1&ps=100&organization=Robert';
    url = "https://sonarcloud.io/api/projects/search?p=1&ps=100&organization=robertpastor";
    //url = "https://sonarcloud.io/api/webservices/list";
    url = "https://sonarcloud.io/api/user_tokens/search?login=RobertPastor";
    url = "https://sonarcloud.io/api/authentication/validate";
    log(url)
    let optionsOne = {
        uri: url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'Authorization': auth
        }
    };
    let json: any = undefined;
    request(optionsOne, (err: any, res: Response, body: any) => {
        if (err) {
            log(err)
            expect(json === undefined).toBe(true);
            done(err);
        } else {
            log("Response status code= " + JSON.stringify(res.statusCode))
            //log(JSON.stringify(res.headers))
            if (res.statusCode === 200) {
                log(JSON.stringify(body));
            }
            done();
        }
    });
})


test('test request to sonar cloud', done => {

    log("===========================================================================")

    let login: string = "RobertPastor@github";
    let token: string = "c410aa98569fd6a31f67473c4c6a941246ec8fa8";
    let auth: string = "Basic " + Buffer.from(token + ":").toString("base64");


    let url: string = "https://sonarcloud.io/api/webservices/list";
    url = "https://sonarcloud.io/api/user_tokens/search?login=" + login;
    log(url)
    let optionsTwo = {
        uri: url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            "Authorization": auth
        }
    };
    //let json: any = undefined
    request(optionsTwo, (err: any, res: Response, body: any) => {
        if (err) {
            log(err);
            expect(err != undefined).toBe(true);
            done();
        } else {

            log("Response status code= " + JSON.stringify(res.statusCode))
            //log(JSON.stringify(res.headers))
            if (res.statusCode === 200) {
                log(JSON.stringify(body));
            }
            expect(body === undefined).toBe(false);
            done();
        }

    })
}, 10000)

test('test request to sonar cloud', done => {

    log("===========================================================================")
    //request.debug = true;
    /**
     * curl.exe -v -u c410aa98569fd6a31f67473c4c6a941246ec8fa8: https://sonarcloud.io/api/user_tokens/search?login=RobertPastor@github
     */

    let organization: string = "robertpastor";
    let token: string = "c410aa98569fd6a31f67473c4c6a941246ec8fa8";
    let auth: string = "Basic " + Buffer.from(token + ":").toString("base64");

    let url: string = "https://sonarcloud.io/api/webservices/list";

    url = "https://sonarcloud.io/api/projects/search?p=1&ps=100&organization=" + organization;
    log(url)
    let options = {
        uri: url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            "Authorization": auth
        }
    };
    //let json: any = undefined
    request(options, (err: any, res: Response, body: any) => {
        if (err) {
            log(err);
            expect(err != undefined).toBe(true);
            done();
        } else {

            log("Response status code= " + JSON.stringify(res.statusCode))
            //log(JSON.stringify(res.headers))
            if (res.statusCode === 200) {
                log(JSON.stringify(body));
            }
            expect(body === undefined).toBe(false);
            done();
        }

    })
}, 10000)

/**
 * JEST done to avoid time out
 */
test('test request to sonar cloud', done => {

    log("===========================================================================")
    //request.debug = true;
    /**
     * curl.exe -v -u c410aa98569fd6a31f67473c4c6a941246ec8fa8: https://sonarcloud.io/api/user_tokens/search?login=RobertPastor@github
     */

    let username: string = "RobertPastor";
    let token: string = "c410aa98569fd6a31f67473c4c6a941246ec8fa8";
    let auth: string = "Basic " + Buffer.from(token + ":").toString("base64");

    let url = "https://sonarcloud.io/api/webservices/list";
    url = "https://sonarcloud.io/api/issues/search?p=1&ps=100&componentKeys=RobertPastor_sonar-issue-resolver-plugin&organization=robertpastor";

    log(url)
    let options = {
        uri: url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            "Authorization": auth
        }
    };
    let json: any = undefined
    request(options, (err: any, res: Response, body: any) => {
        if (err) {
            log(err);
            expect(json === undefined).toBe(true);
            done(err);
        } else {

            log("Response status code= " + JSON.stringify(res.statusCode))
            //log(JSON.stringify(res.headers))
            if (res.statusCode === 200) {
                log(JSON.stringify(body));
            }
            expect(body === undefined).toBe(false);
            done();
        }
    })
}, 10000)