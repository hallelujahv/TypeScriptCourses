interface ValidatorConfig {
  [property: string]: {
    [validateProp: string]: string[]; // ["required", "positive"]
  };
}

const registerValidators: ValidatorConfig = {};

function required(target: any, propName: string) {
  registerValidators[target.constructor.name] = {
    [propName]: ["required"],
  };
}

function positiveNumber(target: any, propName: string) {
  // console.log(target.constructor.name);
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function validate(obj: any) {
  // console.log(registerValidators);
  let flagA: boolean = false;
  let flagB: boolean = false;
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
  @required
  title: string;
  @positiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleEl = <HTMLInputElement>document.getElementById("title");
  const priceEl = <HTMLInputElement>document.getElementById("price");

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert("0.0");
    return;
  }
  console.log(createdCourse);
});
