// Project Type
enum ProjectStatus {
  Active,
  Finished,
}
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// Project Statement Management
// 确保全局只能由一个 projects

type Listener = (projects: Project[]) => void;

class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
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

  addListener(listenFn: Listener) {
    this.listeners.push(listenFn);
  }

  addProject(
    title: string,
    description: string,
    people: number,
    status: ProjectStatus
  ) {
    const newProject = {
      id: Math.random().toString(),
      title,
      description,
      people,
      status,
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

// Basic Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  // 模板元素
  templateElement: HTMLTemplateElement;
  // 被挂载的元素 (#app)
  hostElement: T;
  // template 中的元素
  element: U;
  constructor(
    templateId: string,
    hostId: string,
    insertAfterBeginning: boolean,
    newElementId?: string
  ) {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById(templateId)
    );
    this.hostElement = <T>document.getElementById(hostId);

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAfterBeginning);
  }

  private attach(insertAfterBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAfterBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }
}

// ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[] = [];

  // type 这里当两个变量使用（😺 学到了）
  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });

    this.renderContent();
  }

  private renderProjects() {
    const listEl = <HTMLUListElement>(
      document.getElementById(`${this.type}-projects-list`)
    );
    listEl.innerHTML = "";
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
}

// Project Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input")
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
      projectState.addProject(title, desc, people, ProjectStatus.Active);
      this.clearInput();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}

const prjInput = new ProjectInput();
// console.dir(prjInput);
const activeProject = new ProjectList("active");
const finishedProject = new ProjectList("finished");
