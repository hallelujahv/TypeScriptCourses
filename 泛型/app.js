"use strict";
const names = [];
// names[0].split("");
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergeObj = merge({ name: "V" }, { age: 21 });
console.log(mergeObj);
function countAndDescribe(element) {
    let description = "Got no value";
    if (element.length === 1) {
        description = "Got 1 element";
    }
    else if (element.length > 1) {
        description = "Got " + element.length + " elements";
    }
    return [element, description];
}
console.log(countAndDescribe(["sport", "code"]));
