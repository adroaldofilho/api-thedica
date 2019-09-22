"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = require("./user.model");
var model = require('../../entities');
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.create = function (user) {
        return model.User.create(user);
    };
    UserService.prototype.getAll = function () {
        return model.User.findAll({
            order: ['name']
        })
            .then(user_model_1.createUsers);
    };
    UserService.prototype.getById = function (id) {
        return model.User.findOne({
            where: { id: id }
        })
            .then(user_model_1.createUserById);
    };
    UserService.prototype.getByEmail = function (email) {
        return model.User.findOne({
            where: { email: email }
        })
            .then(user_model_1.createUserByEmail);
    };
    UserService.prototype.update = function (id, user) {
        return model.User.update(user, {
            where: { id: id },
            fields: ['name', 'email', 'password'],
            hooks: true,
            individualHooks: true
        });
    };
    UserService.prototype.delete = function (id) {
        return model.User.destroy({
            where: { id: id }
        });
    };
    return UserService;
}());
exports.UserService = UserService;
exports.default = new UserService();
