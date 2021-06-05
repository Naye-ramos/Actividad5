const Sequelize = require('sequelize');
const db = require('../config/bd');
const Municipio = require('../models/Municipio');

const Localidad = db.define('Localidad',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  claveLocalidad:{
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true,
    },
  },
  nombreLocalidad: {
    type: Sequelize.STRING(200),
    allowNull: false,
    unique: false,
    validate: {
      is: [/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g],
    },
  },
  activo: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  }
});

// asociación de pertenencia: un Municipio tiene Localidades, un Localidad pertenece a un Municipio
Localidad.belongsTo(Municipio, { onDelete: 'CASCADE' });
Municipio.hasMany(Localidad, { onDelete: 'CASCADE' });
// Exportarlo
module.exports = Localidad;