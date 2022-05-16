const names: Array<string> = [];
// names[0].split("");

function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergeObj = merge({ name: "V" }, { age: 21 });
console.log(mergeObj);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let description = "Got no value";
  if(element.length === 1) {
    description = "Got 1 element";
  }else if(element.length > 1) {
    description = "Got " + element.length + " elements";
  }
  return [element, description];
}

console.log(countAndDescribe(["sport", "code"]));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

console.log(extractAndConvert({ name: "v" }, "name"));

interface Person {
  name: string;
  age: number;
}

// Partial 会将 Person 里的属性全变为可选项
let p: Partial<Person> = { name: "V" };

// 只读
let arr: Readonly<string[]> = ["V", "coding"];
// arr.push("mm"); // error
