const express = require('express');

const router = express.Router();

const estadoController = require('../controllers/EstadoController');
const municipioController = require('../controllers/MunicipioController');

// definir las rutas
module.exports = function() {
  // post: agregar estado
  router.post('/estados', estadoController.agregar);
  // get: listar estados
  router.get('/estados', estadoController.listar);
  // get: leer estado
  router.get('/estados/:id', estadoController.mostrar);
  // put: actualizar estado
  router.put('/estados/:id', estadoController.actualizar);
  // delete: eliminar estado
  router.delete('/estados/:id', estadoController.eliminar);

  // post: agregar municipio
  router.post('/municipios', municipioController.agregar);
  // get: listar municipios
  router.get('/municipios', municipioController.listar);
  // get: leer municipio
  router.get('/municipios/:id', municipioController.mostrar);
  // put: actualizar municipio
  router.put('/municipios/:id', municipioController.actualizar);
  // delete: eliminar municipio
  router.delete('/municipios/:id', municipioController.eliminar);

  return router;
}