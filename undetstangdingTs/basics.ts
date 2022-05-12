console.log("Time to get start..");

// CORE TYPES
// number string boolean
function add(n1: number, n2: number, showRes: boolean, resPhrase: string) {
  if(showRes) {
    console.log(resPhrase + (n1 + n2));
  }else {
    return n1 + n2;
  }
}

const number1 = 5;
const number2 = 3;
const showRes = true;
const resPhrase = "Result is: ";

// if typeof number1 or number2 !== "number"
// there will be something wrong
console.log(add(number1, number2, showRes, resPhrase));
