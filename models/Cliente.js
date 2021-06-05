const Sequelize = require('sequelize');
const db = require('../config/bd');

const Direccion = require('../models/Direccion');
const Estado = require('../models/Estado');
const Localidad = require('../models/Localidad');
const Municipio = require('../models/Municipio');

const Cliente = db.define('Cliente',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      is: [/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g],
    },
  },
  apellidos: {
    type: Sequelize.STRING(250),
    allowNull: false,
    validate: {
      is: [/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g],
    },
  },
  rfc: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isAlphanumeric: true,
      len: [12,13],
    },
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  telefono: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      is:  /^\d{10}$/ || /^\(\+\d{2,3}\)\d{10}$/,
      isNumeric: true,
    },
  },
  Estatus: {
    type: Sequelize.STRING(10),
    defaultValue: "activo",
  }
});


// asociación de pertenencia: una dirección pertenece a un cliente, un cliente tiene una dirección
Cliente.belongsTo(Direccion, { onDelete:'CASCADE '});

// Exportarlo
module.exports = Cliente;