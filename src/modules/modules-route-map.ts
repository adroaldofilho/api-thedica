import { AuthRouterModule } from '../modules/auth/auth-router';
import { UserRouterModule } from '../modules/user/user.router';
import { HabilidadeRouterModule } from '../modules/habilidade/habilidade.router';
import { ProfissaoRouterModule } from '../modules/profissao/profissao.router';
import { AuthorRouterModule } from '../modules/author/author.router';
import { PostRouterModule } from '../modules/post/post.router';
import { ProfissionalRouterModule } from './profissional/profissional.router';
import { StatusAtendimentoRouterModule } from './statusatendimento/statusatendimento.router';
import { AtendimentoRouterModule } from './atendimento/atendimento.router';
import { AvaliacaoAtendimentoRouterModule } from './avaliacaoatendimento/avaliacaoatendimento.router';

export interface FeatureModuleRouter {
    moduleName: any;
    parser: string;
}


export class ModulesRouterMapper {

    public registeredModules: Array<FeatureModuleRouter> = [
        {
            moduleName: AuthRouterModule,
            parser: 'getRoutesFromModules'
        },
        {
            moduleName: UserRouterModule,
            parser: 'getRoutesFromModules'
        },
        {
            moduleName: HabilidadeRouterModule,
            parser: 'getRoutesFromModules'
        },
        {
            moduleName: ProfissaoRouterModule,
            parser: 'getRoutesFromModules'
        },
        {
            moduleName: ProfissionalRouterModule,
            parser: 'getRoutesFromModules'
        },
        {
            moduleName: StatusAtendimentoRouterModule,
            parser: 'getRoutesFromModules'
        },
        {
            moduleName: AtendimentoRouterModule,
            parser: 'getRoutesFromModules'
        },
        {
            moduleName: AvaliacaoAtendimentoRouterModule,
            parser: 'getRoutesFromModules'
        },
        {
            moduleName: AuthorRouterModule,
            parser: 'getRoutesFromModules'
        },
        {
            moduleName: PostRouterModule,
            parser: 'getRoutesFromModules'
        }
    ];
}