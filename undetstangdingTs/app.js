// 这里会自动进行 类型推断(Type Inference)
var person = {
    name: 'V',
    age: 20
};
console.log(person);
var arr = ['a', 1];
var b = [{ name: "V" }];
// tuple 元组
// ts 中引入的新类型 其实就是一个特殊的数组
// 用js的角度看其实就是一个只有两个元素的数组
var role = [1, "V"];
// push 不报错
role.push("a");
// 查看 push 之后的 role，元素确实添加了
console.log(role);
// 虽然可以越界添加，但是不能越界访问
// console.log(role[2]); //error
// 报错
// role = [1, "v", 3];
// enum 枚举
var UserResponse;
(function (UserResponse) {
    UserResponse[UserResponse["No"] = 0] = "No";
    UserResponse[UserResponse["Yes"] = 1] = "Yes";
})(UserResponse || (UserResponse = {}));
console.log(UserResponse.Yes === 1);
