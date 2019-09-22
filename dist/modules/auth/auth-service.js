"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var passport_jwt_1 = require("passport-jwt");
var user_service_1 = require("../user/user.service");
var secret = require('../../config/env').secret;
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.config = function () {
        var opts = {
            secretOrKey: secret,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()
        };
        passport.use(new passport_jwt_1.Strategy(opts, function (jwtPayload, done) {
            user_service_1.default
                .getById(jwtPayload.id)
                .then(function (user) {
                if (user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }
                return done(null, false);
            })
                .catch(function (error) {
                done(error, null);
            });
        }));
        return {
            initialize: function () { return passport.initialize(); },
            authenticate: function () { return passport.authenticate('jwt', { session: false }); }
        };
    };
    return AuthService;
}());
exports.AuthService = AuthService;
// export default new AuthService();
