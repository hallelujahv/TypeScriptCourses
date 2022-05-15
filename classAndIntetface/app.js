"use strict";
var People = /** @class */ (function () {
    function People(n) {
        this.name = n;
    }
    People.prototype.greet = function (phrase) {
        console.log(phrase);
    };
    return People;
}());
var p;
p = new People("V");
p.greet("Hello");
