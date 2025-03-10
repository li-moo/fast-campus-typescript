/// type을 활용한 타입 정의
type UserId = string | number;
type User = { id: UserId; name: string };
/// 제네릭(Generic): T는 어떤 타입이든 받을 수 있는 변수
type Card<T> = { value: T }; /// { value: T }: 객체 구조 지정
/// T가 객체인지 판단하는 조건부 타입
/// extends: 부모 클래스의 속성과 메서드를 자식 클래스도 그대로.
/// 결국 extends는 "T가 특정 타입을 포함하냐?"를 판별
/// type 결과 타입 = 조건 extends 검사할 타입 ? 참일 때 값 : 거짓일 때 값;
type Result<T> = T extends object ? 'object' : 'not a object';
/// 유저 타입을 'admin' 또는 'user' 중 하나로 제한
type UserType = 'amin' | 'user';

// /showUserName 함수는 User 타입을 인자로 받고, 해당 유저의 이름을 콘솔에 출력함
/// user는 User 타입을 따라야 함.
function showUserName(user: User) {
  console.log(user.name);
}

showUserName({
  id: '0001',
  name: 'john',
});
showUserName({
  id: 1001,
  name: 'park',
});

/// userCard는 value가 User 타입
/// T가 User이므로 value는 { id: string | number; name: string } 타입을 가짐
const userCard: Card<User> = {
  value: {
    id: 1001,
    name: 'park',
  },
}; /// 제네릭(Generic) 타입을 활용한 객체 타입 선언s
/// numberCard는 value가 number 타입
const numberCard: Card<number> = { value: 1 };

///'object' : 'not a object' 가 서로 대응 잘 됐는지 체크 
const result: Result<number[]> = 'object'; ///number[]는 객체이므로 'object'.
const result2: Result<number> = 'not a object';

/// 미리 객체의 구조(속성과 메서드)를 정의 후 규칙 강제
/// 객체의 껍데기 또는 설계도
/// 인터페이스명 Person 대문자
interface Person {
  name: string;
  age: number;
}

/// AdminUser는 Person을 상속(extends) 속성(permission, id, password) 추가
/// 자식 인터페이스
interface AdminUser extends Person {
  permission: number;
  id: string;
  password: string;
  nickName?: string; // optional
}

//Person 타입 객체 생성 
const userA: Person = { name: 'choi', age: 10 };

/// AdminUser 타입 객체 생성
const adminA: AdminUser = {
  ...userA, /// 객체의 속성 spread
  permission: 0,
  id: 'id',
  password: '1234',
};

/// Vehicle 인터페이스
interface Vehicle {
  brand: string;
  numberOfWheel: number;
}
/// Car 클래스
class Car implements Vehicle {
  brand: string = 'kia';
  numberOfWheel: number = 4;
  startEngine() {
    console.log('부르릉...');
  }
}

/// Cycle 클래스
class Cycle implements Vehicle {
  brand: string = '삼천리';
  numberOfWheel: number = 2;
}

/// 객체 생성
const car = new Car();
const cycle = new Cycle();
/// 메서드 호출
car.startEngine();
/// 인터페이스 타입으로 객체 생성 -> startEngine() 호출 가능
const car2: Vehicle = new Car();
const cycle2: Vehicle = new Cycle();

/// ? TypeScript: 필드 먼저 초기화, 이휴 생성자가 실행
/// ? Java: 생성자가 실행될 때 필드가 초기화됨.