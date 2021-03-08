//Constantes y variables de configuración
const express = require('express');
const morgan = require('morgan');
const path = require('path');
  //Mongo
  mongoose = require('mongoose'),
  { DB } = require('./config/DB'),

mongoose.set('useFindAndModify', false);
mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true, promiseLibrary: global.Promise})
  .then(() => console.log('Conexión con Mongo hecha!'))
  .catch(err => console.error(err));


const app = express();
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());


//Routes
var itemRoutes = require('./routes/itemsapi.js');
app.use('/items', itemRoutes);


//Static Files:lo que se envia al frontend
app.use(express.static(path.join(__dirname, 'public')));


//Inicio del servidor
var puerto = app.get('port');
app.listen(puerto, () => {
  console.log('Escuchando el puerto ' + puerto);
});