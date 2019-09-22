"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var routes_1 = require("./router/routes");
var response_handlers_1 = require("./handlers/response-handlers");
// import AuthService from '../modules/auth/auth-service';
var secret = require('../config/env').secret;
var CoreModule = /** @class */ (function () {
    function CoreModule() {
        this._express = express();
        // this.authService = new AuthService(secret).setStrategy();
        this.configExpress();
        this.routerModule = new routes_1.RouterModule(this.express);
        this.router();
    }
    Object.defineProperty(CoreModule.prototype, "express", {
        get: function () {
            return this._express;
        },
        enumerable: true,
        configurable: true
    });
    CoreModule.prototype.configExpress = function () {
        // this.express.use(this.configHeaders.bind(this));
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(response_handlers_1.default.errorHandlerApi);
        // this.express.use(this.authService.initialize());
    };
    CoreModule.prototype.router = function () {
        // this.routerModule.exposeRoutes(this.authService.autenticate);
        console.log('CoreModule router - PASSEI AQUI 1');
        this.routerModule.exposeRoutes();
    };
    CoreModule.prototype.configHeaders = function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        next();
    };
    return CoreModule;
}());
exports.CoreModule = CoreModule;
