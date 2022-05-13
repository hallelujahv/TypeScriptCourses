// unknown
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'v';

// 报错，unknown 除了赋值给 unknown和any 类型的值外，其他都会报错
// any 和 unknown 的区别就是 unknown 在执行时会进行一些检查
// 比如下面代码，因为我是unknown类型，我就不能赋值给一个string类型
// 如果将unknown改为any，就不会出现错误
// userName = userInput;

// never
function add():void {};
console.log(add()); // undefined
// function add():void {};  => function add():void { return; };

function err(): never {
  throw {};
  // return;
}
console.log(err());
// 你会发现没有输出，相当于就是 throw 之后，直接退出了函数，都没有进行 return 的操作
// 这里就是使用 never，就是不返回任何数据