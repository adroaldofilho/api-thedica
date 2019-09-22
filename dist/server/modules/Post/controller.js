"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = require("./service");
var handlers_1 = require("../../api/responses/handlers");
var _ = require("lodash");
var PostController = /** @class */ (function () {
    function PostController() {
    }
    PostController.prototype.getAll = function (req, res) {
        service_1.default
            .getAll()
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao buscar todos os posts'));
    };
    PostController.prototype.createPost = function (req, res) {
        service_1.default
            .create(req.body)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.dbErrorHandler, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao incluir post'));
    };
    PostController.prototype.getById = function (req, res) {
        var postId = parseInt(req.params.id);
        service_1.default
            .getById(postId)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Post não encontrado'));
    };
    PostController.prototype.updatePost = function (req, res) {
        var postId = parseInt(req.params.id);
        var props = req.body;
        service_1.default
            .update(postId, props)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao atualizar o post'));
    };
    PostController.prototype.deletePost = function (req, res) {
        var postId = parseInt(req.params.id);
        service_1.default
            .delete(postId)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao excluir o post'));
    };
    return PostController;
}());
exports.default = new PostController();
