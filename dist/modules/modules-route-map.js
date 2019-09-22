"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_router_1 = require("../modules/auth/auth-router");
var user_router_1 = require("../modules/user/user.router");
var author_router_1 = require("../modules/author/author.router");
var post_router_1 = require("../modules/post/post.router");
var ModulesRouterMapper = /** @class */ (function () {
    function ModulesRouterMapper() {
        this.registeredModules = [
            {
                moduleName: auth_router_1.AuthRouterModule,
                parser: 'getRoutesFromModules'
            },
            {
                moduleName: user_router_1.UserRouterModule,
                parser: 'getRoutesFromModules'
            },
            {
                moduleName: author_router_1.AuthorRouterModule,
                parser: 'getRoutesFromModules'
            },
            {
                moduleName: post_router_1.PostRouterModule,
                parser: 'getRoutesFromModules'
            }
        ];
    }
    return ModulesRouterMapper;
}());
exports.ModulesRouterMapper = ModulesRouterMapper;
