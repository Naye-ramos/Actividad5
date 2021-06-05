const Cliente = require('../models/Cliente');
const Estado = require('../models/Estado');
const Municipio = require('../models/Municipio');
const Localidad = require('../models/Localidad');
const Direccion = require('../models/Direccion');

// agregar cliente
exports.agregar = async (req, res, next) => {
  try {
    // crear un cliente con los datos recibidos
    await Direccion.create({
      calle: req.body.calle,
      numeroExterior: req.body.numeroExterior,
      numeroInterior: req.body.numeroInterior,
      codigoPostal: req.body.codigoPostal,
      LocalidadId: req.body.LocalidadId,
    });
    // crear un cliente con los datos recibidos
    await Cliente.create({
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      rfc: req.body.rfc,
      email: req.body.email,
      telefono: req.body.telefono,
      DireccionId: req.body.DireccionId,
    });
    res.json({ mensaje: 'Se agregó el cliente.' });
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al agregar el cliente.'});
    next();
  }
};

// listar los clientes
exports.listar = async (req, res, next) => {
  try {
    // extraer la lista de clientes
    const cliente = await Cliente.findAll({
      include: [
        { model: Direccion },
      ]
    });
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al leer los clientes.'});
    next();
  }
};

// mostrar / leer cliente
exports.mostrar = async (req, res, next) => {
  try {
    // buscar el registro, por id
    const cliente = await Cliente.findByPk(req.params.id, {
      include: [{
        model: Direccion,
          include: [{
            model: Localidad,
              include: [{
                model: Municipio,
                  include: [{
                    model: Estado
                  }]
              }]
          }]
      }]
    });
    if (!cliente) {
      res.status(404).json({ mensaje: 'No se encontró el cliente.'});
    } else {
      res.json(cliente);
    }
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al leer cliente.'});
    next();
  }
};

// actualizar cliente
exports.actualizar = async (req, res, next) => {
  try {
    // obtener el registro del cliente desde la bd
    const cliente = await Cliente.findByPk(req.params.id, {
    });
    const direccion = await Direccion.findByPk(req.params.id, {
    });

    if (!cliente || ! direccion ) {
      res.status(404).json({ mensaje: 'No se encontró el cliente.'});
    } else {
      // actualizar en la bd

      Object.keys(req.body).forEach((propiedad) => {
        cliente[propiedad] = req.body[propiedad];
      });
      Object.keys(req.body).forEach((propiedad) => {
        direccion[propiedad] = req.body[propiedad];
      });

      cliente.save();
      direccion.save();

      res.json({ mensaje:'El registro fue actualizado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al actualizar cliente.'});
    next();
  }
};

exports.eliminar = async (req, res, next) => {
  try {
    const cliente = await Cliente.findByPK(req.params.id);
    const direccion = await Direccion.findByPK(req.body.DireccionId);
    if (!cliente || !direccion) {
      res.status(404).json({ mensaje: 'No se encontró el cliente.'});
    } else {
      await cliente.destroy();
      await direccion.destroy();
      res.json({ mensaje: 'El cliente fue eliminado.'});
    }
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al eliminar cliente.'});
    next();
  }
};
