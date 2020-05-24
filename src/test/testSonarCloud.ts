
import { log } from "../helpers/log";
import { SonarCloudController } from "../sonarCloud/sonarCloud"

function startScript() {

    let sonarCloud = new SonarCloudController()
    let token: string = "c410aa98569fd6a31f67473c4c6a941246ec8fa8";
    let organization = "robertpastor";
    let projectKey = "RobertPastor_sonar-issue-resolver-plugin";
    sonarCloud.getIssues(token, organization, projectKey)
        .then(response => {
            log(JSON.stringify(response))

        })
        .catch(err => {
            log(err)

        })
}
startScript()