
import request from 'request';
import { Response } from "request";
import { log } from '../helpers/log';

test('test request to sonar cloud', done => {

    //request.debug = true;
    /**
     * in Powershell windows
     * curl.exe -v -basic RobertPastor:c410aa98569fd6a31f67473c4c6a941246ec8fa8 https://sonarcloud.io/api/webservices/list
     */

    let username: string = "RobertPastor";
    let token: string = "c410aa98569fd6a31f67473c4c6a941246ec8fa8";
    let auth: string = "Basic " + Buffer.from(username + ":" + token, "utf-8").toString("base64");
    //auth = "Basic " + username + ":" + token;
    log(auth)

    let url: string = 'https://sonarcloud.io/api/projects/search?p=1&ps=100&organization=Robert';
    url = "https://sonarcloud.io/api/projects/search?p=1&ps=100&organization=robertpastor";
    //url = "https://sonarcloud.io/api/webservices/list";
    url = "https://sonarcloud.io/api/user_tokens/search?login=RobertPastor";
    url = "https://sonarcloud.io/api/authentication/validate";
    let optionsOne = {
        uri: url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            "auth": {
                'user': username,
                'pass': token,
            }
        }
    };
    let json: any = undefined

    request(optionsOne, (err: any, res: Response, body: any) => {
        if (err) {
            log(err)
            expect(json === undefined).toBe(true);
            done(err);
        } else {
            log(JSON.stringify(res))
            log(JSON.stringify(res.headers))
            if (res.statusCode === 200) {
                log(JSON.stringify(body));

                url = "https://sonarcloud.io/api/webservices/list";
                let optionsTwo = {
                    uri: url,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Accept-Charset': 'utf-8',
                        "auth": {
                            'user': username,
                            "pass": token
                        }
                    }
                };

                request(optionsTwo, (err: any, res: Response, body: any) => {
                    if (err) {
                        log(err)
                        expect(json === undefined).toBe(true);
                        done(err);
                    } else {

                        //log(JSON.stringify(res))
                        if (res.statusCode === 200) {
                            log(JSON.stringify(body));
                        }
                    }
                    expect(body === undefined).toBe(false);
                    done()
                })

            }
        }
    });

})

