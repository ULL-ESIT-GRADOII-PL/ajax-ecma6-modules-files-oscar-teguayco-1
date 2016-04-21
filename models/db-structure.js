(function() {
  "use strict";
  const util = require('util');
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/chuchu');
  const CardSchema = mongoose.Schema({ 
    "rank" : String,
    "suit" : String,
    "chuchu": [ {a: String, b: String}]
  });

  const Card = mongoose.model("Card", CardSchema);

  let c1 = new Card({"rank":"ace", "suit":"spades ♠",   "chuchu": [{a: "hello", b: "world!"}]});
  let c2 = new Card({"rank":"2",   "suit":"hearts ♥",   "chuchu": [{a: "hola", b: "mundo"}]});
  let c3 = new Card({"rank":"3",   "suit":"clubs ♣",    "chuchu": [{a: "hola", b: "mundo"}]});
  let c4 = new Card({"rank":"4",   "suit":"diamonds ♦", "chuchu": [{a: "hola", b: "mundo"}]});


  let p1 = c1.save(function (err) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved: ${c1}`);
  });

  let p2 = c2.save(function (err) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved: ${c2}`);
  });

  let p3 = Card.create(c3, function (err, x) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved p3: ${x}`);
  });

  Promise.all([p1, p2, p3]).then( (value) => { 
    console.log(util.inspect(value, {depth: null}));  
    mongoose.connection.close(); 
  });
})();