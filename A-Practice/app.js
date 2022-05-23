"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Project Statement Management
// 确保全局只能由一个 projects
class ProjectState {
    constructor() {
        this.listeners = [];
        this.projects = [];
    }
    static getInstance() {
        // 判断之前是否调用过该方法
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addListener(listenFn) {
        this.listeners.push(listenFn);
    }
    addProject(title, description, people) {
        const newProject = {
            id: Math.random().toString(),
            title,
            description,
            people,
        };
        this.projects.push(newProject);
        for (const listenFn of this.listeners) {
            listenFn(Array.from(this.projects));
        }
    }
}
const projectState = ProjectState.getInstance();
function validate(validateInput) {
    let isValid = true;
    if (validateInput.required) {
        isValid = isValid && validateInput.value.toString().trim().length !== 0;
    }
    if (validateInput.minLength !== undefined &&
        typeof validateInput.value === "string") {
        isValid =
            isValid && validateInput.value.trim().length > validateInput.minLength;
    }
    if (validateInput.maxLength !== undefined &&
        typeof validateInput.value === "string") {
        isValid =
            isValid && validateInput.value.trim().length < validateInput.maxLength;
    }
    if (validateInput.min !== undefined &&
        typeof validateInput.value === "number") {
        isValid = isValid && validateInput.value > validateInput.min;
    }
    if (validateInput.max !== undefined &&
        typeof validateInput.value === "number") {
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
// ProjectList Class
class ProjectList {
    // type 这里当两个变量使用（😺 学到了）
    constructor(type) {
        this.type = type;
        this.assignedProjects = [];
        this.templateElement = (document.getElementById("project-list"));
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listEl = (document.getElementById(`${this.type}-projects-list`));
        for (const prjItem of this.assignedProjects) {
            let liEl = document.createElement("li");
            liEl.innerText = prjItem.title;
            console.log("222");
            listEl.appendChild(liEl);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").innerText =
            this.type.toUpperCase() + " PROJECT";
    }
    attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
}
// Project Class
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
            value: +enteredPeople,
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
            console.log(title, desc, people);
            projectState.addProject(title, desc, people);
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
const activeProject = new ProjectList("active");
const finishedProject = new ProjectList("finished");
