export default function (sequelize, DataTypes){
    const Profissao = sequelize.define('Profissao', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        conselho: {
            type: DataTypes.STRING,
            }
    });
    
    return Profissao;
}