// |
function combine(input1, input2) {
    // 当使用 | 的时候，系统不知道你说明的这些类型是不是都能进行 + 运算，所以会报错
    // return input1 + input2;
    if (typeof (input1) === "number" && typeof (input2) === "number") {
        return input1 + input2;
    }
    else {
        return input1.toString() + input2.toString();
    }
}
var combineAges = combine(30, 26);
console.log(combineAges);
var combineName = combine("V", "Z");
console.log(combineName);
