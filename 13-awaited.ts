async function fetchFromNet(): Promise<string> {
  return "data";
}

type FetchedData = Awaited<ReturnType<typeof fetchFromNet>>;
