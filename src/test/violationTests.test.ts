
import { Violation, ATMSeverity, IssueType, Status } from '../helpers/violation';
import { log } from '../helpers/log';


test('should return true as constructor is OK', () => {
    let violationId = "XXXWWjs"
    let violation = new Violation(violationId, "ruleId", "title",
        ATMSeverity.MINOR, IssueType.Quality, Status.OPEN, "com.test.domain");
    log(violation.getId);
    expect(violation.getId === violationId).toBe(true);
})
