const Municipio = require('../models/Municipio');
const Localidad = require('../models/Localidad');

// agregar Municipio
exports.agregar = async (req, res, next) => {
  try {
    // crear un municipio con los datos recibidos
    await Municipio.create(req.body);
    res.json({ mensaje: 'Se agregó el municipio.' });
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al agregar el municipio.'});
    next();
  }
};

// listar los municipios
exports.listar = async (req, res, next) => {
  try {
    // extraer la lista de municipios
    const municipio = await Municipio.findAll({});
    res.json(municipio);
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al leer los municipios.'});
    next();
  }
};

// mostrar / leer municipio
exports.mostrar = async (req, res, next) => {
  try {
    // buscar el registro, por id
    const municipio = await Municipio.findByPk(req.params.id, {
      // Ver localidades de un municipo
        include: [
          { model: Localidad },
        ]
    });
    if (!municipio) {
      res.status(404).json({ mensaje: 'No se encontró el municipio.'});
    } else {
      res.json(municipio);
    }
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al leer municipio.'});
    next();
  }
};

// actualizar municipio
exports.actualizar = async (req, res, next) => {
  try {
    // obtener el registro del municipio desde la bd
    const municipio = await Municipio.findByPk(req.params.id);
    if (!municipio) {
      res.status(404).json({ mensaje: 'No se encontró el municipio.'});
    } else {
      // actualizar en la bd
      Object.keys(req.body).forEach((propiedad) => {
        municipio[propiedad] = req.body[propiedad];
      });
      municipio.save();
      res.json({ mensaje:'El registro fue actualizado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al actualizar municipio.'});
    next();
  }
};

exports.eliminar = async (req, res, next) => {
  try {
    const municipio = await Municipio.findByPK(req.params.id);
    if (!municipio) {
      res.status(404).json({ mensaje: 'No se encontró el municipio.'});
    } else {
      await municipio.destroy();
      res.json({ mensaje: 'El municipio fue eliminado.'});
    }
  } catch (error) {
    console.error(error);
    res.status(503).json({ mensaje: 'Error al eliminar municipio.'});
    next();
  }
};