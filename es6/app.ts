// Arrow Functions 箭头函数
// 参数默认值
const add = (n1: number, n2: number = 1) => {
  return n1 + n2;
};
console.log(add(1, 2));
console.log(add(1));

// 扩展运算符
const person = {
  name: "V",
  age: 18,
};

// 第一条输出报错的原因，如果我要覆盖 name: "zky" 的话，那我干嘛还要写进去，所以就会提示报错
// console.log({ name: "zky", ...person }); // error
console.log({ ...person, name: "zky" });

function numSum(...args: number[]) {
  return args.reduce((curVal, nextVal) => {
    return curVal + nextVal;
  }, 0);
}

console.log(numSum(1, 2, 3, 4, 5, 6));

// 解构
let { age } = person;
console.log(age);