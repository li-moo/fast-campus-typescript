interface GenericInterface<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

const output1 = identity<string>("string");
const output2 = identity<number>(100);

const myIdentity: GenericInterface<number> = identity;

class GenericNumber<T> {
  value: T;
  add: (num1: T, num2: T) => T;
}

const genericClass = new GenericNumber<number>();
genericClass.value;
genericClass.add;
