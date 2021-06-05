const Sequelize = require('sequelize');

// exportar una instancia de Sequelize con la conexión a nuetsra BD.
// agregar la información para conectar a la bd
module.exports = new Sequelize('', '', '', {
    host: 'localhost',
    dialect: 'mysql',
    });