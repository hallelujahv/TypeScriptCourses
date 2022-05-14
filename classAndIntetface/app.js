"use strict";
class Person {
    constructor(name) {
        this.name = name;
    }
    // 实际上是添加到了Person的原型对象上
    // 这个方法中第一个参数写 this 是 ts 中独有的用法
    // 用来确保调用这个方法的对象拥有Person的所有属性
    describe() {
        console.log(this.name);
    }
}
const p = new Person("V");
console.log(p);
p.describe();
// const pCopy = {
//   name: "zky",
//   age: 18,
//   describe: p.describe
// }
// // pCopy 不是 Person 的实例对象
// pCopy.describe(); // error
