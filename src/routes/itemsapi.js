const itemRoutes = require('express').Router();

//Importar el modelo
var Item = require('../models/Item');

//Definición de las rutas
//GET
itemRoutes.route('/').get(function (req, res) {
  Item.find(function (err, items){
    if(err){
      console.log(err);
    }
    else {
      res.json(items);
    }
  });
});

//POST
itemRoutes.route('/add').post((req, res, next) => {
  var item = new Item(req.body);
  // console.log(req.body);
  // console.log(item);

  item.save();
  res.json({
    status: 'Tarea guardada en Mongo'
  });
});

//DELETE
itemRoutes.route('/delete/:id').delete(function (req, res) {
  // console.log(req.params.id);
  //{_id: req.params.id} en vez de req.params.id ¿?

  Item.findByIdAndRemove(req.params.id, function(err, item){
    if(err)
      res.json(err);
    else
      res.json('Se elimino el item');
    });
});

//PUT
itemRoutes.route('/update/:id').put(function (req, res) {
  Item.findById(req.params.id, function(err, item) {

      item.id = req.body.id;
      item.text = req.body.text;
      item.source = req.body.source;
      item.source_url = req.body.source_url;
      item.language = req.body.language, 
      item.permalink = req.body.permalink

      item.save()
      .then(item => {
          res.json('Se actualizo el item');
      })
      .catch(err => {
          res.status(400).send("unable to update the database");
      });
  });
});

//Exportación de las rutas
module.exports = itemRoutes;