
import { log } from "../helpers/log";
import { SonarCloudController } from "../sonarCloud/sonarCloud";

test('test Sonar Cloud get Projects', done => {

    let sonarCloud = new SonarCloudController()
    let token: string = "c410aa98569fd6a31f67473c4c6a941246ec8fa8";
    let organization = "robertpastor";
    sonarCloud.getProjects(token, organization)
        .then(response => {
            log(JSON.stringify(response))
            done()
        })
        .catch(err => {
            log(err)
            done()
        })

}, 10000);


test('test Sonar Cloud get Projects', done => {

    let sonarCloud = new SonarCloudController()
    let token: string = "c410aa98569fd6a31f67473c4c6a941246ec8fa8";
    let organization = "robertpastor";
    let projectKey = "RobertPastor_sonar-issue-resolver-plugin";
    sonarCloud.getIssues(token, organization, projectKey)
        .then(response => {
            log(JSON.stringify(response))
            done()
        })
        .catch(err => {
            log(err)
            done()
        })

}, 10000);