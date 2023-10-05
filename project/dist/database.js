"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = new pg_1.Pool({
    // host: 'localhost',
    // user: 'postgres',
    // password: '1997',
    // database: 'test',
    // port: 5432
    connectionString: "postgres://gocawqdd:26H54YOPkqVLxRoZSSKT4ovW9vXWnAne@balarama.db.elephantsql.com/gocawqdd",
});
