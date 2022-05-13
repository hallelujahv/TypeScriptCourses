console.log("Hello World!");

let a: number = 30;

const btn = document.querySelector("button");

btn?.addEventListener("click", () => {

});

function fn(a: number) {
  console.log(a)
}
// tsconfig.json 中的 strictBindCallApply
fn.bind(null)();