"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
var jwt = require("jwt-simple");
var bcrypt = require("bcrypt");
var secret = require('../../config/env').secret;
var ResponseHandlers = /** @class */ (function () {
    function ResponseHandlers() {
    }
    ResponseHandlers.prototype.authFail = function (req, res) {
        res.sendStatus(HTTPStatus.UNAUTHORIZED);
    };
    ResponseHandlers.prototype.authSuccess = function (res, password, user) {
        var isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            var payload = { id: user.id };
            res.json({
                token: jwt.encode(payload, secret)
            });
        }
        else {
            res.sendStatus(HTTPStatus.UNAUTHORIZED);
        }
    };
    ResponseHandlers.prototype.onError = function (res, message, err) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
    };
    ResponseHandlers.prototype.onSuccess = function (res, data) {
        res.status(HTTPStatus.OK).json({ payload: data });
    };
    ResponseHandlers.prototype.errorHandlerApi = function (err, req, res, next) {
        res.status(500).json({
            errorCode: 'ERR-001',
            message: 'Erro interno do servidor'
        });
    };
    ResponseHandlers.prototype.dbErrorHandler = function (res, err) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            code: 'ERRO-001',
            message: 'Erro ao criar usuário'
        });
    };
    return ResponseHandlers;
}());
exports.default = new ResponseHandlers();
