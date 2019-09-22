import { Application, Request, Response } from 'express';
import UserRoutes from '../../modules/User/routes';
import AuthorRoutes from '../../modules/Author/routes';
import PostRoutes from '../../modules/Post/routes'
import TokenRoutes from '../../modules/auth/auth';

class Routes {
    
    constructor(){
        
    }

    initRoutes(app: Application, auth: any): void{
        app.route('/api/users/all').all(auth.config().authenticate()).get(UserRoutes.index);
        app.route('/api/users/create').all(auth.config().authenticate()).post(UserRoutes.create);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(UserRoutes.findOne);
        app.route('/api/users/:id/update').all(auth.config().authenticate()).put(UserRoutes.update);
        app.route('/api/users/:id/destroy').all(auth.config().authenticate()).delete(UserRoutes.destroy);
        app.route('/token').post(TokenRoutes.auth);

        // app.route('/api/author/all').get(AuthorRoutes.index);
        // app.route('/api/author/create').post(AuthorRoutes.create);
        // app.route('/api/author/:id').get(AuthorRoutes.findOne);
        // app.route('/api/author/:id/update').put(AuthorRoutes.update);
        // app.route('/api/author/:id/destroy').delete(AuthorRoutes.destroy);

        app.route('/api/author/all').all(auth.config().authenticate()).get(AuthorRoutes.index);
        app.route('/api/author/create').all(auth.config().authenticate()).post(AuthorRoutes.create);
        app.route('/api/author/:id').all(auth.config().authenticate()).get(AuthorRoutes.findOne);
        app.route('/api/author/:id/update').all(auth.config().authenticate()).put(AuthorRoutes.update);
        app.route('/api/author/:id/destroy').all(auth.config().authenticate()).delete(AuthorRoutes.destroy);

        app.route('/api/post/all').all(auth.config().authenticate()).get(PostRoutes.index);
        app.route('/api/post/create').all(auth.config().authenticate()).post(PostRoutes.create);
        app.route('/api/post/:id').all(auth.config().authenticate()).get(PostRoutes.findOne);
        app.route('/api/post/:id/update').all(auth.config().authenticate()).put(PostRoutes.update);
        app.route('/api/post/:id/destroy').all(auth.config().authenticate()).delete(PostRoutes.destroy);

        app.route('/').get((req: Request, res: Response) => res.send('Você é linda! Te amo muito!!!'));
        // app.route('/ola/:nome').get((req: Request, res: Response) => res.send(`Olá ${req.params.nome}`));

    }

}

export default new Routes();