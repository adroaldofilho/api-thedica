"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("../../modules/User/routes");
var routes_2 = require("../../modules/Author/routes");
var routes_3 = require("../../modules/Post/routes");
var auth_1 = require("../../modules/auth/auth");
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.initRoutes = function (app, auth) {
        app.route('/api/users/all').all(auth.config().authenticate()).get(routes_1.default.index);
        app.route('/api/users/create').all(auth.config().authenticate()).post(routes_1.default.create);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(routes_1.default.findOne);
        app.route('/api/users/:id/update').all(auth.config().authenticate()).put(routes_1.default.update);
        app.route('/api/users/:id/destroy').all(auth.config().authenticate()).delete(routes_1.default.destroy);
        app.route('/token').post(auth_1.default.auth);
        // app.route('/api/author/all').get(AuthorRoutes.index);
        // app.route('/api/author/create').post(AuthorRoutes.create);
        // app.route('/api/author/:id').get(AuthorRoutes.findOne);
        // app.route('/api/author/:id/update').put(AuthorRoutes.update);
        // app.route('/api/author/:id/destroy').delete(AuthorRoutes.destroy);
        app.route('/api/author/all').all(auth.config().authenticate()).get(routes_2.default.index);
        app.route('/api/author/create').all(auth.config().authenticate()).post(routes_2.default.create);
        app.route('/api/author/:id').all(auth.config().authenticate()).get(routes_2.default.findOne);
        app.route('/api/author/:id/update').all(auth.config().authenticate()).put(routes_2.default.update);
        app.route('/api/author/:id/destroy').all(auth.config().authenticate()).delete(routes_2.default.destroy);
        app.route('/api/post/all').all(auth.config().authenticate()).get(routes_3.default.index);
        app.route('/api/post/create').all(auth.config().authenticate()).post(routes_3.default.create);
        app.route('/api/post/:id').all(auth.config().authenticate()).get(routes_3.default.findOne);
        app.route('/api/post/:id/update').all(auth.config().authenticate()).put(routes_3.default.update);
        app.route('/api/post/:id/destroy').all(auth.config().authenticate()).delete(routes_3.default.destroy);
        app.route('/').get(function (req, res) { return res.send('Você é linda! Te amo muito!!!'); });
        // app.route('/ola/:nome').get((req: Request, res: Response) => res.send(`Olá ${req.params.nome}`));
    };
    return Routes;
}());
exports.default = new Routes();
