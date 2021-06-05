const express = require('express');

const router = express.Router();

const estadoController = require('../controllers/EstadoController');


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

  return router;
}