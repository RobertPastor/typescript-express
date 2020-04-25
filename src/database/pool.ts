import { Pool } from 'pg';

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "bobby1xx",
    database: "node-postgres",
});

export = pool;