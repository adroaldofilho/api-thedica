import * as http from 'http';
import { CoreModule } from '../core/core';
const { serverPort , enviroment } = require('../config/env');
export class Server {
    
    private db;
    private express;

    constructor(dataBaseConnector){
        // this.express = new CoreModule().express;
        // this.upServer();
        // console.log(dataBaseConnector);
        if (dataBaseConnector){
            this.db = dataBaseConnector;
            this.express = new CoreModule().express;
            this.syncDataBase();
        }
    }

    private async syncDataBase(){
        try {
            const syncData = await this.db.sync();
            this.dataBaseSyncHandler(syncData);
        } catch (error) {
            this.dataBaseErrorHandler(error)
        }
    }

    private dataBaseErrorHandler(error: any) {
        console.log(`Não foi possível conectar ao banco de dados. Erro: ${error}`);
        this.upServer();
    }

    private dataBaseSyncHandler(dataBaseInfo: any) {
        const { options, config, modelManager } = dataBaseInfo;
        const { models } = modelManager;
        this.upServer();
        this.logDataBaseConnection({models, options, config});
    }

    private upServer() {
        const PORT = process.env.PORT || 5000;

        http
            .createServer(this.express)
            .listen(PORT)
            .on('listening', this.onServerUp.bind(this, PORT))
            .on('error', this.onServerStartUpError.bind(this));
    }

    private logDataBaseConnection({ models, options, config }) {
        const { dialect, host } = options;
        const { database, port } = config;
        if (dialect && host && database && port && models){
            console.log(`Database dialect: ${dialect}`);
            console.log(`Database host: ${host}`);
            console.log(`Database name: ${database}`);
            console.log(`Database port: ${port}`);
            console.log(`Created tables ${models}`);
        }
    }

    private onServerUp(serverPort: number){
        console.log(`Servidor executando na porta ${serverPort} - no ambiente de ${enviroment}`);
    }

    private onServerStartUpError(error: NodeJS.ErrnoException){
        console.log(`ERRO NA INICIAÇÃO DO SERVIDOR: ${error}`);
    }
}
