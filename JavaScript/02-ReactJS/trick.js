const maFonction2 = () => 5;
const maFonction = (a,b) => a + b;  // return sans les {}
var o = {
    a: 1;
    b: 1;
    c: 1;
}

var {a, b, c } = 0; 
// Equivalent à 
var a = o.a
var b = o.b
var c = o.c

var {a, ...rest} = o;
// Equivalent à  
var a = o.a
var rest = {
    b: o.b
    c: o.c
}

var array = [1,2,3]
var [a, ...lerest] = array;
// a = 2 et lerest = [2, 3]

// function => ne redéfinit pas le this
