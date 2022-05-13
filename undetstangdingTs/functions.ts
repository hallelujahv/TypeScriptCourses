function add(n1: number, n2: number): number {
  return n1 + n2;
}

function add2(n1: number, n2: number): void {
  console.log(n1 + n2);
}

let fn: (n1: number, n2: number) => number;
// fn = add2;  error
fn = add;