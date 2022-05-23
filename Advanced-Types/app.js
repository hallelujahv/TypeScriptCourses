"use strict";
// 交叉类型 "&"
// 交叉类型是将多个类型合并为一个类型。
// 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
// 例如， Person & Serializable & Lodgeable同时是 Person 和 Serializable 和 Lodgeable。
// 就是说这个类型的对象同时拥有了这三种类型的成员。
const mergeFunc = (arg1, arg2) => {
    let res = Object.assign(Object.assign({}, arg1), arg2);
    return res;
};
let obj1 = { a: "a" };
let obj2 = { b: "b" };
console.log(mergeFunc(obj1, obj2));
// 类型保护
const arr = [123, "abc"];
function getRandomValue() {
    const flag = Math.random() * 10;
    if (flag < 5) {
        return arr[0];
    }
    else {
        return arr[1];
    }
}
const randomValue = getRandomValue();
// 因为得到的结果 可能是 string 也可能是 number
// 所以我们要对对应类型进行操作的话，首先得先判断类型
// console.log(randomValue.length);
if (typeof randomValue === "string") {
    console.log(randomValue.length);
}
if (typeof randomValue === "number") {
    console.log(randomValue.toString().length);
}
class CreatedByClass1 {
    constructor() {
        this.name = "V";
    }
}
class CreatedByClass2 {
    constructor() {
        this.age = 21;
    }
}
function randomGenerateClass() {
    return Math.random() < 0.5 ? new CreatedByClass1() : new CreatedByClass2();
}
const item = randomGenerateClass();
if (item instanceof CreatedByClass1) {
    console.log(item.name);
}
if (item instanceof CreatedByClass2) {
    console.log(item.age);
}
// this
class Counter {
    constructor(count = 0) {
        this.count = count;
    }
    add(num) {
        this.count += num;
        return this;
    }
    subtract(num) {
        this.count -= num;
        return this;
    }
}
class PowCounter extends Counter {
    constructor(count = 0) {
        super(count);
        this.count = count;
    }
    pow(num) {
        this.count = this.count ** num;
        return this;
    }
}
const powCounter = new PowCounter(2);
console.log(powCounter.pow(2).add(5).subtract(1).count);
// "name" | "age"
let infoProps;
infoProps = "name";
infoProps = "age";
const infoObj = {
    name: "V",
    age: 21,
};
function getValue(obj, keys) {
    return keys.map((key) => obj[key]);
}
let infoValues = getValue(infoObj, ["name", "age"]);
console.log(infoValues);
