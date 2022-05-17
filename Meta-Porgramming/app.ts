// 装饰器
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    // 构造函数
    console.log(constructor);
  };
}

function withTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // 返回的新的 class 会覆盖 Person
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("Rendering template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.innerText = this.name;
        }
      }
    };
  };
}

// @Logger("LOGGING - PERSON")
@withTemplate("<h1>My personal object!</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Person is creating...");
  }
}

const person = new Person();
console.log(person);

function Log() {
  return function (target: any, propertyName: string | Symbol) {
    console.log("Property decorator");
    console.log(target, propertyName);
  };
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Access decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log()
  title: string;

  @Log()
  private _price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log2
  get price() {
    return this._price;
  }

  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid number - should be positive");
    }
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  console.log("AutoBind decorator");
  // console.log(descriptor);
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return originalMethod.bind(this);
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This works";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const btn = document.querySelector("button");
btn?.addEventListener("click", p.showMessage);
