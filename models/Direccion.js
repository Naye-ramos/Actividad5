const Sequelize = require('sequelize');
const db = require('../config/bd');

const Localidad = require('../models/Localidad');
const Cliente = require('../models/Cliente');
const clienteController = require('../controllers/ClienteController');

const Direccion = db.define('Direccion',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  calle: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      is: [/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g],
    },
  },
  numeroExterior: {
    type: Sequelize.INTEGER(10),
    allowNull: true,
    validate: {
      isNumeric: true,
    },
  },
  numeroInterior: {
    type: Sequelize.INTEGER(10),
    allowNull: true,
    validate: {
      isNumeric: true,
    },
  },
  codigoPostal: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      is:   /^\d{5}$/,
      isNumeric: true,
    },
  },
});

// asociación de pertenencia: una dirección pertenece a una localidad, una localidad tiene varias localidades
Direccion.belongsTo(Localidad, { onDelete: 'CASCADE' });
Localidad.hasOne(Direccion, { onDelete: 'CASCADE'});

// Exportarlo
module.exports = Direccion;