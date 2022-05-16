"use strict";
let c;
c = {
    name: "V",
    age: 18,
    sex: ""
};
/*
  总结：当第一种情况使用 &，最后的类型就是结合后的结构
  第二种情况使用 &，最后的类型就是交集
*/
// Type Guards类型保护 😱
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
function printInfo(d) {
    // console.log(d.sex); // error
    if ("sex" in d) {
        console.log(d.sex);
    }
    if ("age" in d) {
        console.log(d.age);
    }
}
printInfo({ name: "V", age: 18 });
class Car {
    drive() {
        console.log("driving ...");
    }
}
class Truck {
    drive() {
        console.log("driving ...");
    }
    loadCargo() {
        console.log("truck load cargo");
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(v) {
    v.drive();
    if (v instanceof Truck) {
        v.loadCargo();
    }
}
useVehicle(v2);
function animalMove(animal) {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
    }
    console.log("Moving with speed: " + speed);
}
animalMove({ type: "bird", flyingSpeed: 18 });
// 因为 interface 只存在于 typescript，我们要记住的一点就是，我们的 ts 代码最终都会被转换成 js 代码
// 所以使用之前的方法 在这里去进行 类型保护 是不行的
// 类型转换 😶‍🌫️
// const userInputElement = <HTMLInputElement>document.getElementById("input-el");
// const userInputElement = document.getElementById("input-el") as HTMLInputElement;
const userInputElement = document.getElementById("input-el");
if (userInputElement) {
    userInputElement.value = "Hi";
}
// userInputElement.value = "Hi, I'm V!";
