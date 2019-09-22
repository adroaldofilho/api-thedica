export default function (sequelize, DataTypes){
    const StatusAtendimento = sequelize.define('StatusAtendimento', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        responsavel: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
    
    return StatusAtendimento;
}