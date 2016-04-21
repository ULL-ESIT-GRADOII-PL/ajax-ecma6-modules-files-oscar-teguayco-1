"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

// Iniciar la conexión con la BD
mongoose.connect('mongodb://localhost/csv');

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));
                          
const calculate = require('./models/calculate.js');

app.get('/', (request, response) => {     
  response.render('index', {title: 'CSV Analyzer'});
});

app.get('/csv', (request, response) => {
  response.send({"rows": calculate(request.query.input) });
});


/*******************************************************/

app.param('input', function (req, res, next, ejemplo) {  
  if (ejemplo.match(/^[a-z_]\w*\.csv$/i)) { 
      req.input = input;
  } else { 
      next(new Error(`<${input}> does not match 'ejemplo' requirements`));
      /* Error: <input1.csx> does not match 'ejemplo' requirements at app.js:85:12 */
   }
  next();
});

const Example = require('./models/db-structure');

/* Sólo podemos guardar 4 ejemplos en la base de datos. Si la BD está llena,
 * borramos la entrada más antigua (contenida en docs[0])
 */
app.get('/mongo/:example', function(req, res) {
    Example.find({}, function(err, docs) {
        if (err)
            return err;
        if (docs.length >= 4) {
            // Borramos el ejemplo más antiguo
            Example.find({ name: docs[0].name }).remove().exec();
        }
    });
    let e1 = new Example({
        "name": req.example,
        "content": req.query.content
    });

    e1.save(function(err) {
        if (err) {
            console.log(`Hubo errores:\n${err}`);
            return err;
        }
        console.log(`Guardado: ${e1}`);
    });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
