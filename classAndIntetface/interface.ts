// 接口😄
interface Named {
  readonly name: string;
}

interface Greet extends Named {
  greet(phrase: string): void;
}

class People implements Greet {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string): void {
    console.log(phrase);
  }
}

let p: Greet;
p = new People("V");
p.greet("Hello");