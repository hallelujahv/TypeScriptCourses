// 这里会自动进行 类型推断(Type Inference)
const person = {
  name: 'V',
  age: 20,
};

console.log(person);

let arr: (string | number)[] = ['a', 1];
let b: { name: string; }[] = [{name: "V"}];

// tuple 元组
// ts 中引入的新类型 其实就是一个特殊的数组
// 用js的角度看其实就是一个只有两个元素的数组
let role: [number, string] = [1, "V"];

// push 不报错
role.push("a");
// 查看 push 之后的 role，元素确实添加了
console.log(role);
// 虽然可以越界添加，但是不能越界访问
// console.log(role[2]); //error

// 报错
// role = [1, "v", 3];

// enum 枚举
enum UserResponse {
  No = 0,
  Yes = 1,
}
// 默认第一个是从 0 开始，往后每个值都 +1
// 其实 枚举就相当于 一个 js 对象
// 相较于直接使用值类型去做判断，枚举类型更易读，能够提升代码的可读性和易维护性



