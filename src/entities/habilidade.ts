export default function (sequelize, DataTypes){
    const Habilidade = sequelize.define('Habilidade', {
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
    });
    
    return Habilidade;
}