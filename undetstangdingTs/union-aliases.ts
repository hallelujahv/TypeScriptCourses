// |
type ConversionDescriptor = "as-text" | "as-number";

function combine(input1: number | string, input2: number | string, resultConversion: ConversionDescriptor) {
  // 当使用 | 的时候，系统不知道你说明的这些类型是不是都能进行 + 运算，所以会报错
  // return input1 + input2;

  if(typeof(input1) === "number" && typeof(input2) === "number" && resultConversion === "as-number" ) {
    return input1 + input2;
  }else {
    return input1.toString() + input2.toString();
  }
}

const combineAges = combine(30, 26, "as-number");
console.log(combineAges);

const combineName = combine("V", "Z", "as-text");
console.log(combineName);

