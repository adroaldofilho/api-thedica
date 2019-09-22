export default function (sequelize, DataTypes){
    const DetalheAtendimento = sequelize.define('DetalheAtendimento', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idAtendimento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        idStatusAtendimento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        idUsuarioResponsavel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        textoAtendimento: {
            type: DataTypes.STRING
        },
        dataHotaStatus: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
    
    return DetalheAtendimento;
}