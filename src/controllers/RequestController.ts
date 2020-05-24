
import { Response } from "request";

import { SonarOptions } from "../sonarCloud/sonarCloud"

export abstract class RequestController {

    public abstract get(options: SonarOptions, res: Response): any;

    public abstract getPaginated(options: SonarOptions, res: Response): void;

}