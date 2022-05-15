"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 抽象类只能定义 不能 实例化
var Person = /** @class */ (function () {
    // private name: string;
    // private hobbies: string[] = [];
    // readonly 表示在初始化之后就不能再修改
    function Person(name, hobbies) {
        this.name = name;
        this.hobbies = hobbies;
        // this.name = name;
    }
    Person.prototype.studyHobby = function (hobby) {
        this.hobbies.push(hobby);
    };
    Person.prototype.showHobbies = function () {
        return this.hobbies;
    };
    return Person;
}());
// const p = new Person("V", ["code", "basketball"]);
// console.log(p);
// p.describe();
// const pCopy = {
//   name: "zky",
//   age: 18,
//   describe: p.describe
// }
// // pCopy 不是 Person 的实例对象
// pCopy.describe(); // error
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, grade) {
        var _this = 
        // super 就相当于 继承对象（Person）
        _super.call(this, name, ["study"]) || this;
        _this.grade = grade;
        return _this;
    }
    Student.prototype.describe = function () {
        console.log("My name is ".concat(this.name, ", and my grade is ").concat(this.grade));
    };
    Object.defineProperty(Student.prototype, "myGrade", {
        get: function () {
            return this.grade;
        },
        set: function (val) {
            this.grade = val;
        },
        enumerable: false,
        configurable: true
    });
    Student.age = 10;
    return Student;
}(Person));
var stu = new Student("zky", "Good");
stu.describe();
console.log(stu.myGrade);
stu.myGrade = "Bad";
console.log(stu.myGrade);
var Teacher = /** @class */ (function (_super) {
    __extends(Teacher, _super);
    function Teacher(name) {
        return _super.call(this, name, ["study"]) || this;
    }
    Teacher.getTeacher = function () {
        if (!this.t) {
            this.t = new Teacher("Mrs.V");
        }
        return this.t;
    };
    Teacher.prototype.describe = function () {
    };
    return Teacher;
}(Person));
console.dir(Teacher.getTeacher());
