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
const num2 = 100; // 타입추론

function add(a: number, b: number): number {
  return a + b;
}
// a: number, b: number 이런 타입이여야한다 명시
//): number -> 반환타입지정

console.log(add(num1, num2));

function printLog(msg: string): void {
  console.log(msg);
}
//: void 함수가 값을 반환 x

const returnValue = printLog('print'); //"print" 
console.log('return value : ', returnValue); //"return value : ",  undefined 

// naver 사용 함수 
//1. 항상 예외를 던짐 -> 정상적으로 종료 x
function throwError(): never {
  throw new Error('err');
  console.log('err'); // throw 실행되면 함수는 즉시 종료 -> 이후 코드는 실행X
}
// 2. 반환값이 없고 종료되지 않는 함수 
function infiniteLoop(): never {
  while (true) {
    // loop
  }
}
// 3.never 타입 외의 값을 받지 않도록
function validCheck(arg: never) {
  // arg: 매개변수
  // const neverValue: never = null;
}

//enum에 값을 지정x -> 0부터 자동으로 할당
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
    // 이 부분은 절대 실행되지 않음
  }
}
selectColor(Color.Red); /// Color.Red branch 실행
selectColor(2); /// Color.Blue branch 실행

/**
 * Object, Array
 *
 * tuple : 고정된 배열인데 인덱스마다 타입이 다를때
 */
const obj: object = { name: 'john' };
const obj2: {} = { name: 'john' };

const arr: Array<number> = [0, 1, 2];
const arr3: number[] = [0, 1, 2];

///object 타입
const obj3: object = { name: 'john' };
console.log(obj3); //{ "name": "john"}  obj.name으로 접근 불가능
const obj4: { name: string } = { name: 'john' };
console.log(obj4.name); // ✅ 정상 실행

const tupl: [number, string, string, number] = [0, '1', '2', 3];

// enum : 열거형
enum Type {
  User = 'user', // 0
  Admin = 'admin', // 1
}

console.log('type enum :', Type.User, Type.Admin); // "type enum :",  "user",  "admin" 

