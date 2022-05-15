class Person {
  // private name: string;
  // private hobbies: string[] = [];

  // readonly 表示在初始化之后就不能再修改
  constructor(protected  readonly name: string, private hobbies: string[]) {
    // this.name = name;
  }

  // 实际上是添加到了Person的原型对象上
  // 这个方法中第一个参数写 this 是 ts 中独有的用法
  // 用来确保调用这个方法的对象拥有Person的所有属性
  describe(this: Person) {
    console.log(`${this.name} has ${this.hobbies}`);
  }

  studyHobby(hobby: string) {
    this.hobbies.push(hobby);
  }

  showHobbies() {
    return this.hobbies;
  }
}

const p = new Person("V", ["code", "basketball"]);
console.log(p);

p.describe();

// const pCopy = {
//   name: "zky",
//   age: 18,
//   describe: p.describe
// }

// // pCopy 不是 Person 的实例对象
// pCopy.describe(); // error

class Student extends Person {
  constructor(name: string, private grade: string) {
    // super 就相当于 继承对象（Person）
    super(name, ["study"]);
  }

  describe(this: Student): void {
    console.log(`My name is ${this.name}, and my grade is ${this.grade}`);
  }

  get myGrade() {
    return this.grade;
  }

  set myGrade(val: string) {
    this.grade = val;
  }
}

const stu = new Student("zky", "Good");
stu.describe();
console.log(stu.myGrade);
stu.myGrade = "Bad";
console.log(stu.myGrade);
