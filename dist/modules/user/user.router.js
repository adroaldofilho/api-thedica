"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_router_module_1 = require("../../core/router/base-router-module");
var user_service_1 = require("../user/user.service");
var response_handlers_1 = require("../../core/handlers/response-handlers");
var UserRouterModule = /** @class */ (function (_super) {
    __extends(UserRouterModule, _super);
    function UserRouterModule() {
        var _a;
        var _this = _super.call(this, 'user') || this;
        _this.MODULES_ENDPOINT_MAP = (_a = {},
            _a[_this.moduleName] = {
                get: [
                    {
                        endpoint: _this.context + "/" + _this.version + "/" + _this.moduleName + "/all",
                        callback: _this.index,
                        isProtected: true
                    },
                    {
                        endpoint: _this.context + "/" + _this.version + "/" + _this.moduleName + "/:id",
                        callback: _this.findOne,
                        isProtected: true
                    }
                ],
                post: [
                    {
                        endpoint: _this.context + "/" + _this.version + "/" + _this.moduleName + "/create",
                        callback: _this.create,
                        isProtected: true
                    }
                ],
                put: [
                    {
                        endpoint: _this.context + "/" + _this.version + "/" + _this.moduleName + "/:id/update",
                        callback: _this.update,
                        isProtected: true
                    }
                ],
                delete: [
                    {
                        endpoint: _this.context + "/" + _this.version + "/" + _this.moduleName + "/:id/destroy",
                        callback: _this.destroy,
                        isProtected: true
                    }
                ]
            },
            _a);
        return _this;
    }
    UserRouterModule.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_service_1.default.getAll()];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, response_handlers_1.default.onSuccess(res, user)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, response_handlers_1.default.onError(res, 'Erro ao buscar todos os usuários', error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserRouterModule.prototype.findOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = parseInt(req.params.id);
                        return [4 /*yield*/, user_service_1.default.getById(userId)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, response_handlers_1.default.onSuccess(res, user)];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, response_handlers_1.default.onError(res, 'Erro ao buscar o usuário', error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserRouterModule.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_service_1.default.create(req.body)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, response_handlers_1.default.onSuccess(res, user)];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, response_handlers_1.default.onError(res, 'Erro ao incluir usuário', error_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserRouterModule.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, props, user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = parseInt(req.params.id);
                        props = req.body;
                        return [4 /*yield*/, user_service_1.default.update(userId, props)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, response_handlers_1.default.onSuccess(res, user)];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, response_handlers_1.default.onError(res, 'Erro ao atualizar usuário', error_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserRouterModule.prototype.destroy = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = parseInt(req.params.id);
                        return [4 /*yield*/, user_service_1.default.delete(userId)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, response_handlers_1.default.onSuccess(res, user)];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, response_handlers_1.default.onError(res, 'Erro ao excluir o usuário', error_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserRouterModule;
}(base_router_module_1.BaseRouterModule));
exports.UserRouterModule = UserRouterModule;
