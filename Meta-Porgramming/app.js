"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// 装饰器
function Logger(logString) {
    return function (constructor) {
        console.log(logString);
        // 构造函数
        console.log(constructor);
    };
}
function withTemplate(template, hookId) {
    return function (originalConstructor) {
        // 返回的新的 class 会覆盖 Person
        return class extends originalConstructor {
            constructor(..._) {
                super();
                console.log("Rendering template");
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").innerText = this.name;
                }
            }
        };
    };
}
// @Logger("LOGGING - PERSON")
let Person = class Person {
    constructor() {
        this.name = "Max";
        console.log("Person is creating...");
    }
};
Person = __decorate([
    withTemplate("<h1>My personal object!</h1>", "app")
], Person);
const person = new Person();
console.log(person);
function Log() {
    return function (target, propertyName) {
        console.log("Property decorator");
        console.log(target, propertyName);
    };
}
function Log2(target, name, descriptor) {
    console.log("Access decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log("Method decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log("Parameter decorator");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    get price() {
        return this._price;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Invalid number - should be positive");
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log()
], Product.prototype, "title", void 0);
__decorate([
    Log()
], Product.prototype, "_price", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
function AutoBind(_, _2, descriptor) {
    console.log("AutoBind decorator");
    // console.log(descriptor);
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            console.log("///", this);
            return originalMethod.bind(this);
        },
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = "This works";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    AutoBind
], Printer.prototype, "showMessage", null);
console.dir(Printer);
const p = new Printer();
const btn = document.querySelector("button");
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", p.showMessage);
