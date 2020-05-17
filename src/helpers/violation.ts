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

    _id: string;
    _ruleId: string;
    _title: string;
    _severity: ATMSeverity;
    _issueType: IssueType;
    _status: Status;

    // Computer Software Unit
    // src/main/java/com.thales....
    // src/main/java/com/thales/airsystems/sonar/plugin/issueresolver/ws/UpdateAction.java
    _CSU: string;

    constructor(violationId: string, violatedRuleId: string, violationTitle: string,
        severity: ATMSeverity, issueType: IssueType, status: Status, CSU: string) {

        this._id = violationId;
        this._ruleId = violatedRuleId;
        this._title = violationTitle;
        this._severity = severity;
        this._issueType = issueType;
        this._status = status;
        this._CSU = CSU;

    }

    get getId(): string {
        return this._id;
    }
    set setId(id: string) {
        this._id = id;
    }
}

class ViolationArray {
    _violationArray: Array<Violation>;
    constructor() {
        this._violationArray = [];
    }
    size(): number {
        return this._violationArray.length;
    }
    push(violation: Violation): number {
        return this._violationArray.push(violation);
    }
    pop(): Violation {
        return this._violationArray.pop();
    }

}

export { Violation, ViolationArray, ATMSeverity, IssueType, Status };