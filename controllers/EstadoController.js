const Estado = require('../models/Estado');
const Municipio = require('../models/Municipio');

// agregar Estado
exports.agregar = async (req, res, next) => {
  try {
    // crear un estado con los datos recibidos
    await Estado.create(req.body);
    res.json({ mensaje: 'Se agregó el estado.' });
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al agregar el estado.'});
    next();
  }
};

// listar los estados
exports.listar = async (req, res, next) => {
  try {
    // extraer la lista de estados
    const estados = await Estado.findAll({});
    res.json(estados);
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al leer los estados.'});
    next();
  }
};

// mostrar / leer estado
exports.mostrar = async (req, res, next) => {
  try {
    // buscar el registro, por id
    const estado = await Estado.findByPk(req.params.id, {
      // Ver municipos de un estado
      include: [
        { model: Municipio },
      ]
  });
    if (!estado) {
      res.status(404).json({ mensaje: 'No se encontró el estado.'});
    } else {
      res.json(estado);
    }
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al leer estado.'});
    next();
  }
};

// actualizar estado
exports.actualizar = async (req, res, next) => {
  try {
    // obtener el registro del estado desde la bd
    const estado = await Estado.findByPk(req.params.id)
    if (!estado) {
      res.status(404).json({ mensaje: 'No se encontró el estado.'});
    } else {
      // actualizar en la bd
      Object.keys(req.body).forEach((propiedad) => {
        estado[propiedad] = req.body[propiedad];
      });
      // guardar cambios
      await estado.save();
      res.json({ mensaje:'El registro fue actualizado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al actualizar estado.'});
    next();
  }
};

exports.eliminar = async (req, res, next) => {
  try {
    const estado = await Estado.findByPk(req.params.id);
    if (!estado) {
      res.status(404).json({ mensaje: 'No se encontró el estado.'});
    } else {
      await estado.destroy();
      res.json({ mensaje: 'El estado fue eliminado.'});
    }
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al eliminar estado.'});
    next();
  }
};