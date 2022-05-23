// Project Statement Management
// 确保全局只能由一个 projects
class ProjectState {
  private listeners: any[] = [];
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    // 判断之前是否调用过该方法
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenFn: Function) {
    this.listeners.push(listenFn);
  }

  addProject(title: string, description: string, people: number) {
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

interface Validation {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validateInput: Validation) {
  let isValid = true;
  if (validateInput.required) {
    isValid = isValid && validateInput.value.toString().trim().length !== 0;
  }
  if (
    validateInput.minLength !== undefined &&
    typeof validateInput.value === "string"
  ) {
    isValid =
      isValid && validateInput.value.trim().length > validateInput.minLength;
  }
  if (
    validateInput.maxLength !== undefined &&
    typeof validateInput.value === "string"
  ) {
    isValid =
      isValid && validateInput.value.trim().length < validateInput.maxLength;
  }
  if (
    validateInput.min !== undefined &&
    typeof validateInput.value === "number"
  ) {
    isValid = isValid && validateInput.value > validateInput.min;
  }
  if (
    validateInput.max !== undefined &&
    typeof validateInput.value === "number"
  ) {
    isValid = isValid && validateInput.value < validateInput.max;
  }
  return isValid;
}

function AutoBind(_: any, _2: string, propertyDescriptor: PropertyDescriptor) {
  const originalMethod = propertyDescriptor.value;
  const adjDescriptor: PropertyDescriptor = {
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
  // 模板元素
  templateElement: HTMLTemplateElement;
  // 被挂载的元素 (#app)
  hostElement: HTMLDivElement;
  // template 中的元素
  element: HTMLElement;
  assignedProjects: any[] = [];

  // type 这里当两个变量使用（😺 学到了）
  constructor(private type: "active" | "finished") {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById("project-list")
    );
    this.hostElement = <HTMLDivElement>document.getElementById("app");

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = <HTMLUListElement>(
      document.getElementById(`${this.type}-projects-list`)
    );
    for (const prjItem of this.assignedProjects) {
      let liEl = document.createElement("li");
      liEl.innerText = prjItem.title;
      listEl.appendChild(liEl);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.innerText =
      this.type.toUpperCase() + " PROJECT";
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

// Project Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById("project-input")
    );
    this.hostElement = <HTMLDivElement>document.getElementById("app");

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")
    );
    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")
    );

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidation: Validation = {
      value: enteredTitle,
      required: true,
    };

    const descValidation: Validation = {
      value: enteredDescription,
      required: true,
    };

    const peopleValidation: Validation = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidation) ||
      !validate(descValidation) ||
      !validate(peopleValidation)
    ) {
      alert("Invalid input, please try again");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInput() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
      projectState.addProject(title, desc, people);
      this.clearInput();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
// console.dir(prjInput);
const activeProject = new ProjectList("active");
const finishedProject = new ProjectList("finished");
