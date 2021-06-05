const Sequelize = require('sequelize');
const db = require('../config/bd');

const Estado = db.define('Estado',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  claveEstado:{
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true,
    },
  },
  nombre: {
    type: Sequelize.STRING(32),
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

// Exportarlo
module.exports = Estado;