(function() {
  "use strict";
  const util = require('util');
  const mongoose = require('mongoose');
  
  /* Construimos el Schema: describe la forma de los 
   * documento dentro de una colección */
  const ExampleSchema = mongoose.Schema({ 
    "exampleName" : String,
    "exampleContent": String
  });

  /* Creamos un modelo a partir del schema */
  const Example = mongoose.model("Example", ExampleSchema);

  /* Creamos los documentos, que se corresponden con los ejemplos de entrada CSV */
  let e1 = new Example({
        "exampleName": "input.txt",
        "exampleContent": `"producto",           "precio"  "fecha"
                           "camisa",             "4,3",    "14/01"
                           "libro de O\\"Reilly", "7,2"     "13/02"`
  });

  /* Se añade el ejemplo creado a la MongoDB */
  let p1 = e1.save(function (err) {
    if (err) { console.log('Hubo errores:\n${err}'); return err; }
    console.log(`Saved: ${e1}`);
  });

  /* Se espera a que se añada el ejemplo */
  Promise.all([p1]).then( (value) => { 
    console.log(util.inspect(value, {depth: null}));  
    mongoose.connection.close(); 
  });
})();