// intersection types
// 1
type A = {
  name: string;
  age: number;
}

type B = {
  name: string;
  sex: string;
}

type C = A & B;

let c: C;
c = {
  name: "V",
  age: 18,
  sex: ""
}

// 2
type Combinable = string | number;
type Numeric = number | boolean;

// Universal 的类型被自动推断为 number
type Universal = Combinable & Numeric;

/* 
  总结：当第一种情况使用 &，最后的类型就是结合后的结构
  第二种情况使用 &，最后的类型就是交集
*/

// Type Guards类型保护 😱
function add(a: Combinable, b: Combinable) {
  if(typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type D = A | B;
function printInfo(d: D) {
  // console.log(d.sex); // error
  if("sex" in d) {
    console.log(d.sex);
  }
  if("age" in d) {
    console.log(d.age);
  }
}

printInfo({name: "V", age: 18});

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

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(v: Vehicle) {
  v.drive();
  if(v instanceof Truck) {
    v.loadCargo();
  }
}

useVehicle(v2);

// 类型保护就是为了保证你这个对象上存在对应属性，就不会存在 printInfo 里第一行代码的情况

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function animalMove(animal: Animal) {
  let speed;
  switch(animal.type) {
    case "bird": 
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Moving with speed: " + speed);
}

animalMove({ type: "bird", flyingSpeed: 18});

// 因为 interface 只存在于 typescript，我们要记住的一点就是，我们的 ts 代码最终都会被转换成 js 代码
// 所以使用之前的方法 在这里去进行 类型保护 是不行的


// 类型转换 😶‍🌫️
// const userInputElement = <HTMLInputElement>document.getElementById("input-el");
// const userInputElement = document.getElementById("input-el") as HTMLInputElement;
const userInputElement = document.getElementById("input-el");
if(userInputElement) {
  (<HTMLInputElement>userInputElement).value = "Hi";
}
// userInputElement.value = "Hi, I'm V!";

interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email address"
}

// 函数重载
function overload(a: number, b:number): number;
function overload(a: string, b:string): string;
function overload(a: number, b:string): string;
function overload(a: string, b:number): string;
function overload(a: Combinable, b: Combinable) {
  if(typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
const res = overload("1", 2);
res.split("");
