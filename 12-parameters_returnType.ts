function orderCoffee(type: string, sugar: boolean, milk: boolean) {
  return `주문 : ${type} ${sugar ? "설탕추가" : "설탕없이"} ${
    milk ? "우유추가" : "우유없이"
  }`;
}

type OrderCoffeeParams = Parameters<typeof orderCoffee>;

function withOrderLogging(
  fn: (...args: OrderCoffeeParams) => string,
  ...args: OrderCoffeeParams
) {
  console.log(fn(...args));
}

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const data: T = await response.json();
  return data;
}

type FetchResult<T> = ReturnType<typeof fetchData<T>>;

type StringFetchResult = FetchResult<string>;
