export default function (sequelize, DataTypes){
    const Atendimento = sequelize.define('Atendimento', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        idProfissao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        idProfissional: {
            type: DataTypes.INTEGER
        },
        idDetalheAtendimentoAtual: {
            type: DataTypes.INTEGER
        }
    });
    
    return Atendimento;
}