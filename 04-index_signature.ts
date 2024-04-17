interface Dynamic {
  key: string;
  [key: number]: string; // number형태의 키에 문자열 밸류를 갖는 속성은 얼마든지 추가해도 된다
  [key: string]: string;
  [key: symbol]: string;
}

const dynamic: Dynamic = {
  1: '1',
  100: '100',
  key: 'key',
  key2: 'key2',
  [Symbol('symbol')]: 'symbol',
  [Symbol('symbol')]: 'symbol',
  [Symbol('symbol')]: 'symbol',
};

console.log(dynamic);
