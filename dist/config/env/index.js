require('custom-env').env();
var _a = process.env, NODE_ENV = _a.NODE_ENV, DB_NAME = _a.DB_NAME, DB_DIALECT = _a.DB_DIALECT, DB_USERNAME = _a.DB_USERNAME, DB_PASSWORD = _a.DB_PASSWORD, DB_HOST = _a.DB_HOST, HOST = _a.HOST, SERVER_PORT = _a.SERVER_PORT, DB_PORT = _a.DB_PORT, AUTH_SECRET = _a.AUTH_SECRET;
module.exports = {
    enviroment: NODE_ENV,
    database: DB_NAME,
    dialect: DB_DIALECT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dbHost: DB_HOST,
    host: HOST,
    serverPort: SERVER_PORT,
    pgPort: DB_PORT,
    secret: AUTH_SECRET,
    dbURL: "postgres://" + DB_USERNAME + ":" + DB_PASSWORD + "@" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME
};
