type UserId = string | number;
type User = { id: UserId; name: string };
type Card<T> = { value: T };
type Result<T> = T extends object ? 'object' : 'not a object';
type UserType = 'amin' | 'user';

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

const userCard: Card<User> = {
  value: {
    id: 1001,
    name: 'park',
  },
};

const numberCard: Card<number> = { value: 1 };

const result: Result<number[]> = 'object';
const result2: Result<number> = 'not a object';

interface Person {
  name: string;
  age: number;
}

interface AdminUser extends Person {
  permission: number;
  id: string;
  password: string;
  nickName?: string; // optional
}

const userA: Person = { name: 'choi', age: 10 };

const adminA: AdminUser = {
  ...userA,
  permission: 0,
  id: 'id',
  password: '1234',
};

interface Vehicle {
  brand: string;
  numberOfWheel: number;
}

class Car implements Vehicle {
  brand: string = 'kia';
  numberOfWheel: number = 4;
  startEngine() {
    console.log('부르릉...');
  }
}

class Cycle implements Vehicle {
  brand: string = '삼천리';
  numberOfWheel: number = 2;
}

const car = new Car();
const cycle = new Cycle();

car.startEngine();

const car2: Vehicle = new Car();
const cycle2: Vehicle = new Cycle();
