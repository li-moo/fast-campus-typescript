/**
 * 원시 타입
 * Number, String, Boolean, null, undefined
 *
 * any, void, never
 * any : 어떤 값이든 들어올수 있어
 * void : 값이 없어
 * never : 값이 할당되면 안돼 할당될수 없어
 */
const num1: number = 100;
const num2 = 100;

function add(a: number, b: number): number {
  return a + b;
}

console.log(add(num1, num2));

function printLog(msg: string): void {
  console.log(msg);
}

const returnValue = printLog('print');
console.log('return value : ', returnValue);

function throwError(): never {
  throw new Error('err');
  console.log('err');
}

function infiniteLoop(): never {
  while (true) {
    // loop
  }
}

function validCheck(arg: never) {
  //
  // const neverValue: never = null;
}

enum Color {
  Red,
  Green,
  Blue,
}

function selectColor(color: Color) {
  switch (color) {
    case Color.Red:
      break;
    case Color.Green:
      break;
    case Color.Blue:
      break;
    default:
      validCheck(color); // 값이 들어갈 수 없어야 한다
  }
}

/**
 * Object, Array
 *
 * tuple : 고정된 배열인데 인덱스마다 타입이 다를때
 */
const obj: object = { name: 'john' };
const arr: Array<number> = [0, 1, 2];
const obj2: {} = { name: 'john' };
const arr3: number[] = [0, 1, 2];

const tupl: [number, string, string, number] = [0, '1', '2', 3];

// enum : 열거형
enum Type {
  User = 'user', // 0
  Admin = 'admin', // 1
}

console.log('type enum :', Type.User, Type.Admin);
