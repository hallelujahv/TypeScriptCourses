"use strict";
console.log("Hello World!");
let a = 30;
const btn = document.querySelector("button");
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => {
});
function fn(a) {
    console.log(a);
}
// tsconfig.json 中的 strictBindCallApply
fn.bind(null)();
//# sourceMappingURL=app.js.map