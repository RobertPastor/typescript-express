
interface poolConstantsInterface {
    host : string;
    port : number;
    user: string;
    password: string;
    database: string;
}

let poolConstants : poolConstantsInterface = {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "bobby1xx",
    database: "node-postgres",
};

export = poolConstants;