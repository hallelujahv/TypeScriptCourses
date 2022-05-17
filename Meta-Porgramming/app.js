"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const registerValidators = {};
function required(target, propName) {
    registerValidators[target.constructor.name] = {
        [propName]: ["required"],
    };
}
function positiveNumber(target, propName) {
    // console.log(target.constructor.name);
    registerValidators[target.constructor.name] = Object.assign(Object.assign({}, registerValidators[target.constructor.name]), { [propName]: ["required"] });
}
function validate(obj) {
    // console.log(registerValidators);
    let flagA = false;
    let flagB = false;
    const objValidatorConfig = registerValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            console.log(validator);
            switch (validator) {
                case "required":
                    flagA = !!obj[prop];
                    break;
                case "positive":
                    flagB = obj[prop] > 0;
                    break;
            }
        }
    }
    return flagA && flagB;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    required
], Course.prototype, "title", void 0);
__decorate([
    positiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector("form");
courseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleEl = document.getElementById("title");
    const priceEl = document.getElementById("price");
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert("0.0");
        return;
    }
    console.log(createdCourse);
});
