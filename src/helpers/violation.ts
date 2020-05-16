/**
 * 16 May 2020
 * The content of the Violation class must be inline with the data returned by SonarQube
 */
enum Status {
    OPEN = "OPEN",
    ANALYSED = "ANALYSED",
    UNRESOLVED = "UNRESOLVED"
}

enum IssueType {
    Quality = "Quality",
    Safety = "Safety"
}

enum ATMSeverity {
    MINOR = "MINOR",
    MAJOR = "MAJOR",
    CRITICAL = "CRITICAL"
}

class Violation {

    id: string;
    ruleId: string;
    title: string;
    severity: ATMSeverity;
    issueType: IssueType;
    status: Status;

    // Computer Software Unit
    // src/main/java/com.thales....
    // src/main/java/com/thales/airsystems/sonar/plugin/issueresolver/ws/UpdateAction.java
    CSU: string;

    constructor(violationId: string, violatedRuleId: string, violationTitle: string,
        severity: ATMSeverity, issueType: IssueType, status: Status, CSU: string) {

        this.id = violationId;
        this.ruleId = violatedRuleId;
        this.title = violationTitle;
        this.severity = severity;
        this.issueType = issueType;
        this.status = status;
        this.CSU = CSU;

    }

    get getId(): string {
        return this.id;
    }
    set setId(_id: string) {
        this.id = _id;
    }
}

export { Violation, ATMSeverity, IssueType, Status };