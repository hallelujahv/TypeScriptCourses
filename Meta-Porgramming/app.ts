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
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  // console.log(registerValidators);
  let flag: boolean = true;
  const objValidatorConfig = registerValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      console.log(validator);
      switch (validator) {
        case "required":
          flag = flag && !!obj[prop];
          break;
        case "positive":
          flag = flag && obj[prop] > 0;
          break;
      }
    }
  }
  return flag;
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
    alert("Invalid input, please try again!");
    return;
  }
  console.log(createdCourse);
});
