const Relations = (model) => {
    model.Author.hasMany(model.Post, { foreignKey: 'authorId'});
    model.Post.belongsTo(model.Author, { foreignKey: 'authorId'});

    model.Profissao.hasMany(model.Profissional, { foreignKey: 'idProfissao'});
    model.Profissional.belongsTo(model.Profissao, { foreignKey: 'idProfissao'});

    model.User.hasMany(model.Profissional, { foreignKey: 'idUsuario'});
    model.Profissional.belongsTo(model.User, { foreignKey: 'idUsuario'});

    model.StatusAtendimento.hasMany(model.DetalheAtendimento, { foreignKey: 'idStatusAtendimento'});
    model.DetalheAtendimento.belongsTo(model.StatusAtendimento, { foreignKey: 'idStatusAtendimento'});

    model.User.hasMany(model.DetalheAtendimento, { foreignKey: 'idUsuarioResponsavel'});
    model.DetalheAtendimento.belongsTo(model.User, { foreignKey: 'idUsuarioResponsavel'});

    model.User.hasMany(model.Atendimento, { foreignKey: 'idUsuario'});
    model.Atendimento.belongsTo(model.User, { foreignKey: 'idUsuario'});

    model.Profissao.hasMany(model.Atendimento, { foreignKey: 'idProfissao'});
    model.Atendimento.belongsTo(model.Profissao, { foreignKey: 'idProfissao'});

    model.Profissional.hasMany(model.Atendimento, { foreignKey: 'idProfissional'});
    model.Atendimento.belongsTo(model.Profissional, { foreignKey: 'idProfissional'});

    // model.DetalheAtendimento.hasMany(model.Atendimento, { foreignKey: 'idDetalheAtendimentoAtual' });

    model.Atendimento.hasMany(model.DetalheAtendimento, { foreignKey: 'idAtendimento' });
    model.Atendimento.belongsTo(model.DetalheAtendimento, { foreignKey: 'idDetalheAtendimentoAtual',
                                                            as: 'DetalheAtendimentoAtual',
                                                            constraints: false });
    model.DetalheAtendimento.belongsTo(model.Atendimento, { foreignKey: 'idAtendimento',
                                                            constraints: false,
                                                            as: 'DetalhesDoAtendimento'});

    model.DetalheAtendimento.hasOne(model.AvaliacaoAtendimento, { foreignKey: 'idDetalheAtendimento' });
    model.AvaliacaoAtendimento.belongsTo(model.DetalheAtendimento, { foreignKey: 'idDetalheAtendimento' });

    model.Habilidade.belongsToMany(model.Profissional, { through: 'HabilidadeProfissional', foreignKey: 'idHabilidade' });
    model.Profissional.belongsToMany(model.Habilidade, { through: 'HabilidadeProfissional', foreignKey: 'idProfissional' });

};
module.exports = Relations;