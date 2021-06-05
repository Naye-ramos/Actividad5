const Localidad = require('../models/Localidad');

// agregar localidad
exports.agregar = async (req, res, next) => {
  try {
    // crear una localidad con los datos recibidos
    await Localidad.create(req.body);
    res.json({ mensaje: 'Se agregó la localidad.' });
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al agregar la localidad.'});
    next();
  }
};

// listar las localidades
exports.listar = async (req, res, next) => {
  try {
    // extraer la lista de localidades
    const localidades = await Localidad.findAll({
    });
    res.json(localidades);
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al leer las localidades.'});
    next();
  }
};

// mostrar / leer localidad
exports.mostrar = async (req, res, next) => {
  try {
    // buscar el registro, por id
    const localidad = await Localidad.findByPk(req.params.id, {});
    if (!localidad) {
      res.status(404).json({ mensaje: 'No se encontró la localidad.'});
    } else {
      res.json(localidad);
    }
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al leer la localidad.'});
    next();
  }
};

// actualizar localidad
exports.actualizar = async (req, res, next) => {
  try {
    // obtener el registro de la localidad desde la bd
    const localidad = await Localidad.findByPk(req.params.id);
    if (!localidad) {
      res.status(404).json({ mensaje: 'No se encontró la localidad.'});
    } else {
      // actualizar en la bd
      Object.keys(req.body).forEach((propiedad) => {
        localidad[propiedad] = req.body[propiedad];
      });
      // guardar cambios
      localidad.save();
      res.json({ mensaje:'El registro fue actualizado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al actualizar la localidad.'});
    next();
  }
};

exports.eliminar = async (req, res, next) => {
  try {
    const localidad = await Localidad.findByPk(req.params.id);
    if (!localidad) {
      res.status(404).json({ mensaje: 'No se encontró la localidad.'});
    } else {
      await localidad.destroy();
      res.json({ mensaje: 'La localidad fue eliminado.'});
    }
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al eliminar la localidad.'});
    next();
  }
};