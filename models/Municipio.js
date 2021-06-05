const Sequelize = require('sequelize');
const db = require('../config/bd');
const Estado = require('../models/Estado');

const Municipio = db.define('Municipio',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  claveMunicipio:{
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true,
    },
  },
  nombre: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      is: [/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g],
    },
  },
  activo: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  }
});

// asociación de pertenencia: un estado tiene municipios, un municipio pertenece a un estado
Municipio.belongsTo(Estado, { onDelete: 'CASCADE' });
Estado.hasMany(Municipio, { onDelete: 'CASCADE' });
// Exportarlo
module.exports = Municipio;