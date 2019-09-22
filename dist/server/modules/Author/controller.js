"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = require("./service");
var handlers_1 = require("../../api/responses/handlers");
var _ = require("lodash");
var AuthorController = /** @class */ (function () {
    function AuthorController() {
    }
    AuthorController.prototype.getAll = function (req, res) {
        service_1.default
            .getAll()
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao buscar todos os autores'));
    };
    AuthorController.prototype.createAuthor = function (req, res) {
        service_1.default
            .create(req.body)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.dbErrorHandler, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao incluir autor'));
    };
    AuthorController.prototype.getById = function (req, res) {
        var authorId = parseInt(req.params.id);
        service_1.default
            .getById(authorId)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Autor não encontrado'));
    };
    AuthorController.prototype.updateAuthor = function (req, res) {
        var authorId = parseInt(req.params.id);
        var props = req.body;
        service_1.default
            .update(authorId, props)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao atualizar o autor'));
    };
    AuthorController.prototype.deleteAuthor = function (req, res) {
        var autorId = parseInt(req.params.id);
        service_1.default
            .delete(autorId)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao excluir o autor'));
    };
    return AuthorController;
}());
exports.default = new AuthorController();
