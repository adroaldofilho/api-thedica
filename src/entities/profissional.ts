export default function (sequelize, DataTypes){
    const Profissional = sequelize.define('Profissional', {
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
        emailProfissional: {
            type: DataTypes.STRING,
        },
        numeroConselho: {
            type: DataTypes.STRING,
        },
        ufConselho: {
            type: DataTypes.STRING,
        },
        telefone1: {
            type: DataTypes.STRING,
        },
        telefone2: {
            type: DataTypes.STRING,
        }
    });
    
    return Profissional;
}