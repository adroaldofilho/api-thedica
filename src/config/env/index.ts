require('custom-env').env();
const {
    NODE_ENV,
    DB_NAME,
    DB_DIALECT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    HOST,
    SERVER_PORT,
    DB_PORT,
    AUTH_SECRET
} = process.env;

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
    dbURL: `postgres://${ DB_USERNAME }:${ DB_PASSWORD }@${ DB_HOST }:${ DB_PORT }/${ DB_NAME }`,
    dbURLHeroku: 'postgres://jdtqqynpialfga:40822dd143a0df7e93e94cfcd871596cb4b0a945b45275b8131a4459805be5f6@ec2-54-83-33-14.compute-1.amazonaws.com:5432/d8stbk0l34b47h'

}