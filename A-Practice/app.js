"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validateInput) {
    let isValid = true;
    if (validateInput.required) {
        isValid = isValid && validateInput.value.toString().trim().length !== 0;
    }
    if (validateInput.minLength !== undefined && typeof validateInput.value === "string") {
        isValid =
            isValid && validateInput.value.trim().length > validateInput.minLength;
    }
    if (validateInput.maxLength !== undefined && typeof validateInput.value === "string") {
        isValid =
            isValid && validateInput.value.trim().length < validateInput.maxLength;
    }
    if (validateInput.min !== undefined && typeof validateInput.value === "number") {
        isValid = isValid && validateInput.value > validateInput.min;
    }
    if (validateInput.max !== undefined && typeof validateInput.value === "number") {
        isValid = isValid && validateInput.value < validateInput.max;
    }
    return isValid;
}
function AutoBind(_, _2, propertyDescriptor) {
    const originalMethod = propertyDescriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            // console.log(this);
            // this 指向 prototype
            const fn = originalMethod.bind(this);
            return fn;
        },
    };
    return adjDescriptor;
}
class ProjectInput {
    constructor() {
        this.templateElement = (document.getElementById("project-input"));
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        this.titleInputElement = (this.element.querySelector("#title"));
        this.descriptionInputElement = (this.element.querySelector("#description"));
        this.peopleInputElement = (this.element.querySelector("#people"));
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidation = {
            value: enteredTitle,
            required: true,
        };
        const descValidation = {
            value: enteredDescription,
            required: true,
        };
        const peopleValidation = {
            value: parseInt(enteredPeople),
            required: true,
            min: 1,
            max: 5,
        };
        if (!validate(titleValidation) ||
            !validate(descValidation) ||
            !validate(peopleValidation)) {
            alert("Invalid input, please try again");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInput() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    submitHandler(e) {
        e.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            // console.log(title, desc, people);
            this.clearInput();
        }
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
// console.dir(prjInput);
