export default function (sequelize, DataTypes){
    const AvaliacaoAtendimento = sequelize.define('AvaliacaoAtendimento', {
        idDetalheAtendimento: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nota: {
            type: DataTypes.INTEGER
        },
        texto: {
            type: DataTypes.STRING
            }
    });
    
    return AvaliacaoAtendimento;
}