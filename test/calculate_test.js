var expect = chai.expect;

describe("CSV", function() {
    describe("Calculate", function() {
    
     it("Deberia aceptar una entrada de una única linea", function() {
        var input = '1, 2, 3';
        var r = calculate(input);
        expect(r[0].items.toString()).to.equal('1,2,3');
     });   
    }); 
 });
