const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

// imprtar nuestro archivo de conexión a la BD
const db = require('./config/bd');
require('./models/Estado');
require('./models/Municipio');
require('./models/Cliente');
require('./models/Direccion');

// decirle a Sequelize que sincronice los modelos
db.sync({}) // alter:true })
    .then(() => {
        console.log("DB Conectada");
    })
    .catch((error) => {
        console.log(error);
    });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// usar las rutas
app.use('/', routes());

// puerto a escuchar
app.listen(5000);