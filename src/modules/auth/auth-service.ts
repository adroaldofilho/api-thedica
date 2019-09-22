import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import UserService from '../user/user.service';
const { secret } = require('../../config/env');

export class AuthService {

    config(){
        let opts = {
            secretOrKey: secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        };
        passport.use(new Strategy(opts, (jwtPayload, done) => {
            UserService
                .getById(jwtPayload.id)
                .then(user => {
                    if (user) {
                        return done(null, {
                            id: user.id,
                            email: user.email
                        });
                    }
                    return done(null, false);
                })
                .catch(error => {
                    done(error, null)
                });
        }));
    
        return {
            initialize: () => passport.initialize(),
            authenticate: () => passport.authenticate('jwt', { session: false })
        }
    }
}

// export default new AuthService();