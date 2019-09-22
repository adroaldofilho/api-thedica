"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var author_model_1 = require("./author.model");
var model = require('../../entities');
var AuthorService = /** @class */ (function () {
    function AuthorService() {
    }
    AuthorService.prototype.create = function (author) {
        return model.Author.create(author);
    };
    AuthorService.prototype.getAll = function () {
        return model.Author.findAll({
            order: ['name'],
            include: [{ model: model.Post }]
        })
            .then(author_model_1.createAuthors);
    };
    AuthorService.prototype.getById = function (id) {
        return model.Author.findOne({
            where: { id: id },
            include: [{ model: model.Post }]
        })
            .then(author_model_1.createAuthor);
    };
    AuthorService.prototype.update = function (id, author) {
        return model.Author.update(author, {
            where: { id: id },
            fields: ['name'],
            hooks: true,
            individualHooks: true
        });
    };
    AuthorService.prototype.delete = function (id) {
        return model.Author.destroy({
            where: { id: id }
        });
    };
    return AuthorService;
}());
exports.default = new AuthorService();
