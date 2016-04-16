var expect = chai.expect;

describe("CSV", function() {
    describe("Calculate", function() {
    
     it("Deberia aceptar una entrada de una única linea", function() {
        var input = '1, 2, 3';
        var r = calculate(input);
        expect(r[0].items.toString()).to.equal('1,2,3');
     });
     
     it("Deberia aceptar una entrada con comillas", function() {
        var input = '"producto",     "precio"';
        var r = calculate(input);
        expect(r[0].items.toString()).to.equal('producto,precio');
     });
     
     it("Deberia aceptar una entrada con parametros vacios", function(){
        var input = '      ,    "4,3", ';
        var r = calculate(input);
        expect(r[0].items.toString()).to.equal('      ,4,3,');
     });
     
     it("Deberia aceptar una entrada con 2 lineas", function(){
        var input = '      ,    "4,3",  \n 1, 2, 3';
        var r = calculate(input);
        expect(r[0].items.toString()).to.equal('      ,4,3,');
        expect(r[1].items.toString()).to.equal('1,2,3');
     });
     
     it("Deberia aceptar una entrada con 2 lineas y numero de argumentos distintos", function(){
        var input = '"4,3",  \n 1, 2, 3';
        var r = calculate(input);
        expect(r[0].items.toString()).to.equal('4,3,');
        expect(r[1].items.toString()).to.equal('1,2,3');
     });
     
     it("Deberia aceptar una entrada vacia", function(){
        var input = '  ,  , ';
        var r = calculate(input);
        expect(r[0].items.toString()).to.equal('  ,');
     });
     
    }); 
 });
